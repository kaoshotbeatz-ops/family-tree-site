(function () {
  var LANGS = ['en', 'es', 'ru'];

  var NAV = {
    es: {
      "Tree": "Árbol", "Book": "Libro", "Trip": "Viaje", "Colonial Record": "Registro Colonial",
      "Boriken": "Borikén", "Image Archive": "Archivo de Imágenes", "The Island Itself": "La Isla Misma",
      "Who Served": "Quiénes Sirvieron", "Indigenous Map": "Mapa Indígena", "Cookbook": "Recetario",
      "Remembered": "Recordados", "Open Leads": "Pistas Abiertas", "Encomienda": "Encomienda",
      "You Didn't Know": "No Lo Sabías", "Full Tree": "Árbol Completo", "Full Timeline": "Cronología Completa",
      "Family Album": "Álbum Familiar"
    },
    ru: {
      "Tree": "Древо", "Book": "Книга", "Trip": "Поездка", "Colonial Record": "Колониальная летопись",
      "Boriken": "Борикен", "Image Archive": "Архив изображений", "The Island Itself": "Сам остров",
      "Who Served": "Кто служил", "Indigenous Map": "Карта индейцев", "Cookbook": "Кулинарная книга",
      "Remembered": "Памяти", "Open Leads": "Открытые вопросы", "Encomienda": "Энкомьенда",
      "You Didn't Know": "Вы не знали", "Full Tree": "Полное древо", "Full Timeline": "Полная хронология",
      "Family Album": "Семейный альбом"
    }
  };

  var navOriginal = new WeakMap();

  function translateNav(lang) {
    var table = NAV[lang];
    document.querySelectorAll('.fam-nav a, .fam-nav .active').forEach(function (a) {
      if (a.classList.contains('lang-btn') || a.classList.contains('fam-nav-brand')) return;
      if (!navOriginal.has(a)) navOriginal.set(a, a.textContent.trim());
      var en = navOriginal.get(a);
      a.textContent = (table && table[en]) ? table[en] : en;
    });
  }

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'en';
    translateNav(lang);
    LANGS.forEach(function (code) {
      document.querySelectorAll('.i18n-' + code).forEach(function (el) {
        el.style.display = (code === lang) ? '' : 'none';
      });
    });
    // A page may not have been translated into every language yet. If nothing is
    // visible for the chosen language, fall back to showing English rather than
    // leaving the reader with a blank page.
    if (lang !== 'en' && document.querySelector('.i18n-' + lang) === null) {
      document.querySelectorAll('.i18n-en').forEach(function (el) { el.style.display = ''; });
    }
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem('fam_lang', lang); } catch (e) {}
  }

  function getLang() {
    try {
      var v = localStorage.getItem('fam_lang');
      return LANGS.indexOf(v) === -1 ? 'en' : v;
    } catch (e) { return 'en'; }
  }

  function injectToggle() {
    var nav = document.querySelector('.fam-nav');
    if (!nav || nav.querySelector('.lang-toggle')) return;
    var wrap = document.createElement('span');
    wrap.className = 'lang-toggle';
    wrap.style.cssText = 'margin-left:auto;display:inline-flex;gap:4px;flex-shrink:0;';
    var btnCss = 'font-size:11px;font-weight:700;padding:5px 10px;border-radius:999px;' +
                 'border:1px solid var(--line);background:var(--paper-raised);cursor:pointer;';
    wrap.innerHTML = LANGS.map(function (code) {
      return '<button type="button" class="lang-btn" data-lang="' + code + '" style="' + btnCss + '">' +
             code.toUpperCase() + '</button>';
    }).join('');
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
