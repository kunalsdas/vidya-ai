// Vidya — Gamification Engine (XP, Streaks, Levels, Momentum)

const VidyaGamification = new (class {
  constructor() {
    this.STORAGE_KEY = 'vidya_gamification';
    this.LEVEL_TITLES = {
      1: 'Curious Mind', 5: 'Knowledge Seeker', 10: 'Subject Explorer',
      15: 'Deep Thinker', 20: 'Nova Scholar', 25: 'Wisdom Master'
    };
    this.XP_PER_LEVEL = 200;
    this.state = this._loadState();
  }

  _loadState() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return {
      xp: 0, level: 1, streak: 0, lastActiveDate: null,
      streakShields: 0, topicsCompleted: 0, reelsCompleted: 0,
      quizzesCorrect: 0, chaptersExplored: [], topicsRead: [],
      totalChapters: 0, totalTopics: 0, todayActive: false
    };
  }

  _save() {
    try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state)); } catch {}
  }

  init() {
    this.checkStreak();
    this.renderMomentumBar();
  }

  checkStreak() {
    const today = new Date().toDateString();
    const last = this.state.lastActiveDate;
    if (!last) {
      this.state.streak = 0;
      this.state.todayActive = false;
    } else if (last === today) {
      this.state.todayActive = true;
    } else {
      const lastDate = new Date(last);
      const todayDate = new Date(today);
      const diff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        this.state.todayActive = false;
      } else if (diff === 2 && this.state.streakShields > 0) {
        // Missed one day but streak shield absorbs the gap
        this.state.streakShields--;
        this.state.todayActive = false;
      } else if (diff > 1) {
        this.state.streak = 0;
        this.state.todayActive = false;
      }
    }
    this._save();
  }

  _markActive() {
    const today = new Date().toDateString();
    if (!this.state.todayActive) {
      if (this.state.lastActiveDate && this.state.lastActiveDate !== today) {
        this.state.streak++;
      } else if (!this.state.lastActiveDate) {
        this.state.streak = 1;
      }
      this.state.todayActive = true;
    }
    this.state.lastActiveDate = today;
    // Award a streak shield every 7 consecutive days
    if (this.state.streak > 0 && this.state.streak % 7 === 0) {
      this.state.streakShields++;
    }
    this._save();
  }

  addXP(amount, source) {
    this._markActive();
    const oldLevel = this.state.level;
    this.state.xp += amount;
    this.state.level = Math.floor(this.state.xp / this.XP_PER_LEVEL) + 1;

    if (source === 'topic') this.state.topicsCompleted++;
    if (source === 'quiz_correct') this.state.quizzesCorrect++;
    if (source === 'reel_card' || source === 'reel_complete') this.state.reelsCompleted++;

    this._save();
    this.showXPPopup(amount, source);
    this.renderMomentumBar();

    if (this.state.level > oldLevel) {
      const title = this._getLevelTitle(this.state.level);
      this.showLevelUpAnimation(this.state.level, title);
    }
  }

  _getLevelTitle(level) {
    let title = 'Learner';
    for (const [lvl, t] of Object.entries(this.LEVEL_TITLES)) {
      if (level >= parseInt(lvl)) title = t;
    }
    return title;
  }

  getStreakWarning() {
    if (this.state.todayActive || this.state.streak < 2) return null;
    const hour = new Date().getHours();
    if (hour >= 20) {
      return `Your ${this.state.streak}-day streak is at risk! Complete 1 topic to save it.`;
    }
    return null;
  }

  setTotals(chapters, topics) {
    this.state.totalChapters = chapters;
    this.state.totalTopics = topics;
    this._save();
    this.renderMomentumBar();
  }

  updateMomentum(type, id) {
    if (type === 'chapter' && id && !this.state.chaptersExplored.includes(id)) {
      this.state.chaptersExplored.push(id);
    }
    if (type === 'topic' && id && !this.state.topicsRead.includes(id)) {
      this.state.topicsRead.push(id);
    }
    this._save();
    this.renderMomentumBar();
  }

  getMomentumPercent() {
    if (!this.state.totalChapters && !this.state.totalTopics) return 0;
    const chPct = this.state.totalChapters ? (this.state.chaptersExplored.length / this.state.totalChapters) : 0;
    const tpPct = this.state.totalTopics ? (this.state.topicsRead.length / this.state.totalTopics) : 0;
    return Math.min(100, Math.round(((chPct * 0.3) + (tpPct * 0.7)) * 100));
  }

  renderMomentumBar() {
    let bar = document.getElementById('momentum-bar');
    if (!bar) return;
    const fill = document.getElementById('momentum-fill');
    const tooltip = document.getElementById('momentum-tooltip');
    const pct = this.getMomentumPercent();
    if (fill) fill.style.width = pct + '%';
    if (tooltip) {
      const hasData = this.state.totalChapters > 0 || this.state.totalTopics > 0;
      tooltip.classList.toggle('active', hasData);
      if (hasData) {
        const ch = this.state.chaptersExplored.length;
        const tp = this.state.topicsRead.length;
        tooltip.textContent = `${pct}% explored · ${ch}/${this.state.totalChapters || '?'} chapters · ${tp}/${this.state.totalTopics || '?'} topics`;
      }
    }
    bar.classList.toggle('milestone', pct >= 25 && pct < 100);
  }

  renderStreakBadge(container) {
    if (!container) return;
    container.innerHTML = `
      <span class="streak-fire">&#x1F525;</span>
      <span class="streak-num">${this.state.streak}</span>
      <span class="streak-label">day streak</span>
    `;
    container.style.display = this.state.streak > 0 ? 'inline-flex' : 'none';
  }

  renderXPBar(container) {
    if (!container) return;
    const levelXP = (this.state.level - 1) * this.XP_PER_LEVEL;
    const nextLevelXP = this.state.level * this.XP_PER_LEVEL;
    const progress = this.state.xp - levelXP;
    const needed = this.XP_PER_LEVEL;
    const pct = Math.min(100, Math.round((progress / needed) * 100));
    const title = this._getLevelTitle(this.state.level);

    container.innerHTML = `
      <div class="xp-bar-header">
        <span class="xp-level">Lv. ${this.state.level}</span>
        <span class="xp-title">${title}</span>
      </div>
      <div class="xp-bar-track">
        <div class="xp-bar-fill" style="width:${pct}%"></div>
      </div>
      <div class="xp-bar-nums">
        <span>${this.state.xp} XP</span>
        <span>${nextLevelXP} XP</span>
      </div>
    `;
  }

  showXPPopup(amount, source) {
    const sourceLabels = {
      topic: 'Topic', reel_card: 'Reel', reel_complete: 'Reel Complete',
      quiz_correct: 'Quiz', doubt: 'Doubt', drill: 'Drill-down',
      battle_win: 'Battle Win', focus_bonus: 'Focus',
      focus_complete: 'Session'
    };
    const label = sourceLabels[source] || '';
    const popup = document.createElement('div');
    popup.className = 'xp-popup';
    popup.textContent = `+${amount} XP ${label}`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2200);
  }

  showLevelUpAnimation(level, title) {
    const overlay = document.createElement('div');
    overlay.className = 'level-up-overlay';

    let confettiHTML = '<div class="level-up-confetti">';
    const colors = ['#d4a53a', '#f0c060', '#4f82f5', '#9b7fea', '#3dd68c', '#f87171'];
    for (let i = 0; i < 30; i++) {
      const c = colors[i % colors.length];
      const left = Math.random() * 100;
      const delay = Math.random() * 1.5;
      confettiHTML += `<span style="left:${left}%;background:${c};animation-delay:${delay}s"></span>`;
    }
    confettiHTML += '</div>';

    overlay.innerHTML = `
      ${confettiHTML}
      <div class="level-up-badge">&#x2B50;</div>
      <div class="level-up-text">Level ${level}!</div>
      <div class="level-up-title">${title}</div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.5s';
      setTimeout(() => overlay.remove(), 500);
    }, 3000);
  }
})();
