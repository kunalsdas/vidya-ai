// Vidya — Battle Mode (Competitive Quiz vs AI)

const VidyaBattle = new (class {
  constructor() {
    this.questions = [];
    this.currentQ = 0;
    this.playerScore = 0;
    this.novaScore = 0;
    this.playerAnswers = [];
    this.novaAnswers = [];
    this.novaAccuracy = 0.6;
    this.timePerQuestion = 30;
    this.topic = '';
    this.subject = '';
    this._timer = null;
    this._timeLeft = 0;
    this._bound = false;
    this._answered = false;
    this.xpEarned = 0;
  }

  async open(topic, subject) {
    this.topic = topic;
    this.subject = subject;
    this.currentQ = 0;
    this.playerScore = 0;
    this.novaScore = 0;
    this.playerAnswers = [];
    this.novaAnswers = [];
    this.novaAccuracy = 0.6;
    this.xpEarned = 0;
    this._answered = false;

    const arena = document.getElementById('battle-arena');
    arena.classList.add('active');
    document.getElementById('battle-player-score').textContent = '0';
    document.getElementById('battle-nova-score').textContent = '0';
    document.getElementById('battle-question-area').innerHTML = `
      <div class="battle-loading">
        <div class="battle-vs-anim">VS</div>
        <div style="color:var(--ink-700);margin-top:12px">Preparing Battle...</div>
      </div>`;

    if (!this._bound) this._bindEvents();

    try {
      const resp = await fetch(`${typeof API_BASE !== 'undefined' ? API_BASE : 'http://localhost:8000/api'}/generate/battle-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, subject, count: 5 })
      });
      if (!resp.ok) throw new Error('API error');
      const data = await resp.json();
      this.questions = data.questions || [];
    } catch {
      this.questions = this._generateDemoQuestions(topic);
    }

    if (this.questions.length === 0) this.questions = this._generateDemoQuestions(topic);

    this.novaAnswers = this.questions.map(q => {
      return Math.random() < this.novaAccuracy ? q.correct : this._wrongAnswer(q);
    });

    setTimeout(() => this._showQuestion(0), 1500);
  }

  close() {
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
    document.getElementById('battle-arena').classList.remove('active');
  }

  _bindEvents() {
    this._bound = true;
    document.getElementById('battle-close-btn').addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('battle-arena').classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
    });
  }

  _wrongAnswer(q) {
    const opts = [0, 1, 2, 3].filter(i => i !== q.correct);
    return opts[Math.floor(Math.random() * opts.length)];
  }

  _showQuestion(index) {
    this.currentQ = index;
    this._answered = false;
    const q = this.questions[index];
    const area = document.getElementById('battle-question-area');
    const r = 25;
    const circumference = 2 * Math.PI * r;

    area.innerHTML = `
      <div class="battle-timer-ring" id="battle-timer-ring">
        <svg viewBox="0 0 60 60">
          <circle class="timer-bg" cx="30" cy="30" r="${r}"/>
          <circle class="timer-fill" cx="30" cy="30" r="${r}"
            stroke-dasharray="${circumference}" stroke-dashoffset="0"
            id="battle-timer-circle"/>
        </svg>
        <span class="timer-text" id="battle-timer-text">${this.timePerQuestion}</span>
      </div>
      <div class="battle-question-text">${q.question}</div>
      <div class="battle-options" id="battle-options">
        ${(q.options || []).map((opt, i) => `
          <div class="battle-option" data-index="${i}">${String.fromCharCode(65 + i)}. ${opt}</div>
        `).join('')}
      </div>
      <div class="battle-q-counter">Question ${index + 1} / ${this.questions.length}</div>
    `;

    area.querySelectorAll('.battle-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (this._answered) return;
        this._submitAnswer(parseInt(opt.dataset.index));
      });
    });

    this._timeLeft = this.timePerQuestion;
    const timerText = document.getElementById('battle-timer-text');
    const timerCircle = document.getElementById('battle-timer-circle');
    const timerRing = document.getElementById('battle-timer-ring');

    if (this._timer) clearInterval(this._timer);
    this._timer = setInterval(() => {
      this._timeLeft--;
      if (timerText) timerText.textContent = this._timeLeft;
      if (timerCircle) {
        const pct = this._timeLeft / this.timePerQuestion;
        timerCircle.style.strokeDashoffset = (circumference * (1 - pct)).toString();
      }
      if (this._timeLeft <= 5 && timerRing) timerRing.classList.add('danger');
      if (this._timeLeft <= 0) {
        clearInterval(this._timer);
        if (!this._answered) this._submitAnswer(-1);
      }
    }, 1000);
  }

  _submitAnswer(optionIndex) {
    this._answered = true;
    if (this._timer) { clearInterval(this._timer); this._timer = null; }

    const q = this.questions[this.currentQ];
    const playerCorrect = optionIndex === q.correct;
    const novaAnswer = this.novaAnswers[this.currentQ];
    const novaCorrect = novaAnswer === q.correct;

    this.playerAnswers.push(optionIndex);

    let speedBonus = 0;
    const timeUsed = this.timePerQuestion - this._timeLeft;
    if (playerCorrect && timeUsed <= 5) speedBonus = 10;
    else if (playerCorrect && timeUsed <= 10) speedBonus = 5;

    if (playerCorrect) {
      this.playerScore++;
      this.xpEarned += 20 + speedBonus;
      if (typeof VidyaGamification !== 'undefined') {
        VidyaGamification.addXP(20 + speedBonus, 'quiz_correct');
      }
    }
    if (novaCorrect) this.novaScore++;

    // Adaptive difficulty: Nova gets harder when player leads, easier when behind
    if (this.playerScore > this.novaScore) {
      this.novaAccuracy = Math.min(0.85, this.novaAccuracy + 0.05);
    } else {
      this.novaAccuracy = Math.max(0.4, this.novaAccuracy - 0.05);
    }

    document.getElementById('battle-player-score').textContent = this.playerScore;
    document.getElementById('battle-nova-score').textContent = this.novaScore;

    const options = document.querySelectorAll('#battle-options .battle-option');
    options.forEach(o => {
      const idx = parseInt(o.dataset.index);
      o.classList.add('disabled');
      if (idx === q.correct) o.classList.add('correct');
      if (idx === optionIndex && !playerCorrect) o.classList.add('wrong');
      if (idx === optionIndex) o.classList.add('selected');
    });

    const area = document.getElementById('battle-question-area');
    const reveal = document.createElement('div');
    reveal.className = 'battle-reveal';
    reveal.innerHTML = `
      <div class="battle-reveal-card ${playerCorrect ? 'player-correct' : 'player-wrong'}">
        <div class="reveal-who">You</div>
        <div class="reveal-answer">${playerCorrect ? 'Correct!' : optionIndex >= 0 ? 'Wrong' : 'Time\'s up!'}</div>
      </div>
      <div class="battle-reveal-card ${novaCorrect ? 'nova-correct' : 'nova-wrong'}">
        <div class="reveal-who">Nova AI</div>
        <div class="reveal-answer">${novaCorrect ? 'Correct!' : 'Wrong'}</div>
      </div>
    `;
    area.appendChild(reveal);

    setTimeout(() => {
      if (this.currentQ < this.questions.length - 1) {
        this._showQuestion(this.currentQ + 1);
      } else {
        this._showResults();
      }
    }, 2000);
  }

  _showResults() {
    const area = document.getElementById('battle-question-area');
    const playerWins = this.playerScore > this.novaScore;
    const tie = this.playerScore === this.novaScore;

    let bonusXP = 30;
    if (playerWins) bonusXP += 100;
    this.xpEarned += bonusXP;
    if (typeof VidyaGamification !== 'undefined') {
      VidyaGamification.addXP(bonusXP, playerWins ? 'battle_win' : 'quiz_correct');
    }

    const icon = playerWins ? '&#x1F3C6;' : tie ? '&#x1F91D;' : '&#x1F916;';
    const title = playerWins
      ? `You crushed Nova!`
      : tie ? 'Dead Heat!'
      : `Nova wins by ${this.novaScore - this.playerScore}!`;
    const subtitle = playerWins
      ? 'Superior human intelligence prevails!'
      : tie ? 'Both brilliant minds — play again?'
      : 'Challenge accepted? Try a rematch!';

    area.innerHTML = `
      <div class="battle-results">
        <div class="result-icon">${icon}</div>
        <div class="result-title">${title}</div>
        <div class="result-subtitle">${subtitle}</div>
        <div class="result-xp">+${this.xpEarned} XP</div>
        <div class="result-btns">
          <button class="rematch-btn" onclick="VidyaBattle.open('${this.topic.replace(/'/g, "\\'")}', '${this.subject.replace(/'/g, "\\'")}')">Rematch</button>
          <button class="done-btn" onclick="VidyaBattle.close()">Done</button>
        </div>
      </div>
    `;
  }

  _generateDemoQuestions(topic) {
    return [
      {
        question: `What is the primary purpose of studying ${topic}?`,
        options: ['To memorize facts', 'To understand underlying principles', 'To pass exams only', 'To impress others'],
        correct: 1, explanation: 'Understanding principles enables application across contexts.'
      },
      {
        question: `Which approach best helps master ${topic}?`,
        options: ['Speed reading', 'Active recall and practice', 'Passive highlighting', 'Watching videos only'],
        correct: 1, explanation: 'Active recall strengthens neural pathways for long-term retention.'
      },
      {
        question: `${topic} is most commonly applied in which context?`,
        options: ['Only theoretical research', 'Real-world problem solving', 'Entertainment only', 'Historical study only'],
        correct: 1, explanation: 'Most academic concepts have practical real-world applications.'
      },
      {
        question: `What is a common misconception about ${topic}?`,
        options: ['It requires creativity', 'It\'s only for experts', 'It builds on basics', 'It connects to other subjects'],
        correct: 1, explanation: 'Anyone can learn this with proper foundation and practice.'
      },
      {
        question: `Which study technique is LEAST effective for ${topic}?`,
        options: ['Teaching others', 'Practice problems', 'Re-reading notes', 'Self-testing'],
        correct: 2, explanation: 'Re-reading creates an illusion of familiarity without deep understanding.'
      }
    ];
  }
})();
