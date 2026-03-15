// Vidya — Vision Module (Amazon Nova AI Hackathon 2026)

window.VidyaVision = new (class {
  constructor() {
    this._imageBase64 = null;
    this._imageMime = null;
    this._selectionB64 = null;
    this._captureModeActive = false;
    this._selecting = false;
    this._selectStart = null;
    this._pdf = null;
    this._pdfScale = 1.5;
    this._pdfCurrentPage = 1;
    this._pdfTotalPages = 1;
    this._resizeBound = false;
    this._pdfSelecting = false;
    this._pdfSelectStart = null;
  }

  open() {
    var modal = document.getElementById('modal-vision');
    modal.style.display = 'flex';
    this._imageBase64 = null;
    this._imageMime = null;
    this._selectionB64 = null;
    this._captureModeActive = false;
    this._selecting = false;
    this._selectStart = null;
    document.getElementById('vision-drop-idle').style.display = 'flex';
    document.getElementById('vision-loaded-wrap').style.display = 'none';
    document.getElementById('vision-result-placeholder').style.display = 'flex';
    document.getElementById('vision-result-content-wrap').style.display = 'none';
    document.getElementById('vision-question-input').value = '';
    document.getElementById('vision-analyze-btn').disabled = false;
    document.getElementById('vision-analyze-selection-btn').style.display = 'none';
    document.getElementById('vision-capture-mode-btn').classList.remove('active');
    document.getElementById('vision-selection-rect').style.display = 'none';
    this._initResize();
    var hint = document.getElementById('vision-capture-hint');
    if (hint) hint.style.display = 'none';
    document.getElementById('vision-file-status').textContent =
      'Upload a PDF page, image, or screenshot of your notes';
    var pdfScroll = document.getElementById('vision-pdf-scroll');
    if (pdfScroll) { pdfScroll.style.display = 'none'; pdfScroll.innerHTML = ''; }
    document.getElementById('vision-zoom-controls').style.display = 'none';
    document.getElementById('vision-page-nav').style.display = 'none';
    this._pdf = null;
    this._pdfScale = 1.5;
    this._pdfCurrentPage = 1;
    this._pdfTotalPages = 1;
  }

  close() {
    document.getElementById('modal-vision').style.display = 'none';
  }

  handleDrop(e) {
    e.preventDefault();
    document.getElementById('vision-image-viewport').classList.remove('drag-over');
    var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) this._loadFile(file);
  }

  handleFile(e) {
    var file = e.target.files && e.target.files[0];
    if (file) {
      this._loadFile(file);
      e.target.value = '';
    }
  }

  _loadFile(file) {
    var self = this;
    var isPDF = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    document.getElementById('vision-file-status').textContent = 'Loading ' + file.name + '...';
    var reader = new FileReader();
    reader.onload = function (ev) {
      if (isPDF) {
        self._renderPDFPages(ev.target.result, file.name);
      } else {
        var rawBase64 = ev.target.result.split(',')[1];
        if (rawBase64.length > 4000000) {
          self._compressImage(ev.target.result, file.name);
        } else {
          self._imageBase64 = rawBase64;
          self._imageMime = file.type || 'image/jpeg';
          self._showPreview(ev.target.result, file.name);
        }
      }
    };
    reader.readAsDataURL(file);
  }

  _compressImage(dataUrl, label) {
    var self = this;
    var img = new Image();
    img.onload = function () {
      var MAX = 1600;
      var w = img.naturalWidth, h = img.naturalHeight;
      if (w > MAX || h > MAX) {
        var ratio = Math.min(MAX / w, MAX / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }
      var canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      var compressed = canvas.toDataURL('image/jpeg', 0.88);
      self._imageBase64 = compressed.split(',')[1];
      self._imageMime = 'image/jpeg';
      self._showPreview(compressed, label);
    };
    img.src = dataUrl;
  }

  _showPreview(dataUrl, label) {
    document.getElementById('vision-drop-idle').style.display = 'none';
    var wrap = document.getElementById('vision-loaded-wrap');
    wrap.style.display = 'inline-block';
    document.getElementById('vision-preview-img').src = dataUrl;
    document.getElementById('vision-file-status').textContent = '\uD83D\uDCC4 ' + (label || 'Image loaded') + ' — ready to analyze';
    var hint = document.getElementById('vision-capture-hint');
    if (hint) hint.style.display = 'block';
  }

  async _renderPDFPages(pdfDataUrl, fileName) {
    if (window.pdfjsLib) {
      try {
        var task = pdfjsLib.getDocument(pdfDataUrl);
        var pdf = await task.promise;
        this._pdf = pdf;
        this._pdfScale = 1.5;
        this._pdfCurrentPage = 1;
        this._pdfTotalPages = pdf.numPages;

        var page = await pdf.getPage(1);
        var scale = 1.5;
        var vp = page.getViewport({ scale: scale });
        var canvas = document.createElement('canvas');
        canvas.width = vp.width;
        canvas.height = vp.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        var dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        this._imageBase64 = dataUrl.split(',')[1];
        this._imageMime = 'image/jpeg';

        document.getElementById('vision-drop-idle').style.display = 'none';
        document.getElementById('vision-loaded-wrap').style.display = 'none';
        var pdfScroll = document.getElementById('vision-pdf-scroll');
        pdfScroll.style.display = 'block';
        pdfScroll.innerHTML = '';

        for (var i = 1; i <= pdf.numPages; i++) {
          var pg = await pdf.getPage(i);
          var pgVp = pg.getViewport({ scale: this._pdfScale });
          var pgCanvas = document.createElement('canvas');
          pgCanvas.width = pgVp.width;
          pgCanvas.height = pgVp.height;
          pgCanvas.className = 'vision-pdf-page';
          pgCanvas.dataset.pageNum = i;
          pgCanvas.style.marginBottom = '12px';
          pgCanvas.style.borderRadius = '8px';
          pgCanvas.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
          await pg.render({ canvasContext: pgCanvas.getContext('2d'), viewport: pgVp }).promise;
          pdfScroll.appendChild(pgCanvas);
        }

        document.getElementById('vision-zoom-controls').style.display = 'flex';
        document.getElementById('vision-page-nav').style.display = 'flex';
        document.getElementById('vision-page-info').textContent = '1 / ' + pdf.numPages;
        document.getElementById('vision-zoom-level').textContent = '100%';
        document.getElementById('vision-file-status').textContent = '\uD83D\uDCC4 ' + (fileName || 'PDF') + ' — ' + pdf.numPages + ' pages loaded';

        var self = this;
        pdfScroll.addEventListener('scroll', function () {
          var canvases = pdfScroll.querySelectorAll('.vision-pdf-page');
          var currentPage = 1;
          for (var c of canvases) {
            if (c.offsetTop <= pdfScroll.scrollTop + 100) {
              currentPage = parseInt(c.dataset.pageNum);
            }
          }
          self._pdfCurrentPage = currentPage;
          document.getElementById('vision-page-info').textContent = currentPage + ' / ' + self._pdfTotalPages;
        });

        var hint = document.getElementById('vision-capture-hint');
        if (hint) hint.style.display = 'block';
        return;
      } catch (e) {
        // fallback below
      }
    }
    this._imageBase64 = pdfDataUrl.split(',')[1];
    this._imageMime = 'application/pdf';
    var placeholderCanvas = document.createElement('canvas');
    placeholderCanvas.width = 600; placeholderCanvas.height = 780;
    var ctx = placeholderCanvas.getContext('2d');
    ctx.fillStyle = '#141c2e';
    ctx.fillRect(0, 0, 600, 780);
    ctx.fillStyle = '#e4e8f5';
    ctx.font = 'bold 22px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(fileName || 'PDF loaded', 300, 380);
    ctx.fillStyle = '#8590b0';
    ctx.font = '16px system-ui';
    ctx.fillText('Full document will be sent to Nova for analysis', 300, 420);
    this._showPreview(placeholderCanvas.toDataURL('image/png'), fileName || 'PDF');
  }

  async _reRenderPdfPages() {
    if (!this._pdf) return;
    var pdfScroll = document.getElementById('vision-pdf-scroll');
    pdfScroll.innerHTML = '';
    var scale = this._pdfScale;
    for (var i = 1; i <= this._pdf.numPages; i++) {
      var pg = await this._pdf.getPage(i);
      var pgVp = pg.getViewport({ scale: scale });
      var pgCanvas = document.createElement('canvas');
      pgCanvas.width = pgVp.width;
      pgCanvas.height = pgVp.height;
      pgCanvas.className = 'vision-pdf-page';
      pgCanvas.dataset.pageNum = i;
      pgCanvas.style.marginBottom = '12px';
      pgCanvas.style.borderRadius = '8px';
      pgCanvas.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
      await pg.render({ canvasContext: pgCanvas.getContext('2d'), viewport: pgVp }).promise;
      pdfScroll.appendChild(pgCanvas);
    }
  }

  zoomIn() {
    if (!this._pdf) return;
    this._pdfScale = Math.min(this._pdfScale + 0.25, 4);
    document.getElementById('vision-zoom-level').textContent = Math.round(this._pdfScale / 1.5 * 100) + '%';
    this._reRenderPdfPages();
  }

  zoomOut() {
    if (!this._pdf) return;
    this._pdfScale = Math.max(this._pdfScale - 0.25, 0.5);
    document.getElementById('vision-zoom-level').textContent = Math.round(this._pdfScale / 1.5 * 100) + '%';
    this._reRenderPdfPages();
  }

  zoomFit() {
    if (!this._pdf) return;
    this._pdfScale = 1.5;
    document.getElementById('vision-zoom-level').textContent = '100%';
    this._reRenderPdfPages();
  }

  prevPage() {
    var pdfScroll = document.getElementById('vision-pdf-scroll');
    var canvases = pdfScroll.querySelectorAll('.vision-pdf-page');
    var target = Math.max(1, this._pdfCurrentPage - 1);
    var canvas = canvases[target - 1];
    if (canvas) canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  nextPage() {
    var pdfScroll = document.getElementById('vision-pdf-scroll');
    var canvases = pdfScroll.querySelectorAll('.vision-pdf-page');
    var target = Math.min(this._pdfTotalPages, this._pdfCurrentPage + 1);
    var canvas = canvases[target - 1];
    if (canvas) canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleCaptureMode() {
    this._captureModeActive = !this._captureModeActive;
    var btn = document.getElementById('vision-capture-mode-btn');
    var hint = document.getElementById('vision-capture-hint');
    var img = document.getElementById('vision-preview-img');
    var pdfScroll = document.getElementById('vision-pdf-scroll');
    var isPdfMode = pdfScroll && pdfScroll.style.display !== 'none';

    if (this._captureModeActive) {
      btn.classList.add('active');
      if (hint) hint.style.display = 'block';
      if (isPdfMode) {
        pdfScroll.style.cursor = 'crosshair';
        this._ensurePdfSelectionOverlay();
      } else {
        img.style.cursor = 'crosshair';
      }
    } else {
      btn.classList.remove('active');
      if (hint) hint.style.display = 'none';
      if (isPdfMode) {
        pdfScroll.style.cursor = '';
        var overlay = document.getElementById('vision-pdf-selection-overlay');
        if (overlay) overlay.style.display = 'none';
      } else {
        img.style.cursor = '';
      }
      document.getElementById('vision-selection-rect').style.display = 'none';
      document.getElementById('vision-analyze-selection-btn').style.display = 'none';
      this._selectionB64 = null;
    }
  }

  _ensurePdfSelectionOverlay() {
    var self = this;
    var pdfScroll = document.getElementById('vision-pdf-scroll');
    var overlay = document.getElementById('vision-pdf-selection-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'vision-pdf-selection-overlay';
      overlay.style.cssText = 'position:absolute;border:2px dashed var(--gold);background:rgba(212,165,58,0.12);pointer-events:none;display:none;z-index:10;border-radius:4px;';
      pdfScroll.style.position = 'relative';
      pdfScroll.appendChild(overlay);
    }
    overlay.style.display = 'none';

    if (!pdfScroll._selectionBound) {
      pdfScroll._selectionBound = true;
      pdfScroll.addEventListener('mousedown', function (e) { self._pdfSelectionStart(e); });
      pdfScroll.addEventListener('mousemove', function (e) { self._pdfSelectionMove(e); });
      pdfScroll.addEventListener('mouseup', function (e) { self._pdfSelectionEnd(e); });
    }
  }

  _pdfSelectionStart(e) {
    if (!this._captureModeActive) return;
    e.preventDefault();
    var pdfScroll = document.getElementById('vision-pdf-scroll');
    var rect = pdfScroll.getBoundingClientRect();
    this._pdfSelecting = true;
    this._pdfSelectStart = {
      x: e.clientX - rect.left + pdfScroll.scrollLeft,
      y: e.clientY - rect.top + pdfScroll.scrollTop,
      clientX: e.clientX,
      clientY: e.clientY
    };
    var overlay = document.getElementById('vision-pdf-selection-overlay');
    overlay.style.left = this._pdfSelectStart.x + 'px';
    overlay.style.top = this._pdfSelectStart.y + 'px';
    overlay.style.width = '0'; overlay.style.height = '0';
    overlay.style.display = 'block';
  }

  _pdfSelectionMove(e) {
    if (!this._pdfSelecting || !this._pdfSelectStart) return;
    var pdfScroll = document.getElementById('vision-pdf-scroll');
    var rect = pdfScroll.getBoundingClientRect();
    var cx = e.clientX - rect.left + pdfScroll.scrollLeft;
    var cy = e.clientY - rect.top + pdfScroll.scrollTop;
    var sx = this._pdfSelectStart.x;
    var sy = this._pdfSelectStart.y;
    var overlay = document.getElementById('vision-pdf-selection-overlay');
    overlay.style.left = Math.min(sx, cx) + 'px';
    overlay.style.top = Math.min(sy, cy) + 'px';
    overlay.style.width = Math.abs(cx - sx) + 'px';
    overlay.style.height = Math.abs(cy - sy) + 'px';
  }

  _pdfSelectionEnd(e) {
    if (!this._pdfSelecting) return;
    this._pdfSelecting = false;
    var pdfScroll = document.getElementById('vision-pdf-scroll');
    var rect = pdfScroll.getBoundingClientRect();
    var cx = e.clientX - rect.left + pdfScroll.scrollLeft;
    var cy = e.clientY - rect.top + pdfScroll.scrollTop;
    var sx = this._pdfSelectStart.x;
    var sy = this._pdfSelectStart.y;
    var selW = Math.abs(cx - sx);
    var selH = Math.abs(cy - sy);
    var selX = Math.min(sx, cx);
    var selY = Math.min(sy, cy);

    if (selW < 15 || selH < 15) {
      document.getElementById('vision-pdf-selection-overlay').style.display = 'none';
      return;
    }

    var canvases = pdfScroll.querySelectorAll('.vision-pdf-page');
    var cropCanvas = document.createElement('canvas');
    cropCanvas.width = selW; cropCanvas.height = selH;
    var ctx = cropCanvas.getContext('2d');

    for (var c of canvases) {
      var cTop = c.offsetTop;
      var cLeft = c.offsetLeft;
      var cBot = cTop + c.height;
      var cRight = cLeft + c.width;
      if (selX < cRight && selX + selW > cLeft && selY < cBot && selY + selH > cTop) {
        var srcX = Math.max(0, selX - cLeft);
        var srcY = Math.max(0, selY - cTop);
        var srcW = Math.min(c.width - srcX, selX + selW - cLeft - srcX);
        var srcH = Math.min(c.height - srcY, selY + selH - cTop - srcY);
        var destX = Math.max(0, cLeft - selX);
        var destY = Math.max(0, cTop - selY);
        ctx.drawImage(c, srcX, srcY, srcW, srcH, destX, destY, srcW, srcH);
      }
    }

    var dataUrl = cropCanvas.toDataURL('image/png');
    this._selectionB64 = dataUrl.split(',')[1];
    document.getElementById('vision-analyze-selection-btn').style.display = 'flex';
    window.app._toast('Region captured — click "Analyze Selection" to analyze it', 2000);
  }

  startSelection(e) {
    if (!this._captureModeActive) return;
    e.preventDefault();
    this._selecting = true;
    var img = document.getElementById('vision-preview-img');
    var rect = img.getBoundingClientRect();
    this._selectStart = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      iw: img.naturalWidth,
      ih: img.naturalHeight,
      dw: img.offsetWidth,
      dh: img.offsetHeight
    };
    var sel = document.getElementById('vision-selection-rect');
    sel.style.left = this._selectStart.x + 'px';
    sel.style.top = this._selectStart.y + 'px';
    sel.style.width = '0';
    sel.style.height = '0';
    sel.style.display = 'block';
  }

  updateSelection(e) {
    if (!this._selecting || !this._selectStart) return;
    var img = document.getElementById('vision-preview-img');
    var rect = img.getBoundingClientRect();
    var cx = e.clientX - rect.left;
    var cy = e.clientY - rect.top;
    var sx = this._selectStart.x;
    var sy = this._selectStart.y;
    var sel = document.getElementById('vision-selection-rect');
    sel.style.left = Math.min(sx, cx) + 'px';
    sel.style.top = Math.min(sy, cy) + 'px';
    sel.style.width = Math.abs(cx - sx) + 'px';
    sel.style.height = Math.abs(cy - sy) + 'px';
  }

  endSelection(e) {
    if (!this._selecting) return;
    this._selecting = false;
    var img = document.getElementById('vision-preview-img');
    var rect = img.getBoundingClientRect();
    var cx = e.clientX - rect.left;
    var cy = e.clientY - rect.top;
    var sx = this._selectStart.x;
    var sy = this._selectStart.y;
    var w = Math.abs(cx - sx);
    var h = Math.abs(cy - sy);
    if (w < 15 || h < 15) {
      document.getElementById('vision-selection-rect').style.display = 'none';
      return;
    }
    var scaleX = img.naturalWidth / img.offsetWidth;
    var scaleY = img.naturalHeight / img.offsetHeight;
    var cropX = Math.min(sx, cx) * scaleX;
    var cropY = Math.min(sy, cy) * scaleY;
    var cropW = w * scaleX;
    var cropH = h * scaleY;

    var self = this;
    var canvas = document.createElement('canvas');
    canvas.width = cropW;
    canvas.height = cropH;
    var ctx = canvas.getContext('2d');
    var fullImg = new Image();
    fullImg.onload = function () {
      ctx.drawImage(fullImg, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
      var dataUrl = canvas.toDataURL('image/png');
      self._selectionB64 = dataUrl.split(',')[1];
      document.getElementById('vision-analyze-selection-btn').style.display = 'flex';
      window.app._toast('Region captured — click "Analyze Selection" to analyze it', 2000);
    };
    fullImg.src = img.src;
  }

  analyzeFullImage() {
    this._captureModeActive = false;
    document.getElementById('vision-capture-mode-btn').classList.remove('active');
    var hint = document.getElementById('vision-capture-hint');
    if (hint) hint.style.display = 'none';
    this.analyze();
  }

  async analyzeSelection() {
    if (!this._selectionB64) {
      window.app._toast('Drag to select a region first', 2000);
      return;
    }
    var savedBase64 = this._imageBase64;
    var savedMime = this._imageMime;
    this._imageBase64 = this._selectionB64;
    this._imageMime = 'image/png';
    await this.analyze();
    this._imageBase64 = savedBase64;
    this._imageMime = savedMime;
  }

  async analyze() {
    if (!this._imageBase64) {
      window.app._toast('Please upload an image or PDF first', 2200);
      return;
    }

    var question = document.getElementById('vision-question-input').value.trim();
    var btn = document.getElementById('vision-analyze-btn');
    var placeholder = document.getElementById('vision-result-placeholder');
    var resultWrap = document.getElementById('vision-result-content-wrap');
    var resultEl = document.getElementById('vision-result-content');

    btn.disabled = true;
    btn.classList.add('loading');
    btn.innerHTML = '<div class="vision-analyzing-ring" style="width:16px;height:16px;border-width:2px;"></div> Analyzing\u2026';

    placeholder.style.display = 'none';
    resultWrap.style.display = 'none';
    var resultArea = document.getElementById('vision-result-area');
    var spinnerDiv = resultArea.querySelector('.vision-analyzing');
    if (!spinnerDiv) {
      spinnerDiv = document.createElement('div');
      spinnerDiv.className = 'vision-analyzing';
      spinnerDiv.innerHTML = '<div class="vision-analyzing-ring"></div>' +
        '<div class="vision-analyzing-text">Nova Vision is analyzing\u2026</div>' +
        '<div class="vision-analyzing-sub">Reading content, equations, diagrams</div>';
      resultArea.appendChild(spinnerDiv);
    }
    spinnerDiv.style.display = 'flex';

    try {
      var resp = await fetch(VidyaAPI.BASE + '/analyze/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_base64: this._imageBase64,
          image_mime: this._imageMime || 'image/png',
          prompt: question
        }),
        signal: AbortSignal.timeout(120000)
      });

      spinnerDiv.style.display = 'none';
      if (!resp.ok) {
        var errMsg = 'API ' + resp.status;
        try {
          var errBody = await resp.json();
          errMsg = errBody.detail || errBody.message || JSON.stringify(errBody).slice(0, 200);
        } catch (_) {}
        throw new Error(errMsg);
      }
      var data = await resp.json();

      resultWrap.style.display = 'block';
      resultEl.innerHTML = '';
      await window.app._streamHTML(resultEl, data.content);
    } catch (err) {
      if (spinnerDiv) spinnerDiv.style.display = 'none';
      resultWrap.style.display = 'block';
      resultEl.innerHTML =
        '<div style="padding:12px 0; color:var(--text-muted);">' +
        '<strong style="color:var(--neon-pink)">\u26A0 Backend not connected.</strong><br><br>' +
        'Start the backend server with your <code>NOVA_API_KEY</code> to use Nova Vision.' +
        '<br><br><em style="font-size:0.78rem">' + err.message + '</em></div>';
    } finally {
      btn.disabled = false;
      btn.classList.remove('loading');
      btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Analyze with Nova';
    }
  }

  copyResult() {
    var el = document.getElementById('vision-result-content');
    if (!el || !el.innerText) return;
    navigator.clipboard.writeText(el.innerText).then(function () {
      window.app._toast('Analysis copied to clipboard \u2713', 1500);
    });
  }

  _initResize() {
    if (this._resizeBound) return;
    this._resizeBound = true;
    var handle = document.getElementById('vision-resize-handle');
    var panel = document.getElementById('vision-analysis-panel');
    if (!handle || !panel) return;

    var startX, startW;

    var onMouseDown = function (e) {
      e.preventDefault();
      startX = e.clientX;
      startW = panel.offsetWidth;
      handle.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    var onMouseMove = function (e) {
      var dx = startX - e.clientX;
      var newW = Math.max(280, Math.min(window.innerWidth * 0.75, startW + dx));
      panel.style.width = newW + 'px';
    };

    var onMouseUp = function () {
      handle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    handle.addEventListener('mousedown', onMouseDown);
  }
})();
