-- =============================================================================
-- Cloudflare D1 Database Schema
-- Web Trivia Marathon (Google One AI Pro 5TB Giveaway)
-- =============================================================================

-- 1. Configuration & Session State Table
CREATE TABLE IF NOT EXISTS sessions_config (
  session_number INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  is_active INTEGER DEFAULT 0, -- 0: Locked/Closed, 1: Active/Open
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Pre-populate 5 Marathon Sessions
INSERT OR IGNORE INTO sessions_config (session_number, title, is_active) VALUES
  (1, 'Sesi 1: Cloud & Ekosistem Google', 0),
  (2, 'Sesi 2: Artificial Intelligence & Gemini', 0),
  (3, 'Sesi 3: Fondasi Komputasi & Hardware', 0),
  (4, 'Sesi 4: Internet, Web & Cybersecurity', 0),
  (5, 'Sesi 5: Grand Finale & Future Tech', 0);

-- 2. Registered Participants Table (Instant registration upon entering marathon arena)
CREATE TABLE IF NOT EXISTS participants (
  telegram_id TEXT PRIMARY KEY,
  telegram_name TEXT NOT NULL,
  username TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_participants_username ON participants(username);

-- 3. Official Participant Submissions Table
-- Now includes full verification: telegram_name, username (@), and immutable telegram_id
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_name TEXT NOT NULL,         -- Nama akun Telegram (display name)
  username TEXT NOT NULL,              -- Username Telegram (@...)
  telegram_id TEXT NOT NULL,           -- ID Telegram numerik permanen
  session_number INTEGER NOT NULL,
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_duration INTEGER NOT NULL,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  -- Anti-Duplicate: 1 Telegram ID hanya bisa submit 1 kali per sesi (tidak bisa diakali ganti username)
  UNIQUE(telegram_id, session_number)
);

-- Indexes for lightning-fast leaderboard querying
CREATE INDEX IF NOT EXISTS idx_submissions_telegram_id ON submissions(telegram_id);
CREATE INDEX IF NOT EXISTS idx_submissions_username ON submissions(username);
CREATE INDEX IF NOT EXISTS idx_submissions_session ON submissions(session_number);
CREATE INDEX IF NOT EXISTS idx_submissions_score ON submissions(score DESC);

-- 3. Admin Settings & Audit Logs
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  details TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
