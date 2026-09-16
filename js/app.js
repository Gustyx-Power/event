/**
 * Core Application Engine & State Machine
 * Web Trivia Marathon (Google One AI Pro 5TB Giveaway)
 * Cloudflare Pages + Cloudflare D1 Architecture
 */

class TriviaApp {
  constructor() {
    this.currentLang = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_LANG) || "id";
    this.currentUser = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_TELEGRAM) || "";
    
    // Remote Server Session States
    this.serverSessions = [];
    this.sessionPollTimer = null;

    // Game Session State
    this.activeSessionId = null;
    this.activeQuestions = [];
    this.currentQuestionIdx = 0;
    this.sessionScore = 0;
    this.sessionCorrectCount = 0;
    this.sessionStartTime = null;
    this.questionStartTime = null;
    this.streak = 0;
    
    // Timer handles
    this.timerRaf = null;
    this.timerDurationMs = CONFIG.QUESTION_TIME_LIMIT_SEC * 1000;
    this.timerRemainingMs = this.timerDurationMs;
    this.isOptionLocked = false;
    this.lastTickSec = null;

    // Anti-Cheat tracking
    this.tabWarnings = 0;
    this.isGameActive = false;
    
    // DOM elements cache
    this.dom = {};
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.applyLanguage(this.currentLang);
    this.updateSoundButtonUI();
    
    // Route to appropriate view
    if (!this.currentUser) {
      this.switchView("onboarding");
    } else {
      this.switchView("lobby");
      this.syncRegistrationToBackend();
      this.refreshServerSessionsAndLobby();
      this.startSessionPolling();
    }
  }

  cacheDom() {
    this.dom = {
      app: document.getElementById("app"),
      onboardingView: document.getElementById("view-onboarding"),
      lobbyView: document.getElementById("view-lobby"),
      gameView: document.getElementById("view-game"),
      resultView: document.getElementById("view-result"),

      // Header & Controls
      langToggleBtns: document.querySelectorAll(".lang-btn"),
      soundToggleBtn: document.getElementById("btn-sound-toggle"),
      soundIcon: document.getElementById("sound-icon"),

      // Onboarding
      telegramNameInput: document.getElementById("input-telegram-name"),
      telegramNameError: document.getElementById("msg-telegram-name-error"),
      telegramInput: document.getElementById("input-telegram"),
      telegramError: document.getElementById("msg-telegram-error"),
      telegramIdInput: document.getElementById("input-telegram-id"),
      telegramIdError: document.getElementById("msg-telegram-id-error"),
      btnStart: document.getElementById("btn-start-marathon"),

      // Lobby
      userGreetingName: document.getElementById("user-greeting-name"),
      userTelegramIdBadge: document.getElementById("user-telegram-id-badge"),
      userTotalScore: document.getElementById("user-total-score"),
      sessionsContainer: document.getElementById("sessions-container"),

      // Game HUD & Elements
      hudSessionName: document.getElementById("hud-session-name"),
      hudProgress: document.getElementById("hud-progress"),
      hudDifficulty: document.getElementById("hud-difficulty"),
      hudScore: document.getElementById("hud-score"),
      hudStreakCount: document.getElementById("hud-streak-count"),
      hudStreakPill: document.getElementById("hud-streak-pill"),
      timerBar: document.getElementById("timer-bar"),
      timerText: document.getElementById("timer-text"),
      questionText: document.getElementById("question-text"),
      optionsContainer: document.getElementById("options-container"),

      // Result View
      resultSessionTitle: document.getElementById("result-session-title"),
      resultScore: document.getElementById("result-score"),
      resultCorrect: document.getElementById("result-correct"),
      resultAccuracy: document.getElementById("result-accuracy"),
      resultTime: document.getElementById("result-time"),
      syncStatusBox: document.getElementById("sync-status-box"),
      syncStatusText: document.getElementById("sync-status-text"),
      btnBackLobby: document.getElementById("btn-back-lobby"),

      // Anti Cheat Modal
      antiCheatModal: document.getElementById("anti-cheat-modal"),
      btnResumeQuiz: document.getElementById("btn-resume-quiz"),
      
      // Confetti Canvas
      confettiCanvas: document.getElementById("confetti-canvas")
    };
  }

  bindEvents() {
    // Language Switcher
    this.dom.langToggleBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetLang = btn.getAttribute("data-lang");
        this.setLanguage(targetLang);
        Sound.playTap();
      });
    });

    // Sound Toggle
    this.dom.soundToggleBtn.addEventListener("click", () => {
      const isMuted = Sound.toggleMute();
      this.updateSoundButtonUI();
      if (!isMuted) Sound.playTap();
    });

    // Registration Form (3 Fields)
    this.dom.btnStart.addEventListener("click", () => this.handleRegistration());
    
    [this.dom.telegramNameInput, this.dom.telegramInput, this.dom.telegramIdInput].forEach(inp => {
      if (inp) {
        inp.addEventListener("keydown", (e) => {
          if (e.key === "Enter") this.handleRegistration();
        });
      }
    });

    if (this.dom.telegramNameInput) {
      this.dom.telegramNameInput.addEventListener("input", () => {
        this.dom.telegramNameInput.classList.remove("error");
        this.dom.telegramNameError.classList.remove("visible");
      });
    }

    if (this.dom.telegramInput) {
      this.dom.telegramInput.addEventListener("input", () => {
        this.dom.telegramInput.classList.remove("error");
        this.dom.telegramError.classList.remove("visible");
      });
    }

    if (this.dom.telegramIdInput) {
      this.dom.telegramIdInput.addEventListener("input", () => {
        this.dom.telegramIdInput.classList.remove("error");
        this.dom.telegramIdError.classList.remove("visible");
      });
    }

    // Result Back to Lobby
    this.dom.btnBackLobby.addEventListener("click", () => {
      Sound.playTap();
      this.switchView("lobby");
      this.refreshServerSessionsAndLobby();
      this.startSessionPolling();
    });

    // Anti-Cheat Modal Close
    this.dom.btnResumeQuiz.addEventListener("click", () => {
      Sound.playTap();
      this.hideAntiCheatModal();
      if (this.isGameActive) {
        this.resumeQuestionTimer();
      }
    });

    // Anti-Cheat: Visibility Change & Window Blur
    if (CONFIG.ANTI_CHEAT.ENABLE_VISIBILITY_CHECK) {
      document.addEventListener("visibilitychange", () => {
        if (document.hidden && this.isGameActive) {
          this.triggerAntiCheatViolation();
        }
      });

      window.addEventListener("blur", () => {
        if (this.isGameActive) {
          this.triggerAntiCheatViolation();
        }
      });
    }

    if (CONFIG.ANTI_CHEAT.PREVENT_CONTEXT_MENU) {
      document.addEventListener("contextmenu", (e) => e.preventDefault());
    }
  }

  // =========================================================================
  // INTERNATIONALIZATION & UI
  // =========================================================================

  setLanguage(lang) {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    localStorage.setItem(CONFIG.STORAGE_KEYS.USER_LANG, lang);
    this.applyLanguage(lang);
    if (this.isViewActive("lobby")) {
      this.renderLobby();
    } else if (this.isViewActive("game") && this.activeQuestions.length > 0) {
      this.renderCurrentQuestion();
    }
  }

  applyLanguage(lang) {
    const dict = I18N[lang] || I18N.id;

    this.dom.langToggleBtns.forEach(btn => {
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    if (this.dom.telegramInput) {
      this.dom.telegramInput.placeholder = dict.telegramPlaceholder;
    }
  }

  t(key) {
    const dict = I18N[this.currentLang] || I18N.id;
    return dict[key] || key;
  }

  updateSoundButtonUI() {
    if (Sound.isMuted) {
      this.dom.soundIcon.innerHTML = `
        <svg class="ui-icon" viewBox="0 0 24 24">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      `;
      this.dom.soundToggleBtn.title = this.t("soundOff");
    } else {
      this.dom.soundIcon.innerHTML = `
        <svg class="ui-icon" viewBox="0 0 24 24">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      `;
      this.dom.soundToggleBtn.title = this.t("soundOn");
    }
  }

  // =========================================================================
  // VIEW ROUTER
  // =========================================================================

  switchView(viewName) {
    const views = [
      this.dom.onboardingView,
      this.dom.lobbyView,
      this.dom.gameView,
      this.dom.resultView
    ];

    views.forEach(v => {
      if (v) v.style.display = "none";
    });

    if (viewName === "onboarding") {
      this.dom.onboardingView.style.display = "block";
      this.isGameActive = false;
      this.stopSessionPolling();
    } else if (viewName === "lobby") {
      this.dom.lobbyView.style.display = "block";
      this.isGameActive = false;
    } else if (viewName === "game") {
      this.dom.gameView.style.display = "block";
      this.isGameActive = true;
      this.stopSessionPolling();
    } else if (viewName === "result") {
      this.dom.resultView.style.display = "block";
      this.isGameActive = false;
      this.stopSessionPolling();
    }
  }

  isViewActive(viewName) {
    if (viewName === "onboarding") return this.dom.onboardingView.style.display === "block";
    if (viewName === "lobby") return this.dom.lobbyView.style.display === "block";
    if (viewName === "game") return this.dom.gameView.style.display === "block";
    if (viewName === "result") return this.dom.resultView.style.display === "block";
    return false;
  }

  // =========================================================================
  // ONBOARDING & REGISTRATION
  // =========================================================================

  handleRegistration() {
    const telegramName = (this.dom.telegramNameInput ? this.dom.telegramNameInput.value : "").trim();
    const username = (this.dom.telegramInput ? this.dom.telegramInput.value : "").trim();
    const telegramId = (this.dom.telegramIdInput ? this.dom.telegramIdInput.value : "").trim();

    let hasError = false;

    if (!telegramName || telegramName.length < 2) {
      if (this.dom.telegramNameInput) this.dom.telegramNameInput.classList.add("error");
      if (this.dom.telegramNameError) {
        this.dom.telegramNameError.textContent = this.t("telegramNameError");
        this.dom.telegramNameError.classList.add("visible");
      }
      hasError = true;
    }

    if (!username.startsWith("@") || username.length < 3) {
      if (this.dom.telegramInput) this.dom.telegramInput.classList.add("error");
      if (this.dom.telegramError) {
        this.dom.telegramError.textContent = this.t("telegramError");
        this.dom.telegramError.classList.add("visible");
      }
      hasError = true;
    }

    if (!telegramId || !/^\d{5,15}$/.test(telegramId)) {
      if (this.dom.telegramIdInput) this.dom.telegramIdInput.classList.add("error");
      if (this.dom.telegramIdError) {
        this.dom.telegramIdError.textContent = this.t("telegramIdError");
        this.dom.telegramIdError.classList.add("visible");
      }
      hasError = true;
    }

    if (hasError) {
      Sound.playWrong();
      return;
    }

    this.currentUser = username;
    localStorage.setItem(CONFIG.STORAGE_KEYS.TELEGRAM_NAME, telegramName);
    localStorage.setItem(CONFIG.STORAGE_KEYS.USER_TELEGRAM, username);
    localStorage.setItem(CONFIG.STORAGE_KEYS.TELEGRAM_ID, telegramId);
    Sound.playCorrect();

    this.syncRegistrationToBackend();
    this.switchView("lobby");
    this.refreshServerSessionsAndLobby();
    this.startSessionPolling();
  }

  async syncRegistrationToBackend() {
    const telegramName = localStorage.getItem(CONFIG.STORAGE_KEYS.TELEGRAM_NAME) || "";
    const username = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_TELEGRAM) || "";
    const telegramId = localStorage.getItem(CONFIG.STORAGE_KEYS.TELEGRAM_ID) || "";

    if (!username || !telegramId) return;

    try {
      await fetch(CONFIG.API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegram_name: telegramName || username,
          username: username,
          telegram_id: telegramId
        })
      });
    } catch (err) {
      console.warn("Background registration sync failed:", err);
    }
  }

  // =========================================================================
  // REMOTE SESSIONS & LOBBY MANAGEMENT (D1 Edge Sync)
  // =========================================================================

  async refreshServerSessionsAndLobby() {
    try {
      const res = await fetch(CONFIG.API_ENDPOINTS.SESSIONS);
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.sessions)) {
        this.serverSessions = data.sessions;
      }
    } catch (e) {
      console.warn("Could not fetch remote session status:", e);
    }
    this.renderLobby();
  }

  startSessionPolling() {
    this.stopSessionPolling();
    this.sessionPollTimer = setInterval(() => {
      if (this.isViewActive("lobby")) {
        this.refreshServerSessionsAndLobby();
      }
    }, 6000); // Check server every 6s
  }

  stopSessionPolling() {
    if (this.sessionPollTimer) {
      clearInterval(this.sessionPollTimer);
      this.sessionPollTimer = null;
    }
  }

  renderLobby() {
    const displayName = localStorage.getItem(CONFIG.STORAGE_KEYS.TELEGRAM_NAME) || "";
    const username = this.currentUser || "@participant";
    const telegramId = localStorage.getItem(CONFIG.STORAGE_KEYS.TELEGRAM_ID) || "-";

    this.dom.userGreetingName.textContent = displayName ? `${displayName} (${username})` : username;
    if (this.dom.userTelegramIdBadge) {
      this.dom.userTelegramIdBadge.textContent = `ID Telegram: ${telegramId}`;
    }
    
    // Compute accumulated total score
    let totalScore = 0;
    for (let s = 1; s <= CONFIG.TOTAL_SESSIONS; s++) {
      const data = this.getSessionData(s);
      if (data && data.completed) {
        totalScore += (data.score || 0);
      }
    }
    this.dom.userTotalScore.textContent = totalScore.toLocaleString();

    // Render 5 Session Cards
    this.dom.sessionsContainer.innerHTML = "";
    for (let s = 1; s <= CONFIG.TOTAL_SESSIONS; s++) {
      const card = this.createSessionCard(s);
      this.dom.sessionsContainer.appendChild(card);
    }
  }

  createSessionCard(sessionNum) {
    const localData = this.getSessionData(sessionNum);
    const isCompleted = localData && localData.completed;

    // Check remote session state from Cloudflare D1
    const serverConfig = this.serverSessions.find(item => item.session_number === sessionNum);
    const isServerOpen = serverConfig ? serverConfig.is_active === 1 : false;

    const card = document.createElement("div");
    card.className = "session-clay-card";

    let badgeHtml = "";
    if (isCompleted) {
      badgeHtml = `<span class="session-badge-status status-completed">
        <svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" style="stroke-width:3;"><polyline points="20 6 9 17 4 12"/></svg>
        ${this.t("sessionCompleted")}
      </span>`;
    } else if (isServerOpen) {
      badgeHtml = `<span class="session-badge-status status-ready">
        <svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        ${this.t("sessionReady")}
      </span>`;
    } else {
      badgeHtml = `<span class="session-badge-status status-locked">
        <svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        ${this.t("sessionLocked")}
      </span>`;
    }

    const dict = I18N[this.currentLang] || I18N.id;
    const title = dict.sessionTitles[sessionNum - 1] || `Session ${sessionNum}`;
    const desc = dict.sessionDescs[sessionNum - 1] || "";

    let bottomHtml = "";
    if (isCompleted) {
      bottomHtml = `
        <div class="session-metrics">
          <span class="session-metrics-lbl">${this.t("sessionScore")}</span>
          <span class="session-metrics-val">${localData.score.toLocaleString()} pts</span>
        </div>
        <button class="clay-btn clay-btn-neutral clay-btn-block" onclick="app.reviewSession(${sessionNum})">
          <svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span>${this.t("btnReviewSession")}</span>
        </button>
      `;
    } else if (isServerOpen) {
      bottomHtml = `
        <div class="session-metrics">
          <span class="session-metrics-lbl">30 Soal Acak</span>
          <span class="session-metrics-val">15s – 2m / Soal</span>
        </div>
        <button class="clay-btn clay-btn-primary clay-btn-block" onclick="app.startSession(${sessionNum})">
          <span>${this.t("btnPlaySession")}</span>
          <svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </button>
      `;
    } else {
      bottomHtml = `
        <div class="session-timer-box">
          <span>Menunggu Pembukaan Jadwal Panitia...</span>
        </div>
        <button class="clay-btn clay-btn-neutral clay-btn-block disabled" disabled>
          <svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>${this.t("sessionLocked")}</span>
        </button>
      `;
    }

    card.innerHTML = `
      ${badgeHtml}
      <div>
        <div class="session-number-pill">${sessionNum}</div>
        <h3 class="session-title">${title}</h3>
        <p class="session-desc">${desc}</p>
      </div>
      <div>
        ${bottomHtml}
      </div>
    `;

    return card;
  }

  getSessionData(sessionNum) {
    const raw = localStorage.getItem(`${CONFIG.STORAGE_KEYS.SESSION_PREFIX}${sessionNum}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  saveSessionData(sessionNum, data) {
    localStorage.setItem(`${CONFIG.STORAGE_KEYS.SESSION_PREFIX}${sessionNum}`, JSON.stringify(data));
  }

  // =========================================================================
  // GAME ENGINE & QUIZ LOOP (30 Questions, 7s per Question)
  // =========================================================================

  startSession(sessionNum) {
    const existing = this.getSessionData(sessionNum);
    if (existing && existing.completed) {
      alert("Sesi ini sudah pernah kamu kerjakan!");
      return;
    }

    // Verify against server state
    const sConf = this.serverSessions.find(s => s.session_number === sessionNum);
    if (sConf && sConf.is_active !== 1) {
      alert("Sesi ini belum dibuka oleh Admin!");
      return;
    }

    Sound.playTap();

    this.activeSessionId = sessionNum;
    this.sessionScore = 0;
    this.sessionCorrectCount = 0;
    this.streak = 0;
    this.tabWarnings = 0;
    this.sessionStartTime = Date.now();

    const langBank = questionsBank[this.currentLang] || questionsBank.id;
    const rawQuestions = langBank[`session${sessionNum}`] || [];

    // Fisher-Yates Shuffle
    this.activeQuestions = this.shuffleArray([...rawQuestions]);

    this.currentQuestionIdx = 0;
    this.switchView("game");
    this.loadQuestion(this.currentQuestionIdx);
  }

  loadQuestion(idx) {
    if (idx >= this.activeQuestions.length) {
      this.finishSession();
      return;
    }

    this.isOptionLocked = false;
    const q = this.activeQuestions[idx];

    const dict = I18N[this.currentLang] || I18N.id;
    this.dom.hudSessionName.textContent = dict.sessionTitles[this.activeSessionId - 1] || `Session ${this.activeSessionId}`;
    this.dom.hudProgress.textContent = `${this.t("questionProgress")} ${idx + 1} ${this.t("of")} ${this.activeQuestions.length}`;
    this.dom.hudScore.textContent = this.sessionScore.toLocaleString();
    this.updateStreakUI();

    this.dom.hudDifficulty.className = `difficulty-tag ${q.difficulty}`;
    if (q.difficulty === "easy") {
      this.dom.hudDifficulty.textContent = this.t("difficultyEasy");
    } else if (q.difficulty === "medium") {
      this.dom.hudDifficulty.textContent = this.t("difficultyMedium");
    } else {
      this.dom.hudDifficulty.textContent = this.t("difficultyHard");
    }

    this.dom.questionText.textContent = q.question;

    // Shuffle options while preserving correct answer detection
    const optionsWithMeta = q.options.map((opt, i) => ({
      text: opt,
      isCorrect: i === q.correctIndex,
      originalIndex: i
    }));

    const shuffledOptions = this.shuffleArray(optionsWithMeta);

    this.dom.optionsContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];

    shuffledOptions.forEach((optMeta, i) => {
      const btn = document.createElement("button");
      btn.className = "option-clay-btn";
      btn.innerHTML = `
        <span class="option-letter-badge">${letters[i]}</span>
        <span>${optMeta.text}</span>
      `;

      btn.addEventListener("click", () => {
        if (this.isOptionLocked) return;
        this.handleAnswerSelection(btn, optMeta, shuffledOptions);
      });

      this.dom.optionsContainer.appendChild(btn);
    });

    // Dynamic Question Time Limit based on difficulty
    const diff = q.difficulty || "easy";
    const limitSec = (CONFIG.QUESTION_TIME_LIMITS && CONFIG.QUESTION_TIME_LIMITS[diff]) ? CONFIG.QUESTION_TIME_LIMITS[diff] : 15;
    this.timerDurationMs = limitSec * 1000;

    this.startQuestionTimer();
  }

  renderCurrentQuestion() {
    if (this.currentQuestionIdx < this.activeQuestions.length) {
      const langBank = questionsBank[this.currentLang] || questionsBank.id;
      const currentQId = this.activeQuestions[this.currentQuestionIdx].id;
      const rawQ = langBank[`session${this.activeSessionId}`].find(q => q.id === currentQId);
      if (rawQ) {
        this.dom.questionText.textContent = rawQ.question;
      }
    }
  }

  formatTimeText(ms) {
    const totalSec = Math.max(0, ms / 1000);
    if (totalSec >= 60) {
      const m = Math.floor(totalSec / 60);
      const s = Math.floor(totalSec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }
    if (totalSec >= 10) {
      return `${Math.ceil(totalSec)}s`;
    }
    return `${totalSec.toFixed(1)}s`;
  }

  startQuestionTimer() {
    this.cancelQuestionTimer();
    this.timerRemainingMs = this.timerDurationMs;
    this.questionStartTime = performance.now();
    this.lastTickSec = null;

    this.updateTimerBarUI(1.0, this.formatTimeText(this.timerDurationMs));

    const step = (now) => {
      const elapsed = now - this.questionStartTime;
      this.timerRemainingMs = Math.max(0, this.timerDurationMs - elapsed);
      const ratio = this.timerRemainingMs / this.timerDurationMs;
      const remainingSec = Math.ceil(this.timerRemainingMs / 1000);

      this.updateTimerBarUI(ratio, this.formatTimeText(this.timerRemainingMs));

      // Audio tick on final 5 seconds
      if (remainingSec <= 5 && remainingSec > 0 && remainingSec !== this.lastTickSec) {
        this.lastTickSec = remainingSec;
        Sound.playTick();
      }

      if (this.timerRemainingMs <= 0) {
        this.handleQuestionTimeout();
      } else {
        this.timerRaf = requestAnimationFrame(step);
      }
    };

    this.timerRaf = requestAnimationFrame(step);
  }

  pauseQuestionTimer() {
    if (this.timerRaf) {
      cancelAnimationFrame(this.timerRaf);
      this.timerRaf = null;
    }
  }

  resumeQuestionTimer() {
    if (this.timerRemainingMs <= 0) return;
    this.questionStartTime = performance.now() - (this.timerDurationMs - this.timerRemainingMs);

    const step = (now) => {
      const elapsed = now - this.questionStartTime;
      this.timerRemainingMs = Math.max(0, this.timerDurationMs - elapsed);
      const ratio = this.timerRemainingMs / this.timerDurationMs;

      this.updateTimerBarUI(ratio, this.formatTimeText(this.timerRemainingMs));

      const remainingSec = Math.ceil(this.timerRemainingMs / 1000);
      if (remainingSec <= 5 && remainingSec > 0 && remainingSec !== this.lastTickSec) {
        this.lastTickSec = remainingSec;
        Sound.playTick();
      }

      if (this.timerRemainingMs <= 0) {
        this.handleQuestionTimeout();
      } else {
        this.timerRaf = requestAnimationFrame(step);
      }
    };

    this.timerRaf = requestAnimationFrame(step);
  }

  cancelQuestionTimer() {
    if (this.timerRaf) {
      cancelAnimationFrame(this.timerRaf);
      this.timerRaf = null;
    }
  }

  updateTimerBarUI(ratio, formattedText) {
    const pct = Math.max(0, Math.min(100, ratio * 100));
    this.dom.timerBar.style.width = `${pct}%`;
    this.dom.timerText.textContent = formattedText;

    this.dom.timerBar.classList.remove("warning", "critical");
    if (ratio <= 0.25) {
      this.dom.timerBar.classList.add("critical");
    } else if (ratio <= 0.50) {
      this.dom.timerBar.classList.add("warning");
    }
  }

  updateStreakUI() {
    if (this.dom.hudStreakCount) {
      this.dom.hudStreakCount.textContent = this.streak;
    }
    if (this.dom.hudStreakPill) {
      if (this.streak >= 3) {
        this.dom.hudStreakPill.classList.add("on-fire");
      } else {
        this.dom.hudStreakPill.classList.remove("on-fire");
      }
    }
  }

  handleAnswerSelection(selectedBtn, selectedOpt, allOptions) {
    this.isOptionLocked = true;
    this.cancelQuestionTimer();

    const optionBtns = this.dom.optionsContainer.querySelectorAll(".option-clay-btn");
    optionBtns.forEach(btn => btn.disabled = true);

    const currentQ = this.activeQuestions[this.currentQuestionIdx];
    const diff = currentQ ? (currentQ.difficulty || "easy") : "easy";
    const rule = (CONFIG.SCORING && CONFIG.SCORING[diff]) ? CONFIG.SCORING[diff] : { base: 100, maxBonus: 105 };

    if (selectedOpt.isCorrect) {
      selectedBtn.classList.add("correct");
      Sound.playCorrect();

      // Proportional speed bonus based on remaining time ratio
      const ratio = Math.max(0, this.timerRemainingMs / this.timerDurationMs);
      const points = rule.base + Math.round(ratio * rule.maxBonus);
      this.sessionScore += points;
      this.sessionCorrectCount++;
      this.streak++;
    } else {
      selectedBtn.classList.add("wrong");
      Sound.playWrong();
      this.streak = 0;

      optionBtns.forEach((btn, idx) => {
        if (allOptions[idx] && allOptions[idx].isCorrect) {
          btn.classList.add("correct");
        }
      });
    }

    this.dom.hudScore.textContent = this.sessionScore.toLocaleString();
    this.updateStreakUI();

    setTimeout(() => {
      this.currentQuestionIdx++;
      this.loadQuestion(this.currentQuestionIdx);
    }, 850);
  }

  handleQuestionTimeout() {
    this.isOptionLocked = true;
    this.cancelQuestionTimer();
    Sound.playWrong();
    this.streak = 0;

    const optionBtns = this.dom.optionsContainer.querySelectorAll(".option-clay-btn");
    optionBtns.forEach(btn => {
      btn.disabled = true;
      btn.classList.add("wrong");
    });

    this.updateStreakUI();

    setTimeout(() => {
      this.currentQuestionIdx++;
      this.loadQuestion(this.currentQuestionIdx);
    }, 900);
  }

  // =========================================================================
  // ANTI-CHEAT DETECTION
  // =========================================================================

  triggerAntiCheatViolation() {
    if (!this.isGameActive || this.isOptionLocked) return;

    this.tabWarnings++;
    this.pauseQuestionTimer();
    Sound.playWrong();

    if (this.tabWarnings > CONFIG.ANTI_CHEAT.MAX_WARNINGS_BEFORE_FAIL) {
      this.showAntiCheatModal(true);
      this.handleQuestionTimeout();
    } else {
      this.showAntiCheatModal(false);
    }
  }

  showAntiCheatModal(isPenalized = false) {
    if (this.dom.antiCheatModal) {
      this.dom.antiCheatModal.classList.add("active");
    }
  }

  hideAntiCheatModal() {
    if (this.dom.antiCheatModal) {
      this.dom.antiCheatModal.classList.remove("active");
    }
  }

  // =========================================================================
  // FINISH & SUBMIT TO CLOUDFLARE D1
  // =========================================================================

  finishSession() {
    this.isGameActive = false;
    this.cancelQuestionTimer();

    const totalDurationSec = Math.round((Date.now() - this.sessionStartTime) / 1000);
    const accuracy = Math.round((this.sessionCorrectCount / CONFIG.QUESTIONS_PER_SESSION) * 100);

    const sessionRecord = {
      session: this.activeSessionId,
      completed: true,
      score: this.sessionScore,
      correctAnswers: this.sessionCorrectCount,
      totalQuestions: CONFIG.QUESTIONS_PER_SESSION,
      totalDuration: totalDurationSec,
      completedAt: Date.now(),
      userAgent: navigator.userAgent
    };

    this.saveSessionData(this.activeSessionId, sessionRecord);

    Sound.playFanfare();
    this.fireConfetti();

    const dict = I18N[this.currentLang] || I18N.id;
    this.dom.resultSessionTitle.textContent = dict.sessionTitles[this.activeSessionId - 1] || `Session ${this.activeSessionId}`;
    this.dom.resultScore.textContent = this.sessionScore.toLocaleString();
    this.dom.resultCorrect.textContent = `${this.sessionCorrectCount} / ${CONFIG.QUESTIONS_PER_SESSION}`;
    this.dom.resultAccuracy.textContent = `${accuracy}%`;
    this.dom.resultTime.textContent = `${totalDurationSec}s`;

    this.switchView("result");

    // Submit to Cloudflare D1
    this.syncScoreToBackend(sessionRecord);
  }

  reviewSession(sessionNum) {
    const data = this.getSessionData(sessionNum);
    if (!data) return;

    Sound.playTap();
    const dict = I18N[this.currentLang] || I18N.id;
    const accuracy = Math.round((data.correctAnswers / CONFIG.QUESTIONS_PER_SESSION) * 100);

    this.dom.resultSessionTitle.textContent = dict.sessionTitles[sessionNum - 1] || `Session ${sessionNum}`;
    this.dom.resultScore.textContent = data.score.toLocaleString();
    this.dom.resultCorrect.textContent = `${data.correctAnswers} / ${CONFIG.QUESTIONS_PER_SESSION}`;
    this.dom.resultAccuracy.textContent = `${accuracy}%`;
    this.dom.resultTime.textContent = `${data.totalDuration}s`;

    this.dom.syncStatusBox.className = "sync-status-box sync-success";
    this.dom.syncStatusText.textContent = "Sesi ini sudah tersimpan di database turnamen";

    this.switchView("result");
  }

  async syncScoreToBackend(sessionRecord) {
    const payload = {
      telegram_name: localStorage.getItem(CONFIG.STORAGE_KEYS.TELEGRAM_NAME) || this.currentUser,
      username: this.currentUser,
      telegram_id: localStorage.getItem(CONFIG.STORAGE_KEYS.TELEGRAM_ID) || "0",
      session: sessionRecord.session,
      score: sessionRecord.score,
      correctAnswers: sessionRecord.correctAnswers,
      totalDuration: sessionRecord.totalDuration,
      userAgent: sessionRecord.userAgent
    };

    this.dom.syncStatusBox.className = "sync-status-box sync-pending";
    this.dom.syncStatusText.textContent = "Menyimpan skor ke database Cloudflare D1...";

    try {
      const res = await fetch(CONFIG.API_ENDPOINTS.SUBMIT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        this.dom.syncStatusBox.className = "sync-status-box sync-success";
        this.dom.syncStatusText.textContent = "Skor resmi berhasil diverifikasi & dicatat di Cloudflare D1!";
      } else {
        this.dom.syncStatusBox.className = "sync-status-box sync-error";
        this.dom.syncStatusText.textContent = data.message || "Gagal mencatat skor resmi";
      }
    } catch (err) {
      console.warn("D1 sync network error:", err);
      this.dom.syncStatusBox.className = "sync-status-box sync-pending";
      this.dom.syncStatusText.textContent = "Skor tersimpan di browser Anda (Mode Offline).";
    }
  }

  // =========================================================================
  // UTILITIES
  // =========================================================================

  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  fireConfetti() {
    const canvas = this.dom.confettiCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#4D96FF", "#FF6B6B", "#FFD93D", "#6BCB77", "#845EC2", "#FF9671"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2 + 100,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 22,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        alpha: 1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45;
        p.rotation += p.rSpeed;
        p.alpha -= 0.009;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          ctx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    requestAnimationFrame(render);
  }
}

let app = null;
window.addEventListener("DOMContentLoaded", () => {
  app = new TriviaApp();
  app.init();
});
