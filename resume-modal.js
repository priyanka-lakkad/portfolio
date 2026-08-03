(function () {
  var RESUME_URL = 'assets/Priyanka-Lakkad-Resume.pdf';
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
      '.resume-modal-body{flex:1 1 auto;background:#1a1a1a;}',
      '.resume-modal-body iframe{width:100%;height:100%;border:0;display:block;}',
      '@media (max-width:640px){.resume-modal-panel{height:92vh;border-radius:14px;}}'
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
    var iframe = document.createElement('iframe');
    iframe.title = 'Resume PDF';
    body.appendChild(iframe);

    panel.appendChild(header);
    panel.appendChild(body);
    backdrop.appendChild(panel);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });

    document.body.appendChild(backdrop);
    return { backdrop: backdrop, iframe: iframe };
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  function openModal() {
    injectStyles();
    if (!modal) modal = buildModal();
    if (!modal.iframe.src) modal.iframe.src = RESUME_URL;
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
