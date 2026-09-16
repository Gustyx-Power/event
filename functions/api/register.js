/**
 * Cloudflare Pages Function: /api/register
 * Handles instant participant registration upon entering the marathon arena.
 * Persists telegram_name, username, and telegram_id to Cloudflare D1.
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

    const payload = await request.json();
    const telegramName = (payload.telegram_name || "").trim();
    const username = (payload.username || "").trim();
    const telegramId = (payload.telegram_id || "").toString().trim();

    // Verification Rules
    if (!telegramName || telegramName.length < 2) {
      return jsonResponse({ status: "error", message: "Nama akun Telegram minimal 2 karakter" }, 400);
    }

    if (!username.startsWith("@") || username.length < 3) {
      return jsonResponse({ status: "error", message: "Username Telegram harus diawali '@' dan minimal 3 karakter" }, 400);
    }

    if (!/^\d{5,15}$/.test(telegramId)) {
      return jsonResponse({ status: "error", message: "ID Telegram harus berupa angka (5 - 15 digit)" }, 400);
    }

    // Ensure participants table exists
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS participants (
        telegram_id TEXT PRIMARY KEY,
        telegram_name TEXT NOT NULL,
        username TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    // Insert or update participant info
    await env.DB.prepare(`
      INSERT INTO participants (telegram_id, telegram_name, username)
      VALUES (?, ?, ?)
      ON CONFLICT(telegram_id) DO UPDATE SET
        telegram_name = excluded.telegram_name,
        username = excluded.username;
    `).bind(telegramId, telegramName, username).run();

    return jsonResponse({
      status: "success",
      message: "Peserta berhasil terdaftar di turnamen",
      participant: {
        telegram_id: telegramId,
        telegram_name: telegramName,
        username: username
      }
    });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.message }, 500);
  }
}
