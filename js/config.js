/**
 * Application Configuration
 * Web Trivia Marathon (Google One AI Pro 5TB Giveaway)
 * Cloudflare Pages + Cloudflare D1 Architecture
 */

const CONFIG = {
  // Event Information
  EVENT_NAME: "Google One AI Pro 5TB Marathon",
  TOTAL_SESSIONS: 5,
  QUESTIONS_PER_SESSION: 30, // 10 Easy, 10 Medium, 10 Hard
  
  // Dynamic Question Time Limits (per difficulty)
  QUESTION_TIME_LIMITS: {
    easy: 15,    // 15 detik untuk Mudah
    medium: 60,  // 1 Menit (60 detik) untuk Sedang
    hard: 120    // 2 Menit (120 detik) untuk Sulit
  },
  
  // Scoring Constants: Base + Speed Bonus (Proportional to remaining time ratio)
  SCORING: {
    easy: { base: 100, maxBonus: 105 },   // Max ~205 poin
    medium: { base: 150, maxBonus: 150 }, // Max ~300 poin (1 menit)
    hard: { base: 200, maxBonus: 200 }    // Max ~400 poin (2 menit)
  },
  
  // Edge API Endpoints (Relative for Cloudflare Pages same-origin)
  API_ENDPOINTS: {
    REGISTER: "/api/register",
    SESSIONS: "/api/sessions",
    SUBMIT: "/api/submit",
    LEADERBOARD: "/api/leaderboard"
  },

  // Admin Security Default Key
  DEFAULT_ADMIN_KEY: "marathon2026",
  
  // Anti-Cheat & Safeguards
  ANTI_CHEAT: {
    ENABLE_VISIBILITY_CHECK: true,
    MAX_WARNINGS_BEFORE_FAIL: 1, // 1 warning, subsequent triggers auto-fail current question
    PREVENT_CONTEXT_MENU: false,
  },
  
  // Storage Keys
  STORAGE_KEYS: {
    TELEGRAM_NAME: "telegram_name",
    USER_TELEGRAM: "user_telegram",
    TELEGRAM_ID: "telegram_id",
    USER_LANG: "user_lang",
    USER_AUDIO: "user_audio_muted",
    SESSION_PREFIX: "trivia_session_",
    AGGREGATE_PREFIX: "trivia_marathon_summary",
    SUBMIT_LOGS: "trivia_submitted_payloads"
  }
};
