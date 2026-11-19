/* SOA generator (soa-generator.html), Dana 19 Nov 2026. Runs after js/dana-ae.js (the live SOA screen) and js/dana-feature.js.
   "Your SOA, in your brand": the Aynub SOA walkthrough as a two-page reader on the deep-teal stage, all 21 pages below,
   and Lee's full-screen reader one click away. Styling: css/dana-rp.css (stage) + css/dana-soa.css. */
(function () {
  'use strict';
  var docs = document.querySelector('#example .pp-docs');
  if (!docs) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var N = 21, cur = 1, auto = !reduce, tv = null, vis = false;
  function src(n) { return 'assets/aynub/docs/soa/' + n + '.webp?v=4'; }
  var view = document.createElement('div');
  view.className = 'rp-view soa-view';
  var thumbs = ''; for (var i = 1; i <= N; i++) thumbs += '<button type="button" class="rp-th soa-th" data-n="' + i + '" aria-label="Show page ' + i + ' of ' + N + '"><img src="' + src(i) + '" alt="" loading="lazy"><span>' + i + '</span></button>';
  view.innerHTML =
    '<div class="rp-stage soa-stage"><div class="soa-spread"><div class="soa-pg"><img data-a alt=""></div><div class="soa-pg"><img data-b alt=""></div></div>' +
      '<div class="rp-bar"><span class="rp-brand"><u></u>Aynub Financial · Statement of Advice</span><span class="rp-count">Pages <b data-n>1–2</b> / ' + N + '</span>' +
      '<span class="rp-btns"><button type="button" class="rp-nav" data-d="-2" aria-label="Previous pages">←</button><button type="button" class="rp-nav" data-d="2" aria-label="Next pages">→</button>' +
      '<button type="button" class="rp-full" data-reader="soa" data-page="1">Read it full screen</button></span></div>' +
      '<div class="rp-tag rp-tag-a" aria-hidden="true"><i></i>Your template, logo and fonts</div><div class="rp-tag rp-tag-b" aria-hidden="true"><i></i>21 pages · drafted by Bunya</div></div>' +
    '<div class="rp-rail" role="group" aria-label="All 21 pages">' + thumbs + '</div>';
  docs.insertAdjacentElement('afterend', view);
  docs.classList.add('dx-hide');
  var A = view.querySelector('[data-a]'), B = view.querySelector('[data-b]'), cnt = view.querySelector('[data-n]'), full = view.querySelector('.rp-full'), rail = view.querySelector('.rp-rail');
  function go(n, user) {
    n = Math.max(1, Math.min(N, n)); if (n % 2 === 0) n -= 1; cur = n;
    if (user) { auto = false; clearTimeout(tv); }
    [A, B].forEach(function (im) { im.classList.remove('in'); void im.offsetWidth; });
    A.src = src(cur); A.alt = 'Aynub Financial SOA walkthrough, page ' + cur + ' of ' + N + ' (fictional example)';
    var b = cur + 1 <= N ? cur + 1 : 0;
    B.parentNode.style.visibility = b ? 'visible' : 'hidden';
    if (b) { B.src = src(b); B.alt = 'Page ' + b + ' of ' + N + ' (fictional example)'; }
    A.classList.add('in'); B.classList.add('in');
    cnt.textContent = b ? cur + '–' + b : String(cur); full.setAttribute('data-page', String(cur));
    [].forEach.call(rail.children, function (t) { var k = +t.dataset.n, on = k === cur || k === b; t.classList.toggle('on', on); });
    var on = rail.querySelector('.on');
    if (on && user !== 'load') rail.scrollTo({ left: on.offsetLeft - rail.clientWidth / 2 + on.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  }
  view.addEventListener('click', function (e) {
    var t = e.target.closest('.rp-th'); if (t) { go(+t.dataset.n, true); return; }
    var d = e.target.closest('.rp-nav'); if (d) { var n = cur + (+d.dataset.d); if (n > N) n = 1; if (n < 1) n = N; go(n, true); }
  });
  function loop() { clearTimeout(tv); if (!auto || !vis) return; tv = setTimeout(function () { go(cur + 2 > N ? 1 : cur + 2); loop(); }, 5000); }
  go(1, 'load');
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) loop(); else clearTimeout(tv); }, { threshold: .3 }).observe(view);
})();

