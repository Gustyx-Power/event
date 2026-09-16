/**
 * Internationalization (i18n) Dictionary
 * Bilingual Support: Indonesian (ID) & English (EN)
 */

const I18N = {
  id: {
    // Header & Meta
    appName: "Google One AI Pro",
    marathonBadge: "Maraton 12 Jam",
    prizeTag: "Hadiah Utama",
    prizeTitle: "Akun Google One AI Pro 5 TB",
    prizeDesc: "Akses 1 tahun penuh: Gemini Advanced, 5.000 GB cloud storage, Google Workspace premium.",
    
    // Onboarding
    welcomeTitle: "Trivia Marathon Giveaway",
    welcomeSubtitle: "Buktikan ketangkasan dan pengetahuan teknologi kamu dalam 5 sesi kuis bertempo cepat!",
    telegramNameLabel: "Nama Akun Telegram (Display Name)",
    telegramNamePlaceholder: "Contoh: Budi Santoso",
    telegramNameError: "Nama Telegram wajib diisi (minimal 2 karakter)!",
    telegramLabel: "Username Telegram (@)",
    telegramPlaceholder: "@username_kamu",
    telegramHint: "Wajib diawali tanda '@' untuk verifikasi klaim hadiah.",
    telegramError: "Username harus diawali tanda '@' dan minimal 3 karakter!",
    telegramIdLabel: "ID Telegram Numerik (User ID)",
    telegramIdPlaceholder: "Contoh: 123456789",
    telegramIdHint: "Cek ID kamu di bot Telegram @userinfobot atau @myidbot",
    telegramIdError: "ID Telegram harus berupa angka unik (minimal 5 digit)!",
    btnStartMarathon: "Masuk Arena Maraton 🚀",
    rulesHeader: "Aturan Singkat:",
    rule1: "5 Sesi Terpisah @ 30 soal singkat (10 Mudah, 10 Sedang, 10 Sulit).",
    rule2: "Waktu adaptif: Mudah 15 detik, Sedang 1 menit (60 dtk), Sulit 2 menit (120 dtk). Makin cepat menjawab = bonus poin makin tinggi.",
    rule3: "Sesi hanya dapat dikerjakan 1 kali (Session Lock).",
    rule4: "Dilarang berpindah tab browser selama kuis berlangsung (Anti-Cheat aktif).",
    
    // Lobby
    lobbyGreeting: "Selamat Datang,",
    totalScoreLabel: "Total Akumulasi Skor",
    sessionsHeader: "Jadwal 5 Sesi Maraton",
    sessionLocked: "Terkunci",
    sessionReady: "Mulai Sekarang",
    sessionCompleted: "Selesai",
    sessionScore: "Skor Sesi",
    sessionDuration: "Durasi",
    unlockCountdown: "Buka dalam:",
    btnPlaySession: "Mulai Sesi Ini",
    btnReviewSession: "Lihat Hasil Sesi",
    allSessionsDone: "Selamat! Kamu telah menyelesaikan seluruh 5 sesi maraton!",
    devModeActive: "Mode Pengembang Aktif: Jadwal Sesi Dibuka Manual",
    btnToggleDevMode: "Buka Semua Sesi (Demo)",
    
    // Sessions Title & Description
    sessionTitles: [
      "Sesi 1: Cloud & Ekosistem Google",
      "Sesi 2: Artificial Intelligence & Gemini",
      "Sesi 3: Fondasi Komputasi & Hardware",
      "Sesi 4: Internet, Web & Cybersecurity",
      "Sesi 5: Grand Finale & Future Tech"
    ],
    sessionDescs: [
      "Google One, Drive, Photos, arsitektur cloud storage, dan Workspace.",
      "Model Gemini, LLM, penalaran multimodal, dan revolusi generative AI.",
      "CPU, GPU, RAM, memori semikonduktor, bandwidth, dan hukum arsitektur.",
      "Protokol web, enkripsi data, keamanan siber, dan Zero Trust.",
      "Komputasi kuantum, Edge AI, sistem otonom, dan rekor teknologi masa kini."
    ],

    // Game HUD
    questionProgress: "Soal",
    of: "dari",
    scoreHud: "Skor",
    streakHud: "Streak",
    timeLeftHud: "Waktu",
    difficultyEasy: "Mudah",
    difficultyMedium: "Sedang",
    difficultyHard: "Sulit",
    
    // Anti-Cheat Modal
    antiCheatTitle: "Peringatan Anti-Cheat!",
    antiCheatMsg: "Kamu terdeteksi berpindah tab atau meninggalkan jendela browser. Tetaplah fokus pada kuis untuk menghindari diskualifikasi soal!",
    antiCheatActionBtn: "Kembali ke Kuis",
    
    // Result View
    resultHeader: "Sesi Selesai!",
    resultSubtitle: "Kerja luar biasa! Berikut performa kamu pada sesi ini:",
    finalScoreLabel: "Total Skor Sesi",
    statCorrect: "Jawaban Benar",
    statAccuracy: "Akurasi",
    statTime: "Total Waktu",
    btnBackToLobby: "Kembali ke Beranda",
    syncingStatus: "Mengirim skor ke Google Sheets...",
    syncSuccessStatus: "Skor berhasil diverifikasi & dicatat di Google Sheets!",
    syncOfflineStatus: "Skor tersimpan di browser (Mode Demo / URL GAS belum dikonfigurasi).",
    syncErrorStatus: "Gagal menyambung ke server. Skor tetap aman tersimpan di browser.",
    
    // Audio Toggle
    soundOn: "Suara Aktif",
    soundOff: "Suara Mati"
  },
  
  en: {
    // Header & Meta
    appName: "Google One AI Pro",
    marathonBadge: "12-Hour Marathon",
    prizeTag: "Grand Prize",
    prizeTitle: "Google One AI Pro 5 TB Account",
    prizeDesc: "Full 1-year access: Gemini Advanced, 5,000 GB cloud storage, premium Google Workspace.",
    
    // Onboarding
    welcomeTitle: "Trivia Marathon Giveaway",
    welcomeSubtitle: "Test your tech speed and knowledge across 5 high-octane quiz sessions!",
    telegramNameLabel: "Telegram Display Name",
    telegramNamePlaceholder: "e.g. John Doe",
    telegramNameError: "Telegram name is required (min 2 characters)!",
    telegramLabel: "Telegram Username (@)",
    telegramPlaceholder: "@your_username",
    telegramHint: "Must begin with '@' for prize distribution verification.",
    telegramError: "Username must start with '@' and contain at least 3 characters!",
    telegramIdLabel: "Numeric Telegram User ID",
    telegramIdPlaceholder: "e.g. 123456789",
    telegramIdHint: "Check your ID using Telegram bots like @userinfobot or @myidbot",
    telegramIdError: "Telegram ID must be numeric (min 5 digits)!",
    btnStartMarathon: "Enter Marathon Arena 🚀",
    rulesHeader: "Quick Rules:",
    rule1: "5 Discrete Sessions @ 30 rapid questions (10 Easy, 10 Medium, 10 Hard).",
    rule2: "Adaptive timer: Easy 15s, Medium 1 min (60s), Hard 2 min (120s). Faster answers yield higher bonus points.",
    rule3: "Each session can only be attempted once (Session Lock).",
    rule4: "Switching browser tabs during the quiz is strictly penalized (Anti-Cheat active).",
    
    // Lobby
    lobbyGreeting: "Welcome,",
    totalScoreLabel: "Accumulated Marathon Score",
    sessionsHeader: "5 Marathon Sessions Schedule",
    sessionLocked: "Locked",
    sessionReady: "Play Now",
    sessionCompleted: "Completed",
    sessionScore: "Session Score",
    sessionDuration: "Duration",
    unlockCountdown: "Unlocks in:",
    btnPlaySession: "Start Session",
    btnReviewSession: "View Results",
    allSessionsDone: "Congratulations! You have completed all 5 marathon sessions!",
    devModeActive: "Dev Mode Active: All Sessions Manually Unlocked",
    btnToggleDevMode: "Unlock All Sessions (Demo)",
    
    // Sessions Title & Description
    sessionTitles: [
      "Session 1: Cloud & Google Ecosystem",
      "Session 2: Artificial Intelligence & Gemini",
      "Session 3: Computing & Hardware Foundations",
      "Session 4: Internet, Web & Cybersecurity",
      "Session 5: Grand Finale & Future Tech"
    ],
    sessionDescs: [
      "Google One, Drive, Photos, cloud storage architecture, and Workspace.",
      "Gemini models, LLMs, multimodal reasoning, and generative AI breakthroughs.",
      "CPUs, GPUs, RAM, semiconductor memory, bandwidth, and architectural laws.",
      "Web protocols, data encryption, cybersecurity, and Zero Trust models.",
      "Quantum computing, Edge AI, autonomous systems, and bleeding-edge records."
    ],

    // Game HUD
    questionProgress: "Question",
    of: "of",
    scoreHud: "Score",
    streakHud: "Streak",
    timeLeftHud: "Time",
    difficultyEasy: "Easy",
    difficultyMedium: "Medium",
    difficultyHard: "Hard",
    
    // Anti-Cheat Modal
    antiCheatTitle: "Anti-Cheat Warning!",
    antiCheatMsg: "You were detected switching tabs or unfocusing the browser window. Stay focused on the quiz to avoid question disqualification!",
    antiCheatActionBtn: "Return to Quiz",
    
    // Result View
    resultHeader: "Session Completed!",
    resultSubtitle: "Outstanding job! Here is your performance breakdown:",
    finalScoreLabel: "Total Session Score",
    statCorrect: "Correct Answers",
    statAccuracy: "Accuracy",
    statTime: "Total Time",
    btnBackToLobby: "Back to Lobby",
    syncingStatus: "Syncing score to Google Sheets...",
    syncSuccessStatus: "Score verified & recorded in Google Sheets!",
    syncOfflineStatus: "Score stored locally (Demo Mode / GAS URL not yet set).",
    syncErrorStatus: "Failed to connect to backend. Score safely preserved locally.",
    
    // Audio Toggle
    soundOn: "Sound On",
    soundOff: "Sound Off"
  }
};
