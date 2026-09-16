/**
 * Cloudflare Pages Function: /api/submit
 * Handles score submission from participants with Telegram Name, Username, and Telegram ID verification.
 */

const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    }
  });
};

export async function onRequestOptions() {
  return jsonResponse({}, 204);
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 Database binding 'DB' not configured" }, 500);
    }

    const data = await request.json();
    const telegramName = (data.telegram_name || "").toString().trim();
    const username = (data.username || "").toString().trim();
    const telegramId = (data.telegram_id || "").toString().trim();
    const session = parseInt(data.session, 10);
    const score = parseInt(data.score, 10) || 0;
    const correctAnswers = parseInt(data.correctAnswers, 10) || 0;
    const totalDuration = parseInt(data.totalDuration, 10) || 0;
    const userAgent = (data.userAgent || request.headers.get("user-agent") || "Unknown").toString();

    // 1. Parameter Validation
    if (!telegramName || telegramName.length < 2) {
      return jsonResponse({ status: "error", message: "Nama Telegram wajib diisi (minimal 2 karakter)." }, 400);
    }

    if (!username.startsWith("@") || username.length < 3) {
      return jsonResponse({ status: "error", message: "Username Telegram wajib diawali tanda '@'." }, 400);
    }

    if (!telegramId || !/^\d{5,15}$/.test(telegramId)) {
      return jsonResponse({ status: "error", message: "ID Telegram wajib berupa angka ID unik (minimal 5 digit)." }, 400);
    }

    if (isNaN(session) || session < 1 || session > 5) {
      return jsonResponse({ status: "error", message: "Nomor sesi tidak valid (1-5)." }, 400);
    }

    // Anti-Cheat Sanity Checks: Max score is ~9,050 pts per session
    if (score < 0 || score > 12000 || correctAnswers < 0 || correctAnswers > 30) {
      return jsonResponse({ status: "error", message: "Batas skor tidak valid." }, 400);
    }

    // 2. Check if Session is Active in D1
    const sessionRow = await env.DB.prepare(
      "SELECT is_active FROM sessions_config WHERE session_number = ?"
    ).bind(session).first();

    if (!sessionRow || sessionRow.is_active !== 1) {
      return jsonResponse({
        status: "error",
        message: `Sesi ${session} saat ini sedang dikunci atau ditutup oleh Admin.`
      }, 403);
    }

    // 3. Attempt Insert into D1 (Protected by UNIQUE(telegram_id, session_number))
    try {
      // Upsert into participants
      await env.DB.prepare(`
        INSERT INTO participants (telegram_id, telegram_name, username)
        VALUES (?, ?, ?)
        ON CONFLICT(telegram_id) DO UPDATE SET
          telegram_name = excluded.telegram_name,
          username = excluded.username;
      `).bind(telegramId, telegramName, username).run().catch(() => {});

      await env.DB.prepare(`
        INSERT INTO submissions (telegram_name, username, telegram_id, session_number, score, correct_answers, total_duration, user_agent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(telegramName, username, telegramId, session, score, correctAnswers, totalDuration, userAgent).run();

      return jsonResponse({
        status: "success",
        message: `Skor Sesi ${session} resmi tercatat!`,
        score
      });
    } catch (dbErr) {
      if (dbErr.message && (dbErr.message.includes("UNIQUE") || dbErr.message.includes("constraint"))) {
        return jsonResponse({
          status: "error",
          message: `Akun Telegram ini (ID: ${telegramId}) sudah pernah mengirimkan skor untuk Sesi ${session}. Percobaan ganda ditolak.`
        }, 409);
      }
      throw dbErr;
    }

  } catch (err) {
    return jsonResponse({ status: "error", message: err.message }, 500);
  }
}
