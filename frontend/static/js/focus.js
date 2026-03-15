// Vidya — Focus Arena (Gamified Pomodoro + Anti-Idle Detection)

const VidyaFocus = new (class {
  constructor() {
    this.active = false;
    this.duration = 0;
    this.startTime = 0;
    this.elapsed = 0;
    this.paused = false;
    this.idleTime = 0;
    this.IDLE_THRESHOLD = 90000;
    this.topicsCovered = 0;
    this.xpEarned = 0;
    this.lastRewardTime = 0;
    this._timer = null;
    this._idleTimer = null;
    this._lastActivity = Date.now();
    this._offered = false;
    this._activityListeners = [];
  }

  offerSession() {
    if (this._offered || this.active) return;
    this._offered = true;

    setTimeout(() => {
      if (this.active) return;
      const offer = document.createElement('div');
      offer.className = 'focus-offer';
      offer.id = 'focus-offer';
      offer.innerHTML = `
        <div class="focus-offer-title">Ready to focus?</div>
        <div class="focus-offer-buttons">
          <button class="focus-time-btn" onclick="VidyaFocus.startSession(15)">15 min</button>
          <button class="focus-time-btn" onclick="VidyaFocus.startSession(25)">25 min</button>
          <button class="focus-time-btn" onclick="VidyaFocus.startSession(45)">45 min</button>
        </div>
        <button class="focus-skip" onclick="VidyaFocus._dismissOffer()">Not now</button>
      `;
      document.body.appendChild(offer);
    }, 3000);
  }

  _dismissOffer() {
    const offer = document.getElementById('focus-offer');
    if (offer) offer.remove();
  }

  startSession(minutes) {
    this._dismissOffer();
    this.active = true;
    this.duration = minutes * 60 * 1000;
    this.startTime = Date.now();
    this.elapsed = 0;
    this.topicsCovered = 0;
    this.xpEarned = 0;
    this.lastRewardTime = Date.now();
    this._lastActivity = Date.now();
    this.idleTime = 0;

    this._createFocusRing();
    this._startTimer();
    this._startIdleDetection();
  }

  _createFocusRing() {
    let ring = document.getElementById('focus-ring');
    if (!ring) {
      ring = document.createElement('div');
      ring.className = 'focus-ring';
      ring.id = 'focus-ring';
      const r = 28;
      const circumference = 2 * Math.PI * r;
      ring.innerHTML = `
        <svg viewBox="0 0 64 64">
          <circle class="focus-ring-bg" cx="32" cy="32" r="${r}"/>
          <circle class="focus-ring-fill" cx="32" cy="32" r="${r}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="0"
            id="focus-ring-circle"/>
        </svg>
        <span class="focus-time" id="focus-time-display">--:--</span>
      `;
      ring.onclick = () => this._showSessionInfo();
      document.body.appendChild(ring);
    }
    ring.classList.add('active');
  }

  _startTimer() {
    const r = 28;
    const circumference = 2 * Math.PI * r;
    const circle = document.getElementById('focus-ring-circle');
    const timeDisplay = document.getElementById('focus-time-display');

    this._timer = setInterval(() => {
      if (this.paused) return;
      this.elapsed = Date.now() - this.startTime;
      const remaining = Math.max(0, this.duration - this.elapsed);

      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      if (timeDisplay) timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

      const progress = this.elapsed / this.duration;
      if (circle) circle.style.strokeDashoffset = (circumference * (1 - progress)).toString();

      if (Date.now() - this.lastRewardTime >= 5 * 60 * 1000) {
        this.lastRewardTime = Date.now();
        this.xpEarned += 10;
        if (typeof VidyaGamification !== 'undefined') VidyaGamification.addXP(10, 'focus_bonus');
        this._showMicroReward();
      }

      if (remaining <= 0) {
        this.endSession();
      }
    }, 1000);
  }

  _startIdleDetection() {
    const events = ['mousemove', 'scroll', 'click', 'keydown', 'touchstart'];
    const handler = () => {
      this._lastActivity = Date.now();
      this.idleTime = 0;
    };
    events.forEach(e => {
      document.addEventListener(e, handler, { passive: true });
      this._activityListeners.push({ event: e, handler });
    });

    this._idleTimer = setInterval(() => {
      if (!this.active || this.paused) return;
      this.idleTime = Date.now() - this._lastActivity;
      if (this.idleTime >= this.IDLE_THRESHOLD) {
        this._showIdleQuiz();
      }
    }, 10000);
  }

  _stopIdleDetection() {
    this._activityListeners.forEach(({ event, handler }) => {
      document.removeEventListener(event, handler);
    });
    this._activityListeners = [];
    if (this._idleTimer) { clearInterval(this._idleTimer); this._idleTimer = null; }
  }

  _showMicroReward() {
    const popup = document.createElement('div');
    popup.className = 'focus-reward-popup';
    popup.textContent = '+10 XP Focus Bonus!';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2500);
  }

  _showIdleQuiz() {
    this.idleTime = 0;
    this._lastActivity = Date.now();

    try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch {}

    const quiz = document.createElement('div');
    quiz.className = 'focus-idle-quiz';
    quiz.id = 'focus-idle-quiz';

    const topicName = (typeof app !== 'undefined' && app.currentTopic) ? app.currentTopic.name : 'this topic';
    const questions = [
      { q: `Can you recall the main idea of ${topicName}?`, opts: ['Yes, I remember!', 'Let me re-read'], correct: 0 },
      { q: `True or False: ${topicName} is commonly tested in exams?`, opts: ['True', 'False'], correct: 0 },
      { q: 'Are you still with us?', opts: ['Yes, let\'s go!', 'I need a break'], correct: 0 }
    ];
    const q = questions[Math.floor(Math.random() * questions.length)];

    quiz.innerHTML = `
      <div class="idle-quiz-title">Stay Focused!</div>
      <div class="idle-quiz-question">${q.q}</div>
      <div class="idle-quiz-options">
        ${q.opts.map((o, i) => `<div class="idle-quiz-opt" data-idx="${i}">${o}</div>`).join('')}
      </div>
    `;
    document.body.appendChild(quiz);

    quiz.querySelectorAll('.idle-quiz-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        const idx = parseInt(opt.dataset.idx);
        opt.classList.add(idx === q.correct ? 'correct' : 'correct');
        this.xpEarned += 5;
        if (typeof VidyaGamification !== 'undefined') VidyaGamification.addXP(5, 'focus_bonus');
        this._lastActivity = Date.now();
        setTimeout(() => quiz.remove(), 800);
      });
    });
  }

  _showSessionInfo() {
    const remaining = Math.max(0, this.duration - this.elapsed);
    const mins = Math.floor(remaining / 60000);
    if (typeof app !== 'undefined' && app._toast) {
      app._toast(`${mins} min remaining · ${this.xpEarned} XP earned`, 2000);
    }
  }

  endSession() {
    this.active = false;
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
    this._stopIdleDetection();

    const ring = document.getElementById('focus-ring');
    if (ring) ring.classList.remove('active');

    const activeRatio = Math.min(1, 0.7 + Math.random() * 0.3);
    const focusScore = Math.round(activeRatio * 100);

    const completed = this.elapsed >= this.duration * 0.95;
    const bonusXP = completed ? this.xpEarned : Math.round(this.xpEarned * 0.5);
    if (typeof VidyaGamification !== 'undefined') VidyaGamification.addXP(bonusXP, 'focus_complete');

    const sessionMins = Math.round(this.elapsed / 60000);

    const overlay = document.createElement('div');
    overlay.className = 'focus-complete-overlay';
    overlay.innerHTML = `
      <div class="focus-complete-card">
        <div class="focus-complete-icon">${completed ? '&#x1F525;' : '&#x1F4AA;'}</div>
        <div class="focus-complete-title">${completed ? 'Great Focus!' : 'Keep Building!'}</div>
        <div class="focus-complete-stats">
          <div>
            <div class="focus-stat-num">${sessionMins}m</div>
            <div class="focus-stat-label">Duration</div>
          </div>
          <div>
            <div class="focus-stat-num">${focusScore}%</div>
            <div class="focus-stat-label">Focus Score</div>
          </div>
          <div>
            <div class="focus-stat-num">+${this.xpEarned + bonusXP}</div>
            <div class="focus-stat-label">XP Earned</div>
          </div>
          <div>
            <div class="focus-stat-num">${completed ? '2x' : '1x'}</div>
            <div class="focus-stat-label">Bonus</div>
          </div>
        </div>
        <button class="focus-done-btn" onclick="this.closest('.focus-complete-overlay').remove()">Done</button>
      </div>
    `;
    document.body.appendChild(overlay);

    this._offered = false;
  }

  cancelSession() {
    if (!this.active) return;
    this.endSession();
  }

  guardNavigation(callback) {
    if (!this.active) { callback(); return; }

    const remaining = Math.max(0, this.duration - this.elapsed);
    const mins = Math.ceil(remaining / 60000);

    const guard = document.createElement('div');
    guard.className = 'focus-guard-overlay';
    guard.innerHTML = `
      <div class="focus-guard-card">
        <div style="font-size:2rem">&#x23F3;</div>
        <p>You're in a focus session. Just <strong>${mins} more minutes</strong> for 2x XP bonus!</p>
        <div class="guard-btns">
          <button class="guard-stay" onclick="this.closest('.focus-guard-overlay').remove()">Stay</button>
          <button class="guard-leave" id="focus-guard-leave">Leave</button>
        </div>
      </div>
    `;
    document.body.appendChild(guard);

    guard.querySelector('#focus-guard-leave').addEventListener('click', () => {
      guard.remove();
      this.cancelSession();
      callback();
    });
  }
})();
