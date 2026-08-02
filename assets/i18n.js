(function () {
  var NAV_ES = {
    "Tree": "Árbol", "Book": "Libro", "Trip": "Viaje", "Colonial Record": "Registro Colonial",
    "Boriken": "Borikén", "Image Archive": "Archivo de Imágenes", "The Island Itself": "La Isla Misma",
    "Who Served": "Quiénes Sirvieron", "Indigenous Map": "Mapa Indígena", "Cookbook": "Recetario",
    "Remembered": "Recordados", "Open Leads": "Pistas Abiertas", "Encomienda": "Encomienda",
    "You Didn't Know": "No Lo Sabías", "Full Tree": "Árbol Completo", "Full Timeline": "Cronología Completa",
    "Family Album": "Álbum Familiar"
  };
  var navOriginal = new WeakMap();

  function translateNav(lang) {
    document.querySelectorAll('.fam-nav a, .fam-nav .active').forEach(function (a) {
      if (a.classList.contains('lang-btn') || a.classList.contains('fam-nav-brand')) return;
      if (!navOriginal.has(a)) navOriginal.set(a, a.textContent.trim());
      var en = navOriginal.get(a);
      a.textContent = (lang === 'es' && NAV_ES[en]) ? NAV_ES[en] : en;
    });
  }

  function apply(lang) {
    translateNav(lang);
    document.querySelectorAll('.i18n-en').forEach(function (el) { el.style.display = lang === 'en' ? '' : 'none'; });
    document.querySelectorAll('.i18n-es').forEach(function (el) { el.style.display = lang === 'es' ? '' : 'none'; });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem('fam_lang', lang); } catch (e) {}
  }

  function getLang() {
    try { return localStorage.getItem('fam_lang') || 'en'; } catch (e) { return 'en'; }
  }

  function injectToggle() {
    var nav = document.querySelector('.fam-nav');
    if (!nav || nav.querySelector('.lang-toggle')) return;
    var wrap = document.createElement('span');
    wrap.className = 'lang-toggle';
    wrap.style.cssText = 'margin-left:auto;display:inline-flex;gap:4px;flex-shrink:0;';
    wrap.innerHTML =
      '<button type="button" class="lang-btn" data-lang="en" style="font-size:11px;font-weight:700;padding:5px 10px;border-radius:999px;border:1px solid var(--line);background:var(--paper-raised);cursor:pointer;">EN</button>' +
      '<button type="button" class="lang-btn" data-lang="es" style="font-size:11px;font-weight:700;padding:5px 10px;border-radius:999px;border:1px solid var(--line);background:var(--paper-raised);cursor:pointer;">ES</button>';
    nav.appendChild(wrap);
    wrap.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { apply(btn.getAttribute('data-lang')); });
    });
  }

  function init() {
    injectToggle();
    apply(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  var obs = new MutationObserver(function () {
    injectToggle();
    apply(getLang());
  });
  obs.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['style'] });
})();
