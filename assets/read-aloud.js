(function () {
  var current = null;
  var audio = new Audio();

  // Same FNV-1a hash as the audio generation pipeline — maps section text to its pre-rendered file
  function fnv1a(str) {
    var h = 0x811c9dc5;
    var bytes = new TextEncoder().encode(str);
    for (var i = 0; i < bytes.length; i++) {
      h ^= bytes[i];
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(16);
  }

  // Path prefix back to site root (pages live one level deep except the root page)
  var AUDIO_BASE = (location.pathname.replace(/[^/]*$/, '').split('/').filter(Boolean).length > 0 && !location.pathname.endsWith('/deploy/'))
    ? '../assets/audio/' : 'assets/audio/';

  function setLabel(btn, playing) {
    if (!btn) return;
    btn.textContent = playing ? '⏸ Stop' : '🔊 Listen';
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  }

  function textOf(card) {
    var clone = card.cloneNode(true);
    var btn = clone.querySelector('.fam-listen-btn');
    if (btn) btn.remove();
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function stopAll() {
    audio.pause();
    audio.currentTime = 0;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (current) setLabel(current, false);
    current = null;
  }

  function speakFallback(text, btn) {
    if (!('speechSynthesis' in window)) return;
    var u = new SpeechSynthesisUtterance(text);
    u.rate = 0.98;
    u.onend = function () { if (current === btn) { setLabel(btn, false); current = null; } };
    u.onerror = function () { if (current === btn) { setLabel(btn, false); current = null; } };
    window.speechSynthesis.speak(u);
  }

  function play(card, btn) {
    if (current === btn) { stopAll(); return; }
    stopAll();
    current = btn;
    setLabel(btn, true);

    var text = textOf(card);
    var src = AUDIO_BASE + fnv1a(text) + '.m4a';
    audio.src = src;
    audio.onended = function () { if (current === btn) { setLabel(btn, false); current = null; } };
    audio.onerror = function () {
      // No pre-rendered file for this section (content changed since generation) — fall back to browser TTS
      if (current === btn) speakFallback(text, btn);
    };
    audio.play().catch(function () { if (current === btn) speakFallback(text, btn); });
  }

  function addButtons() {
    var cards = document.querySelectorAll('.fam-card, .era, .fact-card, .archive-section-head, .stop, .plain');
    cards.forEach(function (card) {
      if (card.querySelector('.fam-listen-btn')) return;
      var btn = document.createElement('button');
      btn.className = 'fam-listen-btn';
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.style.cssText = 'display:inline-flex;align-items:center;gap:4px;margin-top:10px;font-size:12px;font-weight:600;padding:5px 12px;border-radius:999px;border:1px solid var(--line,#c3b89f);background:var(--paper-raised,#e8e2d3);color:var(--ink-soft,#57503f);cursor:pointer;';
      setLabel(btn, false);
      btn.addEventListener('click', function () { play(card, btn); });
      card.appendChild(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButtons);
  } else {
    addButtons();
  }
  var obs = new MutationObserver(addButtons);
  obs.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['style'] });
})();
