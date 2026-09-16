const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const DB_FILE = path.join(__dirname, '.local_db.json');

function loadLocalDB() {
  if (fs.existsSync(DB_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (e) {}
  }
  return {
    sessions: [
      { session_number: 1, title: 'Sesi 1: Cloud & Ekosistem Google', is_active: 0 },
      { session_number: 2, title: 'Sesi 2: Artificial Intelligence & Gemini', is_active: 0 },
      { session_number: 3, title: 'Sesi 3: Fondasi Komputasi & Hardware', is_active: 0 },
      { session_number: 4, title: 'Sesi 4: Internet, Web & Cybersecurity', is_active: 0 },
      { session_number: 5, title: 'Sesi 5: Grand Finale & Future Tech', is_active: 0 }
    ],
    participants: [],
    submissions: [],
    logs: []
  };
}

function saveLocalDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

let localDb = loadLocalDB();
if (!Array.isArray(localDb.participants)) {
  localDb.participants = [];
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  const sendJson = (data, status = 200) => {
    res.writeHead(status, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, x-admin-key',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS'
    });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'OPTIONS') {
    return sendJson({}, 204);
  }

  // =========================================================================
  // API ROUTING: SIMULATING CLOUDFLARE PAGES FUNCTIONS & D1
  // =========================================================================
  if (pathname === '/api/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const telegramName = (payload.telegram_name || '').toString().trim();
        const username = (payload.username || '').toString().trim();
        const telegramId = (payload.telegram_id || '').toString().trim();

        if (!telegramName || telegramName.length < 2) {
          return sendJson({ status: 'error', message: 'Nama akun Telegram minimal 2 karakter' }, 400);
        }
        if (!username.startsWith('@') || username.length < 3) {
          return sendJson({ status: 'error', message: 'Username Telegram harus diawali @' }, 400);
        }
        if (!telegramId || !/^\d{5,15}$/.test(telegramId)) {
          return sendJson({ status: 'error', message: 'ID Telegram harus berupa angka (5 - 15 digit)' }, 400);
        }

        const existingIdx = localDb.participants.findIndex(p => p.telegram_id === telegramId);
        if (existingIdx >= 0) {
          localDb.participants[existingIdx].telegram_name = telegramName;
          localDb.participants[existingIdx].username = username;
        } else {
          localDb.participants.push({
            telegram_id: telegramId,
            telegram_name: telegramName,
            username: username,
            created_at: new Date().toISOString()
          });
        }

        saveLocalDB(localDb);
        return sendJson({
          status: 'success',
          message: 'Peserta berhasil terdaftar di turnamen',
          participant: { telegram_id: telegramId, telegram_name: telegramName, username }
        });
      } catch (e) {
        return sendJson({ status: 'error', message: e.message }, 400);
      }
    });
    return;
  }
  if (pathname === '/api/sessions') {
    if (req.method === 'GET') {
      return sendJson({ status: 'success', sessions: localDb.sessions });
    }

    if (req.method === 'POST') {
      const adminKey = req.headers['x-admin-key'];
      if (adminKey !== 'marathon2026') {
        return sendJson({ status: 'error', message: 'Unauthorized: Invalid Admin Key' }, 401);
      }

      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body);
          const sNum = parseInt(payload.session_number, 10);
          const isActive = payload.is_active ? 1 : 0;

          const s = localDb.sessions.find(item => item.session_number === sNum);
          if (s) {
            s.is_active = isActive;
            s.updated_at = new Date().toISOString();
            saveLocalDB(localDb);
            return sendJson({ status: 'success', message: `Session ${sNum} updated to ${isActive ? 'ACTIVE' : 'LOCKED'}` });
          }
          return sendJson({ status: 'error', message: 'Session not found' }, 404);
        } catch (e) {
          return sendJson({ status: 'error', message: e.message }, 400);
        }
      });
      return;
    }
  }

  if (pathname === '/api/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const telegramName = (data.telegram_name || '').toString().trim();
        const username = (data.username || '').toString().trim();
        const telegramId = (data.telegram_id || '').toString().trim();
        const session = parseInt(data.session, 10);
        const score = parseInt(data.score, 10) || 0;
        const correctAnswers = parseInt(data.correctAnswers, 10) || 0;
        const totalDuration = parseInt(data.totalDuration, 10) || 0;
        const userAgent = data.userAgent || req.headers['user-agent'] || 'Unknown';

        if (!telegramName || telegramName.length < 2) {
          return sendJson({ status: 'error', message: 'Nama Telegram wajib diisi' }, 400);
        }
        if (!username.startsWith('@') || username.length < 3) {
          return sendJson({ status: 'error', message: 'Username Telegram harus diawali @' }, 400);
        }
        if (!telegramId || !/^\d{5,15}$/.test(telegramId)) {
          return sendJson({ status: 'error', message: 'ID Telegram wajib berupa angka unik (min 5 digit)' }, 400);
        }

        // Check if session is active
        const s = localDb.sessions.find(item => item.session_number === session);
        if (!s || s.is_active !== 1) {
          return sendJson({ status: 'error', message: `Sesi ${session} saat ini sedang dikunci oleh Admin.` }, 403);
        }

        // Check unique constraint (telegram_id + session)
        const duplicate = localDb.submissions.find(item => item.telegram_id === telegramId && item.session_number === session);
        if (duplicate) {
          return sendJson({ status: 'error', message: `Akun Telegram ini (ID: ${telegramId}) sudah pernah mengirimkan skor untuk Sesi ${session}.` }, 409);
        }

        localDb.submissions.push({
          id: localDb.submissions.length + 1,
          telegram_name: telegramName,
          username,
          telegram_id: telegramId,
          session_number: session,
          score,
          correct_answers: correctAnswers,
          total_duration: totalDuration,
          user_agent: userAgent,
          created_at: new Date().toISOString()
        });

        // Ensure in participants
        const pIdx = localDb.participants.findIndex(p => p.telegram_id === telegramId);
        if (pIdx >= 0) {
          localDb.participants[pIdx].telegram_name = telegramName;
          localDb.participants[pIdx].username = username;
        } else {
          localDb.participants.push({
            telegram_id: telegramId,
            telegram_name: telegramName,
            username: username,
            created_at: new Date().toISOString()
          });
        }

        saveLocalDB(localDb);
        return sendJson({ status: 'success', message: 'Skor resmi berhasil dicatat!' });
      } catch (e) {
        return sendJson({ status: 'error', message: e.message }, 400);
      }
    });
    return;
  }

  if (pathname === '/api/leaderboard') {
    if (req.method === 'GET') {
      const withDetails = parsedUrl.searchParams.get('details') === 'true';

      // SQL aggregation: start with all registered participants
      const userMap = {};

      (localDb.participants || []).forEach(p => {
        const idKey = p.telegram_id || p.username;
        userMap[idKey] = {
          telegram_id: p.telegram_id,
          telegram_name: p.telegram_name || p.username,
          username: p.username,
          total_score: 0,
          sessions_completed: 0,
          total_duration: 0,
          last_submitted: p.created_at,
          sessions_set: new Set()
        };
      });

      localDb.submissions.forEach(sub => {
        const idKey = sub.telegram_id || sub.username;
        if (!userMap[idKey]) {
          userMap[idKey] = {
            telegram_id: sub.telegram_id || 'N/A',
            telegram_name: sub.telegram_name || sub.username,
            username: sub.username,
            total_score: 0,
            sessions_completed: 0,
            total_duration: 0,
            last_submitted: sub.created_at,
            sessions_set: new Set()
          };
        }
        const u = userMap[idKey];
        u.telegram_name = sub.telegram_name || u.telegram_name;
        u.username = sub.username;
        u.total_score += sub.score;
        u.total_duration += sub.total_duration;
        u.sessions_set.add(sub.session_number);
        u.sessions_completed = u.sessions_set.size;
        if (new Date(sub.created_at) > new Date(u.last_submitted)) {
          u.last_submitted = sub.created_at;
        }
      });

      const leaderboard = Object.values(userMap).map(u => {
        const { sessions_set, ...rest } = u;
        return rest;
      }).sort((a, b) => {
        if (b.total_score !== a.total_score) return b.total_score - a.total_score;
        return a.total_duration - b.total_duration;
      });

      return sendJson({
        status: 'success',
        leaderboard,
        stats: {
          total_participants: leaderboard.length,
          completed_all_5: leaderboard.filter(u => u.sessions_completed >= 5).length
        },
        details: withDetails ? localDb.submissions : null
      });
    }

    if (req.method === 'DELETE') {
      const adminKey = req.headers['x-admin-key'];
      if (adminKey !== 'marathon2026') {
        return sendJson({ status: 'error', message: 'Unauthorized' }, 401);
      }

      const purgeAll = parsedUrl.searchParams.get('purge_all') === 'true';
      if (purgeAll) {
        localDb.submissions = [];
        localDb.participants = [];
        saveLocalDB(localDb);
        return sendJson({ status: 'success', message: 'Semua peserta dan submission dibersihkan' });
      }

      const targetId = parsedUrl.searchParams.get('telegram_id');
      const targetUser = parsedUrl.searchParams.get('username');

      if (targetId) {
        localDb.submissions = localDb.submissions.filter(s => s.telegram_id !== targetId);
        localDb.participants = localDb.participants.filter(p => p.telegram_id !== targetId);
        saveLocalDB(localDb);
        return sendJson({ status: 'success', message: `Data ID Telegram ${targetId} berhasil dihapus` });
      }

      if (targetUser) {
        localDb.submissions = localDb.submissions.filter(s => s.username.toLowerCase() !== targetUser.toLowerCase());
        localDb.participants = localDb.participants.filter(p => p.username.toLowerCase() !== targetUser.toLowerCase());
        saveLocalDB(localDb);
        return sendJson({ status: 'success', message: `Data untuk ${targetUser} berhasil dihapus` });
      }

      return sendJson({ status: 'error', message: 'Missing target' }, 400);
    }
  }

  // =========================================================================
  // STATIC ASSETS SERVING
  // =========================================================================
  let reqPath = pathname;
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Trivia Edge Dev Server running at http://localhost:${PORT}`);
});
