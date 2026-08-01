(function () {
  if (!('speechSynthesis' in window)) return;

  var current = null;

  function speak(text, btn) {
    window.speechSynthesis.cancel();
    if (current === btn) { current = null; setLabel(btn, false); return; }
    if (current) setLabel(current, false);
    var u = new SpeechSynthesisUtterance(text);
    u.rate = 0.98;
    u.onend = function () { setLabel(btn, false); current = null; };
    u.onerror = function () { setLabel(btn, false); current = null; };
    window.speechSynthesis.speak(u);
    current = btn;
    setLabel(btn, true);
  }

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

  function addButtons() {
    var cards = document.querySelectorAll('.fam-card, .era');
    cards.forEach(function (card) {
      if (card.querySelector('.fam-listen-btn')) return;
      var btn = document.createElement('button');
      btn.className = 'fam-listen-btn';
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.style.cssText = 'display:inline-flex;align-items:center;gap:4px;margin-top:10px;font-size:12px;font-weight:600;padding:5px 12px;border-radius:999px;border:1px solid var(--line,#c3b89f);background:var(--paper-raised,#e8e2d3);color:var(--ink-soft,#57503f);cursor:pointer;';
      setLabel(btn, false);
      btn.addEventListener('click', function () { speak(textOf(card), btn); });
      card.appendChild(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButtons);
  } else {
    addButtons();
  }
  // Re-scan after the password gate unlocks content that was display:none
  var obs = new MutationObserver(addButtons);
  obs.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['style'] });
})();
