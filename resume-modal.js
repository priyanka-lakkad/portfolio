(function () {
  var RESUME_URL = 'assets/Priyanka-Lakkad-Resume.pdf';
  var RESUME_PREVIEW_URL = 'assets/resume-preview.png';
  var modal = null;
  var lastFocused = null;

  function injectStyles() {
    if (document.getElementById('resume-modal-styles')) return;
    var style = document.createElement('style');
    style.id = 'resume-modal-styles';
    style.textContent = [
      '.resume-modal-backdrop{position:fixed;inset:0;z-index:9999;background:rgba(6,5,10,0.72);',
      'backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:24px;',
      'box-sizing:border-box;opacity:0;transition:opacity 180ms ease-out;}',
      '.resume-modal-backdrop.is-open{opacity:1;}',
      '.resume-modal-panel{position:relative;width:100%;max-width:860px;height:88vh;',
      'background:#0a0810;border:1px solid rgba(139,92,246,0.28);border-radius:18px;',
      'box-shadow:0 24px 64px rgba(0,0,0,0.55),0 0 0 1px rgba(139,92,246,0.08);',
      'display:flex;flex-direction:column;overflow:hidden;',
      'transform:translateY(14px) scale(0.98);transition:transform 200ms ease-out;}',
      '.resume-modal-backdrop.is-open .resume-modal-panel{transform:translateY(0) scale(1);}',
      '.resume-modal-header{display:flex;align-items:center;justify-content:space-between;',
      'gap:12px;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0;}',
      '.resume-modal-title{font-family:"Geist",sans-serif;font-size:14px;font-weight:600;',
      'color:#fff;letter-spacing:-0.01em;}',
      '.resume-modal-actions{display:flex;align-items:center;gap:8px;}',
      '.resume-modal-btn{font-family:"Geist",sans-serif;font-size:13px;color:rgba(255,255,255,0.75);',
      'text-decoration:none;border:1px solid rgba(139,92,246,0.32);border-radius:10px;',
      'padding:7px 12px;transition:color 160ms ease-out,border-color 160ms ease-out,background 160ms ease-out;',
      'background:transparent;cursor:pointer;line-height:1.2;}',
      '.resume-modal-btn:hover{color:#a78bfa;border-color:#a78bfa;background:rgba(139,92,246,0.12);}',
      '.resume-modal-close{width:32px;height:32px;padding:0;display:flex;align-items:center;',
      'justify-content:center;font-size:16px;}',
      '.resume-modal-body{flex:1 1 auto;background:#1a1a1a;overflow:auto;display:flex;',
      'align-items:flex-start;justify-content:center;padding:24px;box-sizing:border-box;}',
      '.resume-preview-wrap{position:relative;width:100%;max-width:600px;aspect-ratio:8.5/11;',
      'margin:0 auto;border-radius:12px;overflow:hidden;flex-shrink:0;',
      'box-shadow:0 12px 32px rgba(0,0,0,0.4);background:#0a0810;}',
      '.resume-preview-img{width:100%;height:100%;object-fit:cover;display:block;}',
      '.resume-download-overlay{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);',
      'display:inline-flex;align-items:center;gap:8px;font-family:"Geist",sans-serif;font-size:14px;',
      'font-weight:600;color:#fff;text-decoration:none;padding:12px 22px;border-radius:12px;',
      'background-image:linear-gradient(110deg,#8B5CF6 35%,#ab84f9 50%,#8B5CF6 65%);',
      'background-size:250% 100%;background-position:100% 0;box-shadow:0 8px 24px rgba(139,92,246,0.45);',
      'transition:background-position 400ms ease,box-shadow 180ms ease-out;white-space:nowrap;}',
      '.resume-download-overlay:hover{background-position:0% 0;',
      'box-shadow:0 0 0 4px rgba(139,92,246,0.22),0 10px 28px rgba(139,92,246,0.5);}',
      '@media (max-width:640px){.resume-modal-panel{height:92vh;border-radius:14px;}',
      '.resume-modal-body{padding:16px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildModal() {
    var backdrop = document.createElement('div');
    backdrop.className = 'resume-modal-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', 'Resume preview');

    var panel = document.createElement('div');
    panel.className = 'resume-modal-panel';

    var header = document.createElement('div');
    header.className = 'resume-modal-header';

    var title = document.createElement('span');
    title.className = 'resume-modal-title';
    title.textContent = 'Priyanka Lakkad — Resume';

    var actions = document.createElement('div');
    actions.className = 'resume-modal-actions';

    var download = document.createElement('a');
    download.className = 'resume-modal-btn';
    download.href = RESUME_URL;
    download.setAttribute('download', '');
    download.textContent = 'Download';

    var close = document.createElement('button');
    close.className = 'resume-modal-btn resume-modal-close';
    close.type = 'button';
    close.setAttribute('aria-label', 'Close');
    close.innerHTML = '&times;';
    close.addEventListener('click', closeModal);

    actions.appendChild(download);
    actions.appendChild(close);
    header.appendChild(title);
    header.appendChild(actions);

    var body = document.createElement('div');
    body.className = 'resume-modal-body';

    var previewWrap = document.createElement('div');
    previewWrap.className = 'resume-preview-wrap';

    var img = document.createElement('img');
    img.className = 'resume-preview-img';
    img.src = RESUME_PREVIEW_URL;
    img.alt = 'Resume preview';

    var downloadOverlay = document.createElement('a');
    downloadOverlay.className = 'resume-download-overlay';
    downloadOverlay.href = RESUME_URL;
    downloadOverlay.setAttribute('download', '');
    downloadOverlay.innerHTML =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 3v13"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>' +
      '<span>Download PDF</span>';

    previewWrap.appendChild(img);
    previewWrap.appendChild(downloadOverlay);
    body.appendChild(previewWrap);

    panel.appendChild(header);
    panel.appendChild(body);
    backdrop.appendChild(panel);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });

    document.body.appendChild(backdrop);
    return { backdrop: backdrop };
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  function openModal() {
    injectStyles();
    if (!modal) modal = buildModal();
    lastFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    modal.backdrop.style.display = 'flex';
    requestAnimationFrame(function () {
      modal.backdrop.classList.add('is-open');
    });
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    if (!modal) return;
    modal.backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    setTimeout(function () {
      if (modal) modal.backdrop.style.display = 'none';
    }, 180);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  window.__openResume = openModal;
})();
