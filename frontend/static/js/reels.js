// Vidya — Knowledge Reels (TikTok-style micro-learning)

const VidyaReels = new (class {
  constructor() {
    this.cards = [];
    this.currentIndex = 0;
    this.topic = '';
    this.subject = '';
    this.quizCorrect = 0;
    this.quizTotal = 0;
    this.xpEarned = 0;
    this._bound = false;
  }

  async open(topic, subject) {
    this.topic = topic;
    this.subject = subject;
    this.currentIndex = 0;
    this.quizCorrect = 0;
    this.quizTotal = 0;
    this.xpEarned = 0;

    const container = document.getElementById('reels-container');
    container.classList.add('active');
    document.getElementById('reels-topic-label').textContent = topic;

    document.getElementById('reels-card-area').innerHTML = `
      <div style="text-align:center;color:var(--ink-700)">
        <div style="font-size:2rem;margin-bottom:12px">&#x1F3AC;</div>
        Generating knowledge reels...
      </div>`;

    if (!this._bound) this._bindEvents();

    try {
      const resp = await fetch(`${typeof API_BASE !== 'undefined' ? API_BASE : 'http://localhost:8000/api'}/generate/topic-reels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, subject, card_count: 12 })
      });
      if (!resp.ok) throw new Error('API error');
      const data = await resp.json();
      this.cards = data.cards || [];
    } catch {
      this.cards = this._generateDemoReels(topic);
    }

    if (this.cards.length === 0) this.cards = this._generateDemoReels(topic);
    this._renderCard(0);
  }

  close() {
    document.getElementById('reels-container').classList.remove('active');
  }

  _bindEvents() {
    this._bound = true;
    const area = document.getElementById('reels-card-area');
    const closeBtn = document.getElementById('reels-close-btn');

    closeBtn.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('reels-container').classList.contains('active')) return;
      if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); this._next(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); this._prev(); }
      if (e.key === 'Escape') this.close();
    });

    let startY = 0;
    area.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
    area.addEventListener('touchend', e => {
      const dy = startY - e.changedTouches[0].clientY;
      if (dy > 50) this._next();
      else if (dy < -50) this._prev();
    }, { passive: true });

    area.addEventListener('click', (e) => {
      if (e.target.closest('.reel-quiz-option') || e.target.closest('.reel-continue-btn')) return;
      const rect = area.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      if (clickY > rect.height / 2) this._next();
      else this._prev();
    });
  }

  _next() {
    if (this.currentIndex >= this.cards.length) return;
    this.xpEarned += 5;
    if (typeof VidyaGamification !== 'undefined') VidyaGamification.addXP(5, 'reel_card');

    this.currentIndex++;
    if (this.currentIndex >= this.cards.length) {
      this._showCompletion();
    } else {
      this._renderCard(this.currentIndex);
    }
  }

  _prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this._renderCard(this.currentIndex);
    }
  }

  _renderCard(index) {
    const card = this.cards[index];
    const area = document.getElementById('reels-card-area');
    const counter = document.getElementById('reels-counter');
    const progress = document.getElementById('reels-progress-fill');
    const hint = document.getElementById('reels-swipe-hint');

    counter.textContent = `${index + 1}/${this.cards.length}`;
    progress.style.width = `${((index + 1) / this.cards.length) * 100}%`;
    hint.style.display = index === 0 ? 'block' : 'none';

    const typeBadges = {
      concept: 'CONCEPT', analogy: 'ANALOGY', formula: 'FORMULA',
      quiz: 'QUICK QUIZ', cliffhanger: 'WHAT IF...', meme: 'FUN FACT'
    };

    let contentHTML = '';
    if (card.type === 'quiz' && card.quiz) {
      contentHTML = `
        <div class="reel-content">${this._renderMarkdown(card.quiz.question || card.content)}</div>
        <div class="reel-quiz-options">
          ${(card.quiz.options || []).map((opt, i) => `
            <div class="reel-quiz-option" data-correct="${card.quiz.correct}" data-index="${i}">${opt}</div>
          `).join('')}
        </div>
      `;
    } else {
      contentHTML = `<div class="reel-content">${this._renderMarkdown(card.content)}</div>`;
    }

    area.innerHTML = `
      <div class="reel-card" data-type="${card.type}">
        <div class="reel-type-badge">${typeBadges[card.type] || card.type}</div>
        ${contentHTML}
      </div>
    `;

    if (card.type === 'quiz') {
      area.querySelectorAll('.reel-quiz-option').forEach(opt => {
        opt.addEventListener('click', () => this._handleQuizAnswer(opt));
      });
    }

    this._renderMath(area);
  }

  _handleQuizAnswer(optEl) {
    const correct = parseInt(optEl.dataset.correct);
    const selected = parseInt(optEl.dataset.index);
    const allOpts = optEl.parentElement.querySelectorAll('.reel-quiz-option');

    allOpts.forEach(o => {
      o.style.pointerEvents = 'none';
      const idx = parseInt(o.dataset.index);
      if (idx === correct) o.classList.add('correct');
      if (idx === selected && selected !== correct) o.classList.add('wrong');
    });

    this.quizTotal++;
    if (selected === correct) {
      this.quizCorrect++;
      this.xpEarned += 20;
      if (typeof VidyaGamification !== 'undefined') VidyaGamification.addXP(20, 'quiz_correct');
    }

    setTimeout(() => this._next(), 1500);
  }

  _showCompletion() {
    const area = document.getElementById('reels-card-area');
    const counter = document.getElementById('reels-counter');
    const progress = document.getElementById('reels-progress-fill');
    const hint = document.getElementById('reels-swipe-hint');

    counter.textContent = 'Done!';
    progress.style.width = '100%';
    hint.style.display = 'none';

    this.xpEarned += 50;
    if (typeof VidyaGamification !== 'undefined') VidyaGamification.addXP(50, 'reel_complete');

    area.innerHTML = `
      <div class="reel-complete">
        <div class="reel-complete-icon">&#x1F389;</div>
        <div class="reel-complete-title">Topic Complete!</div>
        <div style="color:var(--ink-800);margin-top:8px">${this.topic}</div>
        <div class="reel-complete-stats">
          <div><span class="stat-num">${this.cards.length}</span>Cards</div>
          <div><span class="stat-num">${this.quizCorrect}/${this.quizTotal}</span>Quiz</div>
          <div><span class="stat-num">+${this.xpEarned}</span>XP</div>
        </div>
        <button class="reel-continue-btn" onclick="VidyaReels.close()">Continue Learning</button>
      </div>
    `;
  }

  _renderMarkdown(text) {
    if (!text) return '';
    try {
      if (typeof marked !== 'undefined') return marked.parse(text);
    } catch {}
    return text.replace(/\n/g, '<br>');
  }

  _renderMath(container) {
    try {
      if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(container, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false
        });
      }
    } catch {}
  }

  _generateDemoReels(topic) {
    return [
      { type: 'concept', content: `## What is ${topic}?\n\nThis is one of the most fundamental concepts you'll encounter. Understanding it deeply will unlock several connected ideas.` },
      { type: 'analogy', content: `**Think of it like...**\n\nImagine ${topic} as a toolbox. Each principle inside is a specific tool designed for a specific problem. You don't need all tools at once — but knowing which one to pick is the real skill.` },
      { type: 'concept', content: `### Key Principle\n\nThe core idea behind ${topic} is surprisingly simple: break complex problems into smaller, manageable pieces. Each piece follows clear, predictable rules.` },
      { type: 'formula', content: `### Core Formula\n\nThe fundamental relationship can be expressed as:\n\n$$f(x) = \\sum_{i=1}^{n} a_i \\cdot x^i$$\n\nIn plain English: the result depends on weighted contributions of each component.` },
      { type: 'quiz', content: '', quiz: { question: `Which statement about ${topic} is TRUE?`, options: [`It was developed in the 20th century`, `It builds on first principles`, `It has no practical applications`, `It requires advanced math only`], correct: 1 } },
      { type: 'meme', content: `### Did You Know?\n\nStudents who learn ${topic} through active recall (like these reels!) retain **2.5x more** than those who just read passively. You're already doing it right!` },
      { type: 'cliffhanger', content: `You now understand the basics of ${topic}...\n\nBut what happens when we push it to its **extreme limits**? The answer might surprise you and connects to something you'd never expect...` },
      { type: 'concept', content: `### Exam Tip\n\nWhen asked about ${topic} in exams:\n\n1. **Start with the definition** — examiners love precision\n2. **Give a real-world example** — shows understanding\n3. **Connect to related concepts** — shows depth\n4. **Mention limitations** — shows critical thinking` }
    ];
  }
})();
