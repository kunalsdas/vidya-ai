// Vidya — Smart Nudge System (Context-Aware Re-engagement)

const VidyaNudge = new (class {
  constructor() {
    this.STORAGE_KEY = 'vidya_nudge_state';
    this.state = this._loadState();
    this._idleTimer = null;
    this._listeners = [];
    this._lastActivity = Date.now();
    this._lastNudgeTime = 0;
    this.IDLE_TIMEOUT = 120000;
    this.NUDGE_COOLDOWN = 300000;
  }

  _loadState() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return {
      lastActiveTimestamp: null, lastTopic: '', lastChapter: '',
      lastSubject: '', nudgesShown: 0, lastNudgeDate: ''
    };
  }

  _save() {
    try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state)); } catch {}
  }

  trackActivity(type, data) {
    this.state.lastActiveTimestamp = Date.now();
    if (data) {
      if (data.topic) this.state.lastTopic = data.topic;
      if (data.chapter) this.state.lastChapter = data.chapter;
      if (data.subject) this.state.lastSubject = data.subject;
    }
    this._lastActivity = Date.now();
    this._save();
  }

  checkReturnNudge() {
    const last = this.state.lastActiveTimestamp;
    if (!last) return;

    const hoursSince = (Date.now() - last) / (1000 * 60 * 60);
    const now = new Date();
    const isMonday = now.getDay() === 1;
    const isMorning = now.getHours() < 12;

    if (hoursSince > 24 && this.state.lastTopic) {
      setTimeout(() => {
        this._showNudge(
          '&#x1F44B;',
          `Welcome back! You were studying <strong>${this.state.lastTopic}</strong>. Ready to continue?`,
          'Continue', () => {
            if (typeof app !== 'undefined' && this.state.lastTopic) {
              app.loadTopicByName(this.state.lastTopic);
            }
          }
        );
      }, 2000);
    } else if (isMonday && isMorning) {
      setTimeout(() => {
        this._showNudge(
          '&#x1F31F;',
          'Fresh week, fresh start! Jump into a topic and build momentum.',
          'Let\'s Go', () => {}
        );
      }, 3000);
    }
  }

  startIdleWatch() {
    this.stopIdleWatch();
    this._lastActivity = Date.now();

    const handler = () => { this._lastActivity = Date.now(); };
    ['mousemove', 'scroll', 'click', 'keydown', 'touchstart'].forEach(e => {
      document.addEventListener(e, handler, { passive: true });
      this._listeners.push({ event: e, handler });
    });

    this._idleTimer = setInterval(() => {
      const topicScreen = document.getElementById('screen-topic');
      if (!topicScreen || !topicScreen.classList.contains('active')) return;

      const idle = Date.now() - this._lastActivity;
      const sinceLast = Date.now() - this._lastNudgeTime;

      if (idle >= this.IDLE_TIMEOUT && sinceLast >= this.NUDGE_COOLDOWN) {
        this._showContextualNudge();
      }
    }, 15000);
  }

  stopIdleWatch() {
    this._listeners.forEach(({ event, handler }) => {
      document.removeEventListener(event, handler);
    });
    this._listeners = [];
    if (this._idleTimer) { clearInterval(this._idleTimer); this._idleTimer = null; }
  }

  _showContextualNudge() {
    this._lastNudgeTime = Date.now();
    const today = new Date().toDateString();
    if (this.state.lastNudgeDate === today) {
      this.state.nudgesShown++;
    } else {
      this.state.nudgesShown = 1;
      this.state.lastNudgeDate = today;
    }
    if (this.state.nudgesShown > 5) return;
    this._save();

    const topicName = (typeof app !== 'undefined' && app.currentTopic)
      ? app.currentTopic.name : 'this topic';

    const nudges = [
      { icon: '&#x1F9E0;', text: `Quick check: Can you explain the key idea of <strong>${topicName}</strong> in one sentence?` },
      { icon: '&#x1F4A1;', text: `You've been reading for a while. Try the <strong>Reels mode</strong> for a faster, more engaging experience!`, action: 'Try Reels', cb: () => { if (typeof app !== 'undefined') app.openReels(); } },
      { icon: '&#x1F525;', text: `Still going? Your streak is looking strong! Keep it up.` },
      { icon: '&#x2694;', text: `Feeling confident? Challenge <strong>Nova AI</strong> to a battle on ${topicName}!`, action: 'Battle Now', cb: () => { if (typeof app !== 'undefined') app.openBattle(); } },
      { icon: '&#x1F3AF;', text: `You're making great progress. Just a few more topics to complete this chapter!` }
    ];

    const nudge = nudges[Math.floor(Math.random() * nudges.length)];
    this._showNudge(nudge.icon, nudge.text, nudge.action, nudge.cb);
  }

  _showNudge(icon, text, actionLabel, actionCallback) {
    const card = document.getElementById('nudge-card');
    if (!card) return;

    document.getElementById('nudge-icon').innerHTML = icon;
    document.getElementById('nudge-text').innerHTML = text;

    const actionBtn = document.getElementById('nudge-action');
    if (actionLabel && actionCallback) {
      actionBtn.textContent = actionLabel;
      actionBtn.style.display = 'block';
      actionBtn.onclick = () => {
        this._dismissNudge();
        actionCallback();
      };
    } else {
      actionBtn.style.display = 'none';
    }

    document.getElementById('nudge-dismiss').onclick = () => this._dismissNudge();

    card.classList.add('visible');

    this._nudgeDismissTimer = setTimeout(() => this._dismissNudge(), 15000);
  }

  _dismissNudge() {
    const card = document.getElementById('nudge-card');
    if (card) card.classList.remove('visible');
    if (this._nudgeDismissTimer) {
      clearTimeout(this._nudgeDismissTimer);
      this._nudgeDismissTimer = null;
    }
  }
})();
