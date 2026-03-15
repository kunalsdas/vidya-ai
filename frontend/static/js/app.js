// Vidya — Main Application (Amazon Nova AI Hackathon 2026)

class VidyaApp {
  constructor() {
    this.currentSubject  = null;
    this.currentChapter  = null;
    this.currentTopic    = null;
    this.currentMode     = 'concept';
    this.currentBook     = null;
    this.currentBookType = null;
    this.drillStack      = [];
    this.topicsCovered   = 0;
    this.doubtsResolved  = 0;
    this.graphData       = null;
    this.streamController = null;
    this._currentDoubts   = [];
    this._currentQuestions = [];
    this._questionsLoaded  = false;

    this._bindElements();
    this._bindEvents();
    this._initFlowEngine();
  }

  _bindElements() {
    this.subjectInput    = document.getElementById('subject-input');
    this.subjectTitle    = document.getElementById('subject-title');
    this.subjectOverview = document.getElementById('subject-overview');
    this.overviewText    = document.getElementById('overview-text');
    this.overviewLoading = this.subjectOverview.querySelector('.overview-loading');
    this.chapterGrid     = document.getElementById('chapter-grid');
    this.chapterCount    = document.getElementById('chapter-count');

    this.contentArea     = document.getElementById('content-area');
    this.topicTitle      = document.getElementById('topic-title');
    this.topicTag        = document.getElementById('topic-tag');
    this.examFreq        = document.getElementById('exam-freq');
    this.difficulty      = document.getElementById('difficulty');
    this.readTime        = document.getElementById('read-time');
    this.doubtChips      = document.getElementById('doubt-chips');
    this.doubtsSection   = document.getElementById('doubts-section');
    this.questionsSection= document.getElementById('questions-section');
    this.questionsList   = document.getElementById('questions-list');
    this.prereqList      = document.getElementById('prereq-list');
    this.relatedList     = document.getElementById('related-list');
    this.topicsCoveredEl = document.getElementById('topics-covered');
    this.doubtsResolvedEl= document.getElementById('doubts-resolved');
    this.depthLevelEl    = document.getElementById('depth-level');

    this.breadcrumb      = document.getElementById('breadcrumb');
    this.backLabel       = document.getElementById('back-label');

    this.doubtPanel      = document.getElementById('panel-doubt');
    this.doubtOverlay    = document.getElementById('doubt-overlay');
    this.doubtPanelContent = document.getElementById('doubt-panel-content');
    this.doubtQuestionLabel = document.getElementById('doubt-question-label');
    this.drillDeeperBtn  = document.getElementById('drill-deeper-btn');

    this.bookCardsGrid   = document.getElementById('book-cards-grid');
    this.courseCardsGrid = document.getElementById('course-cards-grid');
    this.resourceQueryText = document.getElementById('resource-query-text');

    this.modalGraph      = document.getElementById('modal-graph');
    this.modalDrill      = document.getElementById('modal-drill');
    this.modalAnswer     = document.getElementById('modal-answer');
    this.drillContentArea= document.getElementById('drill-content-area');
    this.drillBreadcrumb = document.getElementById('drill-breadcrumb');
    this.drillPrereqs    = document.getElementById('drill-prereqs');
    this.answerContent   = document.getElementById('answer-content');
  }

  _bindEvents() {
    this.subjectInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.handleSearch();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.closeGraph();
        this.closeDrill();
        this.closeAnswer();
        this.closeDoubtPanel();
        this.closeTopicsPanel();
      }
    });
  }

  _showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(id);
    screen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  focusSearch() {
    this.subjectInput.focus();
  }

  quickSearch(subject) {
    this.subjectInput.value = subject;
    this.showResourceSelector(subject);
  }

  async handleSearch() {
    const query = this.subjectInput.value.trim();
    if (!query) {
      this._toast('Please enter a subject or topic');
      return;
    }
    this.showResourceSelector(query);
  }

  showAbout() {
    this._toast('Vidya — AI tutor powered by Amazon Nova 🚀', 3000);
  }

  goHome() {
    this._showScreen('screen-landing');
  }

  goToSubject() {
    this._showScreen('screen-subject');
  }

  goToResource() {
    if (this.currentSubject) {
      this.showResourceSelector(this.currentSubject);
    } else {
      this._showScreen('screen-landing');
    }
  }

  showResourceSelector(subject) {
    this.currentSubject = subject;

    this._showScreen('screen-resource');

    if (this.resourceQueryText) {
      this.resourceQueryText.textContent = `"${subject}"`;
    }

    const key = this._getBookKey(subject);
    const suggestions = VidyaDemoData.BOOK_SUGGESTIONS[key] || VidyaDemoData.BOOK_SUGGESTIONS.default;

    if (this.bookCardsGrid) {
      this.bookCardsGrid.innerHTML = suggestions.books.map(b => `
        <div class="book-card" data-book-id="${b.id}" data-book-name="${this._escAttr(b.name)}" data-book-type="book">
          <div class="book-card-tag tag-${b.tag}">${b.tag === 'popular' ? '⭐ Popular' : b.tag === 'advanced' ? '🎓 Advanced' : b.tag === 'exam' ? '📝 Exam-Focused' : b.tag === 'classic' ? '📖 Classic' : '📘 Standard'}</div>
          <div class="book-card-title">${b.name}</div>
          <div class="book-card-author">by ${b.author}</div>
          <div class="book-card-desc">${b.desc}</div>
        </div>
      `).join('');

      this.bookCardsGrid.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', () => {
          this.selectResource(card.dataset.bookName, 'book');
        });
      });
    }

    if (this.courseCardsGrid) {
      if (suggestions.courses && suggestions.courses.length > 0) {
        this.courseCardsGrid.innerHTML = suggestions.courses.map(c => `
          <div class="course-card" data-course-name="${this._escAttr(c.name)}" data-course-type="course">
            <div class="book-card-tag tag-course">🎥 Online Course</div>
            <div class="book-card-title">${c.name}</div>
            <div class="book-card-author">${c.provider}</div>
            <div class="book-card-desc">${c.desc}</div>
          </div>
        `).join('');

        this.courseCardsGrid.querySelectorAll('.course-card').forEach(card => {
          card.addEventListener('click', () => {
            this.selectResource(card.dataset.courseName, 'course');
          });
        });

        const coursesSection = document.getElementById('courses-section');
        if (coursesSection) coursesSection.style.display = 'block';
      } else {
        const coursesSection = document.getElementById('courses-section');
        if (coursesSection) coursesSection.style.display = 'none';
      }
    }
  }

  _getBookKey(subject) {
    const s = subject.toLowerCase();
    if (s.includes('polity') || s.includes('constitution')) return 'polity';
    if (s.includes('upsc') || s.includes('civil service') || s.includes('ias')) return 'upsc';
    if (s.includes('jee')) return 'jee';
    if (s.includes('calculus') || s.includes('differentiat') || s.includes('integrat')) return 'calculus';
    if (s.includes('bioinformatics') || s.includes('bio algorithm')) return 'bioinformatics';
    if (s.includes('machine learning') || s.includes('deep learning') || s.includes(' ml') || s.startsWith('ml')) return 'machine learning';
    if (s.includes('neet') || s.includes('biology') || s.includes('mbbs')) return 'neet';
    return 'default';
  }

  _escAttr(str) {
    return String(str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  selectResource(bookName, resourceType) {
    this.currentBook = bookName;
    this.currentBookType = resourceType;
    this._toast(`📚 Loading chapters from: ${bookName}`, 2000);
    this.loadSubjectMap(this.currentSubject, bookName, resourceType);
  }

  selectCustomResource() {
    const input = document.getElementById('custom-book-input');
    const val = input ? input.value.trim() : '';
    if (!val) {
      this._toast('Please enter a book or course name');
      return;
    }
    this.selectResource(val, 'book');
  }

  skipResource() {
    this.currentBook = null;
    this.currentBookType = null;
    this.loadSubjectMap(this.currentSubject, null, null);
  }

  async loadSubjectMap(subject, bookName = null, resourceType = null) {
    this.currentSubject = subject;
    this.currentBook    = bookName;
    this.currentBookType = resourceType;

    this.subjectTitle.textContent = subject;

    const resBadge = document.getElementById('resource-badge');
    if (resBadge) {
      if (bookName) {
        resBadge.textContent = `📚 ${bookName}`;
        resBadge.style.display = 'inline-flex';
      } else {
        resBadge.style.display = 'none';
      }
    }

    this._showScreen('screen-subject');
    this.chapterGrid.innerHTML = this._renderChapterSkeletons(8);
    this.overviewLoading.style.display = 'flex';
    this.overviewText.style.display = 'none';

    try {
      const body = { subject };
      if (bookName) body.book_name = bookName;
      if (resourceType) body.resource_type = resourceType;
      let data;
      try {
        data = await VidyaAPI.call('/generate/chapters', body);
      } catch {
        data = await VidyaAPI.call('/generate/subject-map', body);
      }
      this._renderSubjectMap(data);
    } catch {
      this._renderSubjectMap(VidyaDemoData.getSubjectMap(subject));
    }
  }

  _renderSubjectMap(data) {
    this.graphData = data.graph;

    this.overviewLoading.style.display = 'none';
    this.overviewText.style.display = 'block';
    this._streamHTML(this.overviewText, data.overview);

    const topicsPanel = document.getElementById('topics-panel');
    if (topicsPanel) topicsPanel.style.display = 'none';

    this._chapters = data.chapters;
    const totalTopics = data.chapters.reduce((sum, ch) => sum + (ch.topics ? ch.topics.length : 0), 0);
    const countText = totalTopics > 0
      ? `${data.chapters.length} chapters · ${totalTopics} topics`
      : `${data.chapters.length} chapters`;
    this.chapterCount.textContent = countText;
    this.chapterGrid.innerHTML = data.chapters.map((ch, i) => this._renderChapterCard(ch, i)).join('');
    this._animateCards('.chapter-card');
    this.chapterGrid.querySelectorAll('.chapter-card').forEach((card, i) => {
      card.addEventListener('click', () => this.loadChapter(i));
    });

    if (typeof VidyaGamification !== 'undefined') {
      const totalTopicsCount = data.chapters.reduce((s, c) => s + (c.topics ? c.topics.length : 0), 0);
      VidyaGamification.setTotals(data.chapters.length, totalTopicsCount || data.chapters.length * 6);
    }
  }

  _renderChapterCard(chapter, index) {
    const topicCount = chapter.topics ? chapter.topics.length : 0;
    const topicLabel = topicCount > 0 ? `${topicCount} topics` : 'Click to explore';
    return `
      <div class="chapter-card" data-chapter-index="${index}">
        <div class="chapter-num">Chapter ${String(index + 1).padStart(2, '0')}</div>
        <div class="chapter-name">${chapter.name}</div>
        <div class="chapter-desc">${chapter.description || ''}</div>
        <div class="chapter-meta">
          <span class="chapter-topics">${topicLabel}</span>
          <div class="chapter-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    `;
  }

  async loadChapter(indexOrJson) {
    let chapter, index;
    if (typeof indexOrJson === 'number') {
      index = indexOrJson;
      chapter = this._chapters[index];
    } else if (typeof indexOrJson === 'string') {
      try { chapter = JSON.parse(indexOrJson); } catch { chapter = { name: indexOrJson, topics: [] }; }
      index = this._chapters?.findIndex(c => c.name === chapter.name) ?? 0;
    } else {
      chapter = indexOrJson;
      index = this._chapters?.findIndex(c => c.name === chapter.name) ?? 0;
    }
    this.currentChapter = chapter;

    if (typeof VidyaGamification !== 'undefined') {
      VidyaGamification.updateMomentum('chapter', chapter.name);
    }

    document.querySelectorAll('.chapter-card').forEach((c, i) => {
      c.classList.toggle('active-chapter', i === index);
    });

    const topicsPanel = document.getElementById('topics-panel');
    const topicsTitle = document.getElementById('topics-panel-title');
    const topicsCount = document.getElementById('topics-panel-count');
    const topicsDesc  = document.getElementById('topics-panel-desc');
    const topicsGrid  = document.getElementById('topics-grid');

    topicsTitle.textContent = chapter.name;
    topicsDesc.textContent  = chapter.description || '';
    topicsPanel.style.display = 'block';
    topicsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (!chapter.topics || chapter.topics.length === 0) {
      topicsCount.textContent = 'Loading topics...';
      topicsGrid.innerHTML = `<div class="topics-loading-grid">
        ${Array(6).fill('<div class="topic-card skeleton-topic"><div class="skeleton-line w-80"></div><div class="skeleton-line w-50"></div></div>').join('')}
      </div>`;

      try {
        const data = await VidyaAPI.call('/generate/chapter-topics', {
          subject: this.currentSubject,
          chapter_name: chapter.name,
          chapter_description: chapter.description || '',
          book_name: this.currentBook
        });
        chapter.topics = data.topics || [];
        if (this._chapters[index]) this._chapters[index].topics = chapter.topics;
      } catch {
          chapter.topics = VidyaDemoData.getTopicsForChapter(chapter.name, index);
        if (this._chapters[index]) this._chapters[index].topics = chapter.topics;
      }

      const card = this.chapterGrid.querySelector(`.chapter-card[data-chapter-index="${index}"]`);
      if (card) {
        const topicSpan = card.querySelector('.chapter-topics');
        if (topicSpan) topicSpan.textContent = `${chapter.topics.length} topics`;
      }
    }

    if (chapter.topics.length === 1) {
      this._navigateToTopic(chapter.topics[0], chapter.name);
      return;
    }

    topicsCount.textContent = `${chapter.topics.length} topics`;

    topicsGrid.innerHTML = chapter.topics.map((t, ti) => `
      <div class="topic-card" data-topic-index="${ti}" style="animation-delay: ${ti * 50}ms">
        <div class="topic-card-name">${t.name}</div>
        <div class="topic-card-meta">
          <span class="topic-freq">${t.examFreq || ''}</span>
          <span class="topic-diff">${t.difficulty || ''}</span>
        </div>
        <div class="topic-card-time">${t.readTime || ''}</div>
      </div>
    `).join('');

    topicsGrid.querySelectorAll('.topic-card').forEach((card, ti) => {
      card.addEventListener('click', () => {
        this.loadTopicByIndex(index, ti);
      });
    });
  }

  closeTopicsPanel() {
    const topicsPanel = document.getElementById('topics-panel');
    if (topicsPanel) topicsPanel.style.display = 'none';
    document.querySelectorAll('.chapter-card').forEach(c => c.classList.remove('active-chapter'));
  }

  loadTopicByIndex(chapterIndex, topicIndex) {
    const chapter = this._chapters[chapterIndex];
    const topic   = chapter.topics[topicIndex];
    this.currentChapter = chapter;
    this._navigateToTopic(topic, chapter.name);
  }

  _navigateToTopic(topic, chapterName) {
    const topicObj = typeof topic === 'string' ? { name: topic } : { ...topic };
    if (chapterName) topicObj.chapter = chapterName;
    this.loadTopic(topicObj);
  }

  async loadTopic(topicInput) {
    let topic;
    if (typeof topicInput === 'string') {
      try { topic = JSON.parse(topicInput); } catch { topic = { name: topicInput }; }
    } else {
      topic = topicInput;
    }
    this.currentTopic = topic;
    this.topicsCovered++;
    this.topicsCoveredEl.textContent = this.topicsCovered;

    this._showScreen('screen-topic');
    this._updateBreadcrumb();
    this._resetTopicView();

    this.topicTitle.textContent = topic.name;
    this.topicTag.textContent   = topic.chapter || this.currentChapter?.name || 'Topic';
    this.examFreq.textContent   = topic.examFreq  || '★★★ High Yield';
    this.difficulty.textContent = topic.difficulty || '◈ Intermediate';
    this.readTime.textContent   = topic.readTime   || '⏱ 8 min read';

    try {
      const data = await VidyaAPI.call('/generate/topic-content', {
        subject: this.currentSubject,
        topic: topic.name,
        mode: this.currentMode
      });
      await this._renderTopicContent(data);
    } catch {
      await this._renderTopicContent(VidyaDemoData.getTopicContent(topic.name, this.currentSubject));
    }
  }

  _resetTopicView() {
    this.contentArea.innerHTML = `<div class="content-skeleton">
      <div class="skeleton-block"></div>
      <div class="skeleton-block short"></div>
      <div class="skeleton-block"></div>
      <div class="skeleton-block medium"></div>
    </div>`;
    this.doubtsSection.style.display   = 'none';
    this.questionsSection.style.display = 'none';
    this._currentDoubts   = [];
    this._currentQuestions = [];
    this._questionsLoaded  = false;
    const vPanel = document.getElementById('visual-panel');
    if (vPanel) vPanel.style.display = 'none';
    this.prereqList.innerHTML = `<div class="prereq-loading">
      <div class="skeleton-line w-80"></div>
      <div class="skeleton-line w-60"></div>
      <div class="skeleton-line w-75"></div>
    </div>`;
    this.relatedList.innerHTML = this.prereqList.innerHTML;
    this.drillStack = [];
    this.depthLevelEl.textContent = 'L1';
  }

  async _renderTopicContent(data) {
    this.contentArea.innerHTML = '';
    await this._streamHTML(this.contentArea, data.content);

    this._renderPrereqs(data.prerequisites);
    this._renderRelated(data.related);

    await this._sleep(300);
    this._renderDoubtChips(data.doubts);

    if (typeof VidyaGraph !== 'undefined') {
      VidyaGraph.renderMini('mini-graph', data.graph || this.graphData);
    }

    this._currentQuestions = data.questions || [];
    this._questionsLoaded  = true;
    this.questionsSection.style.display = 'none';

    this._renderCuriosityHooks(data.curiosity_hooks);
    this._onTopicComplete();

    if (typeof VidyaFocus !== 'undefined' && !VidyaFocus.active) {
      VidyaFocus.offerSession();
    }

    if (typeof VidyaNudge !== 'undefined') {
      VidyaNudge.startIdleWatch();
    }

    this._updateXPBar();
  }

  _renderPrereqs(prereqs = []) {
    if (!prereqs.length) {
      this.prereqList.innerHTML = '<div style="color:var(--ink-700);font-size:0.85rem">None — you\'re good to dive in!</div>';
      return;
    }
    this._currentPrereqs = prereqs;
    const levels = ['level-1', 'level-2', 'level-3'];
    this.prereqList.innerHTML = prereqs.map((p, i) => `
      <div class="prereq-item" data-prereq-index="${i}">
        <div class="prereq-dot ${levels[i % 3]}"></div>
        <span class="prereq-text">${p.name}</span>
        <span class="prereq-tag">${p.type || 'Prereq'}</span>
      </div>
    `).join('');
    this.prereqList.querySelectorAll('.prereq-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.prereqIndex, 10);
        const pr = this._currentPrereqs[idx];
        if (pr) this.openDrill(pr.name, pr.description || '');
      });
    });
  }

  _renderRelated(related = []) {
    if (!related.length) {
      this.relatedList.innerHTML = '<div style="color:var(--ink-700);font-size:0.85rem">Expand your graph to discover connections</div>';
      return;
    }
    this._currentRelated = related;
    this.relatedList.innerHTML = related.map((r, i) => `
      <div class="prereq-item" data-related-index="${i}">
        <div class="prereq-dot level-3"></div>
        <span class="prereq-text">${r.name}</span>
        <span class="prereq-tag">${r.subject || ''}</span>
      </div>
    `).join('');
    this.relatedList.querySelectorAll('.prereq-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.relatedIndex, 10);
        const rel = this._currentRelated[idx];
        if (rel) this.loadTopicByName(rel.name);
      });
    });
  }

  _renderDoubtChips(doubts = []) {
    this._currentDoubts = doubts;
    this.doubtsSection.style.display = 'block';
    const icons = ['🤔', '❓', '💭', '🔍', '⚡', '🎯', '📌', '🧩'];
    this.doubtChips.innerHTML = doubts.map((d, i) => `
      <button class="doubt-chip" data-doubt-index="${i}"
              style="animation-delay: ${i * 60}ms; opacity:0; animation: fadeSlideUp 0.4s ease forwards ${i * 60}ms;">
        <span class="chip-q-icon">${icons[i % icons.length]}</span>
        ${d.question}
      </button>
    `).join('');

    this.doubtChips.querySelectorAll('.doubt-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.doubtIndex, 10);
        const d = this._currentDoubts[idx];
        if (d) this.openDoubt(d.question, d.answer);
      });
    });
  }

  _renderQuestions(questions = []) {
    if (!questions.length) return;
    this.questionsSection.style.display = 'block';

    this.questionsList.innerHTML = questions.map((q, qi) => {
      const typeClass = { MCQ: 'badge-mcq', 'Short Answer': 'badge-short', 'Long Answer': 'badge-long', Numerical: 'badge-numerical' }[q.type] || 'badge-mcq';
      const optionsHTML = q.options ? `
        <div class="question-options">
          ${q.options.map((opt, oi) => `
            <div class="question-option" onclick="app.selectOption(this, ${qi}, ${oi}, ${q.correct})">
              <span class="opt-label">${String.fromCharCode(65 + oi)}.</span>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
      ` : '';

      return `
        <div class="question-card" id="qcard-${qi}">
          <div class="question-type-badge ${typeClass}">${q.type}</div>
          <div class="question-text">${q.question}</div>
          ${optionsHTML}
          <button class="show-answer-btn" onclick="app.showAnswer(${qi}, '${this._esc(q.explanation)}')">
            Show Explanation →
          </button>
        </div>
      `;
    }).join('');
  }

  selectOption(el, qi, oi, correct) {
    const card = document.getElementById(`qcard-${qi}`);
    card.querySelectorAll('.question-option').forEach(o => {
      o.classList.remove('selected-correct', 'selected-wrong');
    });
    el.classList.add(oi === correct ? 'selected-correct' : 'selected-wrong');
  }

  showAnswer(qi, explanation) {
    this.answerContent.innerHTML = `<div class="content-area" style="border:none;padding:0;min-height:auto">${this._parseMarkdown(explanation)}</div>`;
    if (window.renderMathInElement) {
      renderMathInElement(this.answerContent, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }, { left: '\\(', right: '\\)', display: false }, { left: '\\[', right: '\\]', display: true }], throwOnError: false });
    }
    this.modalAnswer.style.display = 'flex';
  }

  closeAnswer() {
    this.modalAnswer.style.display = 'none';
  }

  async openDoubt(question, cachedAnswer) {
    this.doubtsResolved++;
    this.doubtsResolvedEl.textContent = this.doubtsResolved;
    if (typeof VidyaGamification !== 'undefined') VidyaGamification.addXP(15, 'doubt');

    this.doubtQuestionLabel.textContent = question;
    this.doubtPanelContent.innerHTML = `<div class="dp-skeleton">
      <div class="skeleton-line w-90"></div>
      <div class="skeleton-line w-70"></div>
      <div class="skeleton-line w-85"></div>
      <div class="skeleton-line w-50"></div>
      <div class="skeleton-line w-75"></div>
    </div>`;
    this.drillDeeperBtn.style.display = 'none';

    this.doubtPanel.classList.add('open');
    this.doubtOverlay.style.display = 'block';
    this.doubtOverlay.classList.add('visible');

    let answer = cachedAnswer;
    if (!cachedAnswer || cachedAnswer.length < 50) {
      try {
        const data = await VidyaAPI.call('/generate/doubt', {
          topic: this.currentTopic?.name,
          question
        });
        answer = data.answer;
      } catch {
        answer = cachedAnswer || VidyaDemoData.getDoubtAnswer(question);
      }
    }

    this.doubtPanelContent.innerHTML = '';
    await this._streamHTML(this.doubtPanelContent, answer);

    this.drillDeeperBtn.style.display = 'flex';
    this._currentDoubtQuestion = question;
  }

  closeDoubtPanel() {
    this.doubtPanel.classList.remove('open');
    this.doubtOverlay.style.display = 'none';
    this.doubtOverlay.classList.remove('visible');
  }

  askFollowUp() {
    const q = prompt('Type your follow-up question:');
    if (q) this.openDoubt(q, '');
  }

  async drillDeeper() {
    if (!this._currentDoubtQuestion) return;
    this.closeDoubtPanel();
    await this.openDrill(this._currentDoubtQuestion, '');
  }

  async openDrill(conceptName, description) {
    if (typeof VidyaGamification !== 'undefined') VidyaGamification.addXP(30, 'drill');
    this.loadTopic({
      name: conceptName,
      chapter: this.currentChapter?.name || this.currentSubject,
      examFreq: '★★ Medium',
      difficulty: '◇ Beginner',
      readTime: '⏱ 6 min'
    });
  }

  _renderDrillBreadcrumb() {
    const items = ['Current Topic', ...this.drillStack];
    this.drillBreadcrumb.innerHTML = items.map((item, i) => {
      if (i === items.length - 1) return `<span class="drill-bc-current">${item}</span>`;
      return `<span class="drill-bc-item" onclick="app.drillBackTo(${i})" style="cursor:pointer">${item}</span><span class="drill-bc-sep">›</span>`;
    }).join('');
  }

  drillBackTo(index) {
    this.drillStack = this.drillStack.slice(0, index);
    if (this.drillStack.length === 0) {
      this.closeDrill();
    } else {
      this.openDrill(this.drillStack[this.drillStack.length - 1], '');
    }
  }

  closeDrill() {
    this.modalDrill.style.display = 'none';
  }

  openGraph() {
    const graphLabel = document.getElementById('graph-subject-label');
    if (graphLabel) graphLabel.textContent = this.currentSubject || 'Knowledge Graph';

    this.modalGraph.style.display = 'flex';

    const graphData = this.graphData && this.graphData.nodes && this.graphData.nodes.length > 0
      ? this.graphData
      : this._buildGraphFromChapters();

    this.modalGraph.offsetHeight;
    if (typeof VidyaGraph !== 'undefined') {
      const svgEl = document.getElementById('full-graph');
      if (svgEl) {
        const wrapper = svgEl.parentElement;
        const w = (wrapper ? wrapper.clientWidth : 0) || 800;
        const h = (wrapper ? wrapper.clientHeight : 0) || 600;
        svgEl.style.width = w + 'px';
        svgEl.style.height = h + 'px';
        svgEl.setAttribute('width', w);
        svgEl.setAttribute('height', h);
        svgEl.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        VidyaGraph.renderFull('full-graph', graphData);
      }
    }
  }

  _buildGraphFromChapters() {
    if (!this._chapters || !this._chapters.length) return VidyaDemoData.getFallbackGraph(this.currentTopic?.name || 'Current Topic');

    const nodes = [{ id: 'main', label: this.currentSubject || 'Subject', type: 'core' }];
    const links = [];

    this._chapters.forEach((ch, i) => {
      const chId = `ch_${i}`;
      nodes.push({ id: chId, label: ch.name, type: i < 2 ? 'prereq' : 'related' });
      links.push({ source: 'main', target: chId });

      ch.topics.slice(0, 2).forEach((t, ti) => {
        const tId = `t_${i}_${ti}`;
        nodes.push({ id: tId, label: t.name, type: 'related' });
        links.push({ source: chId, target: tId });
      });
    });

    if (nodes.length > 4) {
      nodes.push({ id: 'cross1', label: 'Cross-disciplinary', type: 'cross' });
      links.push({ source: nodes[2].id, target: 'cross1' });
    }

    return { nodes, links };
  }

  closeGraph() {
    this.modalGraph.style.display = 'none';
  }

  setMode(mode) {
    document.querySelectorAll('.mode-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.mode === mode);
    });

    if (mode === 'questions') {
      if (this._questionsLoaded && this._currentQuestions.length > 0) {
        this._renderQuestions(this._currentQuestions);
        this.questionsSection.style.display = 'block';
        this.questionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (this._questionsLoaded && this._currentQuestions.length === 0) {
        this._fetchAndRenderQuestions();
      } else {
        this._toast('Load a topic first, then click Questions', 2000);
      }
      return;
    }

    if (mode === 'visual') {
      this.currentMode = mode;
      const vPanel = document.getElementById('visual-panel');
      if (vPanel) {
        vPanel.style.display = 'block';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (typeof VidyaGraph !== 'undefined') {
            const graphData = this.graphData || VidyaDemoData.getFallbackGraph(this.currentTopic?.name || 'Current Topic');
            VidyaGraph.renderMini('visual-graph', graphData);
          }
        }));
      }
      return;
    }

    const vPanel = document.getElementById('visual-panel');
    if (vPanel) vPanel.style.display = 'none';

    this.currentMode = mode;
    if (this.currentTopic) {
      this.loadTopic(this.currentTopic);
    }
  }

  async _fetchAndRenderQuestions() {
    if (!this.currentTopic) return;
    this._toast('Generating exam questions...', 2000);
    try {
      const data = await VidyaAPI.call('/generate/topic-content', {
        subject: this.currentSubject,
        topic: this.currentTopic.name,
        mode: 'exam'
      });
      this._currentQuestions = data.questions || [];
      this._questionsLoaded = true;
      if (this._currentQuestions.length > 0) {
        this._renderQuestions(this._currentQuestions);
        this.questionsSection.style.display = 'block';
      } else {
        this._toast('No questions generated — try another topic', 2000);
      }
    } catch {
      this._currentQuestions = VidyaDemoData.getTopicContent(this.currentTopic.name, this.currentSubject).questions || [];
      this._questionsLoaded = true;
      this._renderQuestions(this._currentQuestions);
      this.questionsSection.style.display = 'block';
    }
  }

  loadTopicByName(name) {
    this.loadTopic({
      name,
      chapter: this.currentChapter?.name || this.currentSubject,
      examFreq: '★★ Medium',
      difficulty: '◈ Intermediate',
      readTime: '⏱ 6 min'
    });
  }

  _updateBreadcrumb() {
    const bcSubject = this.breadcrumb.querySelector('.bc-subject');
    const bcChapter = this.breadcrumb.querySelector('.bc-chapter');
    const bcTopic   = this.breadcrumb.querySelector('.bc-topic');
    bcSubject.textContent = this.currentSubject || '';
    bcChapter.textContent = this.currentChapter?.name || '';
    bcTopic.textContent   = this.currentTopic?.name || '';
    this.backLabel.textContent = this.currentChapter?.name || 'Chapters';
  }

  _parseMarkdown(text) {
    if (!text) return '';

    let placeholders = [];
    if (window.VidyaRenderer && VidyaRenderer.protectLatex) {
      const result = VidyaRenderer.protectLatex(text);
      text = result.text;
      placeholders = result.placeholders;
    }

    let html = '';
    if (typeof marked !== 'undefined' && marked.parse) {
      try { html = marked.parse(text); } catch (e) {}
    }
    if (!html) {
      html = text
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/^#{3} (.+)$/gm, '<h3>$1</h3>')
        .replace(/^#{2} (.+)$/gm, '<h2>$1</h2>')
        .replace(/^#{1} (.+)$/gm, '<h1>$1</h1>')
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[hHulbp])(.+)$/gm, (m) => m.trim() ? m : '')
        .replace(/\|(.+)\|/g, (m) => `<table style="width:100%;border-collapse:collapse;margin:16px 0"><tr>${m.split('|').filter(Boolean).map(c => `<td style="padding:8px 12px;border:1px solid var(--border)">${c.trim()}</td>`).join('')}</tr></table>`)
        .trim();
    }

    if (window.VidyaRenderer && VidyaRenderer.restoreLatex) {
      html = VidyaRenderer.restoreLatex(html, placeholders);
    }

    return html;
  }

  async _streamHTML(container, html, speed = 8) {
    if (!html) return;
    const parsed = this._parseMarkdown(html);
    container.innerHTML = parsed + '<span class="stream-cursor"></span>';
    await this._sleep(200);
    const cursor = container.querySelector('.stream-cursor');
    if (cursor) cursor.remove();

    if (window.renderMathInElement) {
      try {
        renderMathInElement(container, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false
        });
      } catch (e) {}
    }

    if (window.VidyaRenderer && VidyaRenderer.postProcessContent) {
      VidyaRenderer.postProcessContent(container);
    }

    return parsed;
  }

  async _streamText(container, text, speed = 12) {
    container.textContent = '';
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      container.textContent += (i > 0 ? ' ' : '') + words[i];
      if (i % 4 === 0) await this._sleep(speed);
    }
  }

  _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  _esc(str) {
    return String(str || '').replace(/'/g, "\\'").replace(/"/g, '\\"').substring(0, 500);
  }

  _renderChapterSkeletons(n) {
    return Array.from({ length: n }).map(() => `
      <div class="chapter-card" style="pointer-events:none">
        <div class="skeleton-line w-50" style="margin-bottom:16px"></div>
        <div class="skeleton-line w-80" style="height:20px;margin-bottom:12px"></div>
        <div class="skeleton-line w-90"></div>
        <div class="skeleton-line w-70"></div>
      </div>
    `).join('');
  }

  _animateCards(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      setTimeout(() => {
        card.style.transition = `opacity 0.4s ease ${i * 60}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    });
  }

  _toast(message, duration = 2500) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  _getDemoPrerequisiteContent(concept) {
    return {
      content: `## ${concept} — From First Principles\n\nLet's build your understanding of **${concept}** from the ground up.\n\n### The Core Idea\n\n${concept} is fundamental because almost everything built on top of it depends on truly understanding this layer. Many students skip past it — and then struggle later because the foundation isn't solid.\n\n### Why it Matters\n\nThis concept appears as a prerequisite for:\n- Multiple advanced topics in your subject\n- Several cross-subject connections\n- Exam questions that test "deep understanding" rather than recall\n\n> Start the backend server and configure your Amazon Nova API key for a fully personalised, streamed explanation with worked examples tailored to your learning profile.`,
      prerequisites: [
        { name: 'Even More Basic Concept', description: 'Going one level deeper' },
        { name: 'Related Foundational Idea', description: 'A parallel foundation' }
      ]
    };
  }

  _initFlowEngine() {
    if (typeof VidyaGamification !== 'undefined') {
      VidyaGamification.init();
      VidyaGamification.renderMomentumBar();
      const streakBadge = document.getElementById('streak-badge-subject');
      if (streakBadge && VidyaGamification.state.streak > 0) {
        streakBadge.style.display = 'inline-flex';
        document.getElementById('streak-num-subject').textContent = VidyaGamification.state.streak;
      }
      const warning = VidyaGamification.getStreakWarning();
      if (warning) {
        const w = document.createElement('div');
        w.className = 'streak-warning';
        w.textContent = warning;
        w.onclick = () => w.remove();
        document.body.appendChild(w);
        setTimeout(() => w.remove(), 10000);
      }
    }
    if (typeof VidyaNudge !== 'undefined') {
      VidyaNudge.checkReturnNudge();
    }
  }

  _updateXPBar() {
    const wrap = document.getElementById('xp-bar-wrap');
    if (!wrap || typeof VidyaGamification === 'undefined') return;
    VidyaGamification.renderXPBar(wrap);
  }

  _onTopicComplete() {
    if (typeof VidyaGamification !== 'undefined') {
      VidyaGamification.addXP(50, 'topic');
      VidyaGamification.updateMomentum('topic', this.currentTopic?.name);
      const streakBadge = document.getElementById('streak-badge-subject');
      if (streakBadge) {
        streakBadge.style.display = 'inline-flex';
        document.getElementById('streak-num-subject').textContent = VidyaGamification.state.streak;
      }
    }
    if (typeof VidyaNudge !== 'undefined') {
      VidyaNudge.trackActivity('topic', {
        topic: this.currentTopic?.name,
        chapter: this.currentChapter?.name,
        subject: this.currentSubject
      });
    }
    this._updateXPBar();
  }

  _renderCuriosityHooks(hooks = []) {
    if (!hooks || hooks.length === 0) return;
    const hooksHTML = `
      <div class="curiosity-hooks">
        <div class="curiosity-hooks-title">What's Next?</div>
        ${hooks.map(h => `
          <div class="curiosity-hook" data-hook-topic="${this._esc(h.target_topic || '')}">
            <div class="hook-arrow">&#x2192;</div>
            <div class="hook-text">${h.teaser || ''}</div>
          </div>
        `).join('')}
      </div>
    `;
    this.contentArea.insertAdjacentHTML('beforeend', hooksHTML);
    this.contentArea.querySelectorAll('.curiosity-hook').forEach(el => {
      el.addEventListener('click', () => {
        const topicName = el.dataset.hookTopic;
        if (topicName) this.loadTopicByName(topicName);
      });
    });
  }

  openReels() {
    if (typeof VidyaReels === 'undefined') {
      this._toast('Reels module loading...', 1500);
      return;
    }
    if (!this.currentTopic) {
      this._toast('Load a topic first, then click Reels', 2000);
      return;
    }
    VidyaReels.open(this.currentTopic.name, this.currentSubject);
  }

  openBattle() {
    if (typeof VidyaBattle === 'undefined') {
      this._toast('Battle module loading...', 1500);
      return;
    }
    if (!this.currentTopic) {
      this._toast('Load a topic first, then click Battle', 2000);
      return;
    }
    VidyaBattle.open(this.currentTopic.name, this.currentSubject);
  }

  openVision() { VidyaVision.open(); }
  closeVision() { VidyaVision.close(); }
  handleVisionDrop(e) { VidyaVision.handleDrop(e); }
  handleVisionFile(e) { VidyaVision.handleFile(e); }
  analyzeVisionImage() { VidyaVision.analyze(); }
  analyzeFullImage() { VidyaVision.analyzeFullImage(); }
  analyzeVisionSelection() { VidyaVision.analyzeSelection(); }
  copyVisionResult() { VidyaVision.copyResult(); }
  visionZoomIn() { VidyaVision.zoomIn(); }
  visionZoomOut() { VidyaVision.zoomOut(); }
  visionZoomFit() { VidyaVision.zoomFit(); }
  visionPrevPage() { VidyaVision.prevPage(); }
  visionNextPage() { VidyaVision.nextPage(); }
  toggleVisionCaptureMode() { VidyaVision.toggleCaptureMode(); }
  startVisionSelection(e) { VidyaVision.startSelection(e); }
  updateVisionSelection(e) { VidyaVision.updateSelection(e); }
  endVisionSelection(e) { VidyaVision.endSelection(e); }

  _initPronunciation() {
    this._selectedText = '';
    const tooltip = document.getElementById('pronounce-tooltip');

    document.addEventListener('mouseup', (e) => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0 && text.length < 80 && text.split(' ').length <= 6) {
        this._selectedText = text;
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        tooltip.style.display = 'flex';
        tooltip.style.top  = `${window.scrollY + rect.top - 44}px`;
        tooltip.style.left = `${window.scrollX + rect.left + (rect.width / 2) - 50}px`;
      } else {
        tooltip.style.display = 'none';
        this._selectedText = '';
      }
    });

    document.addEventListener('mousedown', (e) => {
      if (!e.target.closest('#pronounce-tooltip')) {
        tooltip.style.display = 'none';
      }
    });
  }

  pronounceSelected() {
    const text = this._selectedText || window.getSelection()?.toString().trim();
    if (!text) return;
    if (!window.speechSynthesis) {
      this._toast('Speech synthesis not supported in this browser', 2000);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate  = 0.85;
    utterance.pitch = 1;
    utterance.lang  = 'en-US';
    const voices = window.speechSynthesis.getVoices();
    const pref = voices.find(v => v.lang === 'en-US' && v.name.includes('Google'))
              || voices.find(v => v.lang === 'en-US')
              || voices[0];
    if (pref) utterance.voice = pref;
    window.speechSynthesis.speak(utterance);

    const btn = document.getElementById('pronounce-btn');
    if (btn) {
      btn.textContent = '🔊 Speaking…';
      utterance.onend = () => {
        btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Pronounce`;
      };
    }
    document.getElementById('pronounce-tooltip').style.display = 'none';
  }
}

const app = new VidyaApp();

const _origShowScreen = app._showScreen.bind(app);
app._showScreen = function(id) {
  _origShowScreen(id);
  const fab = document.getElementById('vision-fab');
  if (fab) fab.style.display = (id === 'screen-landing') ? 'none' : 'flex';
};

app._initPronunciation();

document.getElementById('subject-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') app.handleSearch();
});
