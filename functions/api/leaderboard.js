/**
 * Cloudflare Pages Function: /api/leaderboard
 * Computes aggregated real-time tournament standings using D1 SQL engine,
 * grouped by unique Telegram ID.
 */

const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, x-admin-key",
      "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS"
    }
  });
};

export async function onRequestOptions() {
  return jsonResponse({}, 204);
}

export async function onRequestGet({ request, env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 Database binding 'DB' not configured" }, 500);
    }

    const url = new URL(request.url);
    const withDetails = url.searchParams.get("details") === "true";

    // Aggregated Leaderboard Query grouped by immutable telegram_id
    const { results } = await env.DB.prepare(`
      SELECT 
        telegram_id,
        MAX(telegram_name) as telegram_name,
        MAX(username) as username,
        SUM(score) as total_score,
        COUNT(DISTINCT session_number) as sessions_completed,
        SUM(total_duration) as total_duration,
        MAX(created_at) as last_submitted
      FROM submissions
      GROUP BY telegram_id
      ORDER BY total_score DESC, total_duration ASC;
    `).all();

    const totalParticipants = results ? results.length : 0;
    const completedAll5 = results ? results.filter(r => r.sessions_completed >= 5).length : 0;

    let details = null;
    if (withDetails) {
      const subRes = await env.DB.prepare(`
        SELECT id, telegram_name, username, telegram_id, session_number, score, correct_answers, total_duration, created_at
        FROM submissions
        ORDER BY created_at DESC LIMIT 200;
      `).all();
      details = subRes.results || [];
    }

    return jsonResponse({
      status: "success",
      leaderboard: results || [],
      stats: {
        total_participants: totalParticipants,
        completed_all_5: completedAll5
      },
      details
    });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.message }, 500);
  }
}

// DELETE /api/leaderboard - Admin reset action
export async function onRequestDelete({ request, env }) {
  try {
    const adminKey = request.headers.get("x-admin-key") || "";
    const expectedKey = env.ADMIN_SECRET_KEY || "marathon2026";

    if (adminKey !== expectedKey) {
      return jsonResponse({ status: "error", message: "Unauthorized: Invalid Admin Key" }, 401);
    }

    if (!env.DB) {
      return jsonResponse({ error: "D1 Database binding 'DB' not configured" }, 500);
    }

    const url = new URL(request.url);
    const targetId = url.searchParams.get("telegram_id");
    const targetUser = url.searchParams.get("username");
    const purgeAll = url.searchParams.get("purge_all") === "true";

    if (purgeAll) {
      await env.DB.prepare("DELETE FROM submissions").run();
      await env.DB.prepare("INSERT INTO admin_audit_logs (action, details) VALUES (?, ?)").bind("PURGE_ALL", "Purged all submissions").run();
      return jsonResponse({ status: "success", message: "Seluruh data submission berhasil direset" });
    }

    if (targetId) {
      await env.DB.prepare("DELETE FROM submissions WHERE telegram_id = ?").bind(targetId).run();
      return jsonResponse({ status: "success", message: `Data untuk ID Telegram ${targetId} berhasil dihapus` });
    }

    if (targetUser) {
      await env.DB.prepare("DELETE FROM submissions WHERE username = ?").bind(targetUser).run();
      return jsonResponse({ status: "success", message: `Data untuk user ${targetUser} berhasil dihapus` });
    }

    return jsonResponse({ status: "error", message: "Parameter target reset tidak ditemukan" }, 400);
  } catch (err) {
    return jsonResponse({ status: "error", message: err.message }, 500);
  }
}
