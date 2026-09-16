/**
 * Cloudflare Pages Function: /api/sessions
 * Handles session status querying (public) and session control (admin only).
 */

const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, x-admin-key",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    }
  });
};

export async function onRequestOptions() {
  return jsonResponse({}, 204);
}

// GET /api/sessions - Returns active status for all 5 sessions
export async function onRequestGet({ env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 Database binding 'DB' not configured" }, 500);
    }

    const { results } = await env.DB.prepare(
      "SELECT session_number, title, is_active, updated_at FROM sessions_config ORDER BY session_number ASC"
    ).all();

    return jsonResponse({
      status: "success",
      sessions: results || []
    });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.message }, 500);
  }
}

// POST /api/sessions - Admin updates session status (Open/Lock)
export async function onRequestPost({ request, env }) {
  try {
    const adminKey = request.headers.get("x-admin-key") || "";
    const expectedKey = env.ADMIN_SECRET_KEY || "marathon2026";

    if (adminKey !== expectedKey) {
      return jsonResponse({ status: "error", message: "Unauthorized: Invalid Admin Key" }, 401);
    }

    if (!env.DB) {
      return jsonResponse({ error: "D1 Database binding 'DB' not configured" }, 500);
    }

    const body = await request.json();
    const sessionNumber = parseInt(body.session_number, 10);
    const isActive = body.is_active ? 1 : 0;

    if (isNaN(sessionNumber) || sessionNumber < 1 || sessionNumber > 5) {
      return jsonResponse({ status: "error", message: "Invalid session number (1-5)" }, 400);
    }

    // Update session status in D1
    await env.DB.prepare(
      "UPDATE sessions_config SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE session_number = ?"
    ).bind(isActive, sessionNumber).run();

    // Log admin action
    await env.DB.prepare(
      "INSERT INTO admin_audit_logs (action, details) VALUES (?, ?)"
    ).bind("TOGGLE_SESSION", `Session ${sessionNumber} set to ${isActive ? "ACTIVE" : "LOCKED"}`).run();

    return jsonResponse({
      status: "success",
      message: `Session ${sessionNumber} status updated to ${isActive ? "ACTIVE" : "LOCKED"}`
    });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.message }, 500);
  }
}
