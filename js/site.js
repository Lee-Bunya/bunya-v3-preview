/* Shared behaviour for the v2 rebuild: live product screens, product tabs on mobile,
 * the closing-panel logo reveal, and the review-notes toggle. Load with `defer` after nav.js/footer.js. */

/* ---------- Live product screens ----------
 * <div class="screen" data-screen="home" data-base="1280" data-title="…"></div>
 * Each key maps to a file in screens/. Dana's design embedded these as srcdoc;
 * here they load by URL, so the HTML stays light and the screens are cached. */
window.__ccScreens = {
  home: { file: 'cc-home' }, pipeline: { file: 'cc-pipeline' }, reviews: { file: 'cc-reviews' },
  reports: { file: 'cc-reports' }, soa: { file: 'cc-soa' }, factfind: { file: 'cc-factfind' },
  outlook: { file: 'cc-outlook' }, portal: { file: 'cc-portal' },
  bhq_board: { file: 'bhq-board', scripts: true }, bhq_cockpit: { file: 'bhq-cockpit', scripts: true },
  meeting: { file: 'voice-meeting' }, call: { file: 'voice-call' }
};
function ccMount(box, key) {
  var def = window.__ccScreens[key];
  if (!def) return;
  var f = box.querySelector('iframe');
  if (!f) {
    f = document.createElement('iframe');
    f.setAttribute('loading', 'lazy');
    if (!box.classList.contains('scrollable')) f.setAttribute('tabindex', '-1');
    f.title = box.dataset.title || 'Command Centre screen, illustrative data';
    box.appendChild(f);
  }
  if (f.dataset.key !== key) {
    f.dataset.key = key;
    f.setAttribute('sandbox', def.scripts ? 'allow-scripts allow-same-origin' : 'allow-same-origin');
    f.src = 'screens/' + def.file + '.html';
  }
  ccFit(box);
}
function ccFit(box) {
  var f = box.querySelector('iframe'); if (!f) return;
  var w = box.clientWidth, h = box.clientHeight, base = parseInt(box.dataset.base || '1280', 10), sc = w / base;
  f.style.width = base + 'px'; f.style.height = Math.round(h / sc) + 'px'; f.style.transform = 'scale(' + sc + ')';
}
function ccFitAll() { document.querySelectorAll('.screen[data-screen]').forEach(ccFit); }

(function () {
  document.querySelectorAll('.screen[data-screen]').forEach(function (b) { ccMount(b, b.dataset.screen); });
  window.addEventListener('resize', ccFitAll);
  window.addEventListener('load', ccFitAll);
  if (document.fonts) document.fonts.ready.then(ccFitAll);

  /* Closing-panel logo reveal (Dana): plays when scrolled into view, click to replay. */
  var boxes = document.querySelectorAll('.closing-anim');
  boxes.forEach(function (b, n) {
    if (b.querySelector('svg') || !window.BUNYA_LOGO_SVG) return;
    // Each copy gets its own ids so two animations on one page don't share definitions.
    var svg = n === 0 ? window.BUNYA_LOGO_SVG : window.BUNYA_LOGO_SVG.replace(/\b(cg-\d+|closeConeGrad)\b/g, '$1-' + n);
    b.innerHTML = svg;
  });
  function replay(b) { var c = b.querySelector('svg').cloneNode(true); b.querySelector('svg').replaceWith(c); b.classList.add('play'); }
  boxes.forEach(function (b) { b.addEventListener('click', function () { replay(b); }); b.setAttribute('role', 'img'); b.setAttribute('aria-label', 'Bunya AI animated logo'); });
  if (boxes.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('play'); io.unobserve(e.target); } }); }, { threshold: .35 });
      boxes.forEach(function (b) { io.observe(b); });
    } else boxes.forEach(function (b) { b.classList.add('play'); });
  }

  /* Showcase tabs become a select + previous/next on small screens (Dana). */
  document.querySelectorAll('.showcase [role=tablist]').forEach(function (list) {
    var tabs = [].slice.call(list.querySelectorAll('[role=tab]')); if (!tabs.length) return;
    var nav = document.createElement('div'); nav.className = 'mobile-feature-nav';
    var label = document.createElement('label'); label.textContent = 'Explore a feature';
    var select = document.createElement('select'); select.setAttribute('aria-label', list.getAttribute('aria-label') || 'Choose a feature');
    tabs.forEach(function (t, i) { var o = document.createElement('option'); o.value = i; o.textContent = (i + 1) + ' / ' + tabs.length + ' — ' + t.textContent; select.append(o); });
    label.append(select);
    var row = document.createElement('div'); row.className = 'mobile-feature-actions';
    var prev = document.createElement('button'), next = document.createElement('button');
    prev.type = next.type = 'button'; prev.textContent = '← Previous'; next.textContent = 'Next →';
    row.append(prev, next); nav.append(label, row); list.before(nav);
    function sync() { var i = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; }); select.value = i; prev.disabled = i === 0; next.disabled = i === tabs.length - 1; }
    function go(i) { tabs[i].click(); sync(); }
    select.addEventListener('change', function () { go(Number(select.value)); });
    prev.addEventListener('click', function () { go(Number(select.value) - 1); });
    next.addEventListener('click', function () { go(Number(select.value) + 1); });
    new MutationObserver(sync).observe(list, { subtree: true, attributes: true, attributeFilter: ['aria-selected'] });
    sync();
  });

  /* Review notes: [CONFIRM] copy and For-Dana notes are visible by default; a button hides them. */
  if (document.querySelector('.confirm, .dana-note')) {
    var key = 'bunya-hide-notes', root = document.documentElement;
    try { if (localStorage.getItem(key) === '1') root.classList.add('hide-notes'); } catch (e) {}
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'review-toggle';
    function label() { b.textContent = root.classList.contains('hide-notes') ? 'Show review notes' : 'Hide review notes'; }
    b.addEventListener('click', function () {
      root.classList.toggle('hide-notes'); label();
      try { localStorage.setItem(key, root.classList.contains('hide-notes') ? '1' : '0'); } catch (e) {}
    });
    label(); document.body.appendChild(b);
  }
})();
