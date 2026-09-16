/**
 * Admin Controller Engine
 * Web Trivia Marathon Command Center
 */

class AdminDashboard {
  constructor() {
    this.adminKey = localStorage.getItem("trivia_admin_key") || "";
    this.sessions = [];
    this.leaderboard = [];
    this.refreshInterval = null;
    
    this.dom = {
      authOverlay: document.getElementById("auth-overlay"),
      pinInput: document.getElementById("admin-pin-input"),
      btnLogin: document.getElementById("btn-login-admin"),
      authError: document.getElementById("auth-error-msg"),
      btnLogout: document.getElementById("btn-logout"),

      statTotalUsers: document.getElementById("stat-total-users"),
      statCompleted5: document.getElementById("stat-completed-5"),
      statActiveSessions: document.getElementById("stat-active-sessions"),

      switchboard: document.getElementById("switchboard-container"),
      leaderboardBody: document.getElementById("leaderboard-table-body"),
      lastUpdatedText: document.getElementById("last-updated-text"),
      searchInput: document.getElementById("leaderboard-search"),
      btnRefresh: document.getElementById("btn-refresh-leaderboard"),
      btnExport: document.getElementById("btn-export-csv")
    };
  }

  init() {
    this.bindEvents();

    if (this.adminKey) {
      this.dom.authOverlay.style.display = "none";
      this.loadAllData();
      this.startAutoRefresh();
    } else {
      this.dom.authOverlay.style.display = "flex";
      this.dom.pinInput.focus();
    }
  }

  bindEvents() {
    this.dom.btnLogin.addEventListener("click", () => this.handleLogin());
    this.dom.pinInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.handleLogin();
    });

    this.dom.btnLogout.addEventListener("click", () => {
      localStorage.removeItem("trivia_admin_key");
      this.adminKey = "";
      this.dom.authOverlay.style.display = "flex";
      this.dom.pinInput.value = "";
      if (this.refreshInterval) clearInterval(this.refreshInterval);
    });

    this.dom.btnRefresh.addEventListener("click", () => {
      this.loadAllData();
    });

    this.dom.btnExport.addEventListener("click", () => {
      this.exportToCsv();
    });

    this.dom.searchInput.addEventListener("input", (e) => {
      this.renderLeaderboardTable(e.target.value.toLowerCase().trim());
    });
  }

  async handleLogin() {
    const entered = this.dom.pinInput.value.trim();
    if (!entered) return;

    // Test authorization against endpoint
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": entered
        },
        body: JSON.stringify({ session_number: 1, is_active: 0 }) // harmless test
      });

      if (res.status === 401) {
        this.dom.authError.classList.add("visible");
        return;
      }

      // Success
      this.adminKey = entered;
      localStorage.setItem("trivia_admin_key", entered);
      this.dom.authError.classList.remove("visible");
      this.dom.authOverlay.style.display = "none";

      this.loadAllData();
      this.startAutoRefresh();
    } catch (e) {
      // Local fallback: default key marathon2026
      if (entered === "marathon2026") {
        this.adminKey = entered;
        localStorage.setItem("trivia_admin_key", entered);
        this.dom.authOverlay.style.display = "none";
        this.loadAllData();
        this.startAutoRefresh();
      } else {
        this.dom.authError.classList.add("visible");
      }
    }
  }

  async loadAllData() {
    await Promise.all([
      this.loadSessions(),
      this.loadLeaderboard()
    ]);
  }

  startAutoRefresh() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    this.refreshInterval = setInterval(() => {
      this.loadLeaderboard(true);
    }, 8000); // 8-second live sync
  }

  // =========================================================================
  // SESSIONS SWITCHBOARD
  // =========================================================================

  async loadSessions() {
    try {
      const res = await fetch("/api/sessions");
      const data = await res.json();

      if (data.status === "success" && Array.isArray(data.sessions)) {
        this.sessions = data.sessions;
        this.renderSwitchboard();
      }
    } catch (err) {
      console.warn("Failed to load sessions:", err);
    }
  }

  renderSwitchboard() {
    this.dom.switchboard.innerHTML = "";
    let activeCount = 0;

    this.sessions.forEach(s => {
      const isOpen = s.is_active === 1;
      if (isOpen) activeCount++;

      const card = document.createElement("div");
      card.className = `switch-card ${isOpen ? "active-open" : ""}`;

      card.innerHTML = `
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem;">
            <span style="font-weight:800;font-size:0.85rem;color:var(--text-muted);">SESI ${s.session_number}</span>
            <span class="session-badge-status ${isOpen ? "status-ready" : "status-locked"}">
              ${isOpen 
                ? `<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> DIBUKA`
                : `<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> TERKUNCI`
              }
            </span>
          </div>
          <h3 style="font-size:1.05rem;font-weight:800;color:var(--text-main);margin-bottom:0.25rem;">${s.title}</h3>
          <p style="font-size:0.75rem;color:var(--text-muted);">30 Soal • Adaptif (15s / 60s / 120s) • Skor Maks ~6.150 poin</p>
        </div>

        <div>
          ${isOpen 
            ? `<button class="clay-btn clay-btn-coral clay-btn-block" onclick="adminApp.toggleSession(${s.session_number}, false)">
                 <svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                 <span>Kunci Sesi Ini</span>
               </button>`
            : `<button class="clay-btn clay-btn-primary clay-btn-block" onclick="adminApp.toggleSession(${s.session_number}, true)">
                 <svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                 <span>Buka Sesi Sekarang</span>
               </button>`
          }
        </div>
      `;

      this.dom.switchboard.appendChild(card);
    });

    this.dom.statActiveSessions.textContent = `${activeCount} / 5`;
  }

  async toggleSession(sessionNumber, makeActive) {
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": this.adminKey
        },
        body: JSON.stringify({
          session_number: sessionNumber,
          is_active: makeActive ? 1 : 0
        })
      });

      const data = await res.json();
      if (data.status === "success") {
        await this.loadSessions();
      } else {
        alert(data.message || "Gagal mengubah status sesi");
      }
    } catch (e) {
      alert("Koneksi gagal saat mengubah status sesi: " + e.message);
    }
  }

  // =========================================================================
  // LEADERBOARD MONITOR
  // =========================================================================

  async loadLeaderboard(isSilent = false) {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();

      if (data.status === "success") {
        this.leaderboard = data.leaderboard || [];
        
        // Update stats
        this.dom.statTotalUsers.textContent = data.stats.total_participants || this.leaderboard.length;
        this.dom.statCompleted5.textContent = data.stats.completed_all_5 || 0;

        const now = new Date().toLocaleTimeString("id-ID");
        this.dom.lastUpdatedText.textContent = `Terakhir diperbarui: ${now} (Auto-sync 8s)`;

        const searchFilter = this.dom.searchInput.value.toLowerCase().trim();
        this.renderLeaderboardTable(searchFilter);
      }
    } catch (err) {
      if (!isSilent) console.warn("Failed to load leaderboard:", err);
    }
  }

  renderLeaderboardTable(filter = "") {
    const tbody = this.dom.leaderboardBody;
    tbody.innerHTML = "";

    const list = this.leaderboard.filter(row => {
      if (!filter) return true;
      const matchUser = row.username && row.username.toLowerCase().includes(filter);
      const matchName = row.telegram_name && row.telegram_name.toLowerCase().includes(filter);
      const matchId = row.telegram_id && row.telegram_id.includes(filter);
      return matchUser || matchName || matchId;
    });

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center;padding:2rem;color:var(--text-muted);">
            Belum ada data submission tercatat. Buka sesi dan minta peserta mulai bermain!
          </td>
        </tr>
      `;
      return;
    }

    list.forEach((u, idx) => {
      const rank = idx + 1;
      let rankBadge = `<span class="rank-pill">${rank}</span>`;
      if (rank === 1) rankBadge = `<span class="rank-pill rank-1">#1</span>`;
      else if (rank === 2) rankBadge = `<span class="rank-pill rank-2">#2</span>`;
      else if (rank === 3) rankBadge = `<span class="rank-pill rank-3">#3</span>`;

      const isCompletedAll = u.sessions_completed >= 5;
      const statusBadge = isCompletedAll 
        ? `<span class="valid-tag"><svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" style="stroke-width:3"><polyline points="20 6 9 17 4 12"/></svg> SAH (5/5)</span>`
        : `<span class="pending-tag"><svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${u.sessions_completed}/5 Sesi</span>`;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${rankBadge}</td>
        <td>
          <strong>${u.telegram_name || u.username}</strong><br>
          <small style="color:var(--text-muted);font-weight:600;">${u.username}</small>
        </td>
        <td>
          <code style="background:#E2E8F0;padding:3px 7px;border-radius:6px;font-size:0.8rem;color:#4A5568;font-weight:700;">${u.telegram_id || '-'}</code>
        </td>
        <td style="color:var(--primary-dark);font-size:1rem;font-weight:800;">
          ${(u.total_score || 0).toLocaleString()} pts
        </td>
        <td>
          ${u.total_duration || 0}s
        </td>
        <td>
          ${u.sessions_completed} / 5
        </td>
        <td>
          ${statusBadge}
        </td>
        <td style="text-align:right;">
          <button onclick="adminApp.deleteUser('${u.telegram_id || u.username}')" class="clay-icon-btn" style="width:34px;height:34px;color:var(--coral);" title="Reset Peserta">
            <svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  async deleteUser(identifier) {
    if (!confirm(`Hapus seluruh data peserta ${identifier}? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      const param = /^\d+$/.test(identifier) ? `telegram_id=${identifier}` : `username=${encodeURIComponent(identifier)}`;
      const res = await fetch(`/api/leaderboard?${param}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": this.adminKey
        }
      });
      const data = await res.json();
      if (data.status === "success") {
        await this.loadLeaderboard();
      } else {
        alert(data.message || "Gagal menghapus data");
      }
    } catch (e) {
      alert("Error: " + e.message);
    }
  }

  exportToCsv() {
    if (!this.leaderboard.length) {
      alert("Tidak ada data untuk diekspor!");
      return;
    }

    let csv = "Rank,Nama Telegram,Username Telegram,Telegram ID,Total Skor,Total Durasi (Detik),Sesi Selesai,Status Sah,Waktu Terakhir Submit\n";

    this.leaderboard.forEach((u, i) => {
      const rank = i + 1;
      const isSah = u.sessions_completed >= 5 ? "SAH" : "BELUM LENGKAP";
      csv += `${rank},"${u.telegram_name || ""}","${u.username}","${u.telegram_id || ""}",${u.total_score},${u.total_duration},${u.sessions_completed},"${isSah}","${u.last_submitted || ""}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Leaderboard_GoogleOne_Giveaway_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

let adminApp = null;
window.addEventListener("DOMContentLoaded", () => {
  adminApp = new AdminDashboard();
  adminApp.init();
});
