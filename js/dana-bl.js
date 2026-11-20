/* Insights (blog.html), Dana 20 Nov 2026. Styling: css/dana-bl.css.
   - Topics in Bunya teals (they were violet, yellow, blue, pink and green); covers on a soft aqua glow.
   - The library head: a kicker with the guide count over a two-tone headline.
   - The featured guide gets a "Read the guide" button. */
(function () {
  'use strict';
  var TEAL = { 'AI & advice': '#7EDAD6', 'Practice operations': '#11B8B1', 'Governance & evidence': '#0A9C96', 'Systems & ownership': '#0A7D79', 'Perspective': '#04545B' };
  function paint(el, topic) {
    var k = TEAL[topic]; if (!k) return;
    el.style.setProperty('--k', k);
    el.style.setProperty('--g1', 'rgba(126,218,214,.45)');
    el.style.setProperty('--g2', 'rgba(17,184,177,.22)');
  }
  [].forEach.call(document.querySelectorAll('.ar-card[data-topic]'), function (c) {
    var t = c.getAttribute('data-topic'); paint(c, t);
    var im = c.querySelector('.im'); if (im) paint(im, t);
  });
  [].forEach.call(document.querySelectorAll('.ar-chips button[data-f]'), function (b) { paint(b, b.getAttribute('data-f')); });

  var h = document.getElementById('h-lib');
  if (h && !h.querySelector('span')) {
    var all = document.querySelector('.ar-chips button[data-f="all"] small'); var n = all ? all.textContent.trim() : document.querySelectorAll('.ar-card').length;
    h.insertAdjacentHTML('beforebegin', '<span class="sx-k bl-kick">The library · ' + n + ' guides</span>');
    h.innerHTML = 'Every guide, <span>by topic.</span>';
    h.parentNode.classList.add('bl-head');
  }
  var big = document.querySelector('.ar-card.big .tx');
  if (big && !big.querySelector('.bl-go')) {
    var mt = big.querySelector('.mt');
    var go = document.createElement('span'); go.className = 'bl-go';
    go.innerHTML = 'Read the guide<i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></i>';
    big.insertBefore(go, mt);
  }
})();

/* Dana (20 Nov 2026): the featured guide's cover was a small app screenshot. It's now a live scene: Aynub's Statement of
   Advice fanned out (cover with its photo, two inside pages), and the draft's sections ticking off one by one until it's
   ready for the adviser to approve. */
(function () {
  'use strict';
  var im = document.querySelector('.ar-feat .ar-card.big .im');
  if (!im || im.querySelector('.bl-vis')) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var D = 'assets/aynub/docs/soa/';
  var ROWS = [['Scope of the advice', 'Drafted'], ['Your situation and goals', 'Drafted'], ['What we recommend', 'Drafted'], ['Why it suits you', 'Drafted'], ['Fees and costs', 'To check']];
  var v = document.createElement('span');
  v.className = 'bl-vis'; v.setAttribute('aria-hidden', 'true');
  v.innerHTML = '<span class="bl-st">' +
    '<span class="bl-doc d3"><img src="' + D + '3.webp" alt=""></span>' +
    '<span class="bl-doc d2"><img src="' + D + '2.webp" alt=""></span>' +
    '<span class="bl-doc d1"><img src="' + D + '1.webp" alt=""></span>' +
    '<span class="bl-tag"><i></i>21 pages · plain English</span>' +
    '<span class="bl-chk"><span class="bl-ch"><span class="bl-lg"></span><span><b>Statement of Advice</b><small>Sam &amp; Jo · draft</small></span></span>' +
      ROWS.map(function (r, i) { return '<span class="bl-row' + (r[1] === 'To check' ? ' warn' : '') + '" data-i="' + i + '"><i></i><span>' + r[0] + '</span><em>' + r[1] + '</em></span>'; }).join('') +
      '<span class="bl-ready"><i>✓</i>Ready for Alex to approve</span></span>' +
    '</span>';
  var img = im.querySelector('img'); if (img) img.classList.add('bl-hide');
  im.appendChild(v); im.classList.add('bl-on');
  var st = v.querySelector('.bl-st');
  function fit() { var w = im.clientWidth, h = im.clientHeight; if (w && h) { var k = Math.min(w / 640, h / 470) * 1.04; st.style.setProperty('--k', k); st.style.left = (w - 640 * k) / 2 + 'px'; st.style.top = (h - 470 * k) / 2 + 'px'; } }
  fit(); if ('ResizeObserver' in window) new ResizeObserver(fit).observe(im); else addEventListener('resize', fit);
  var rows = v.querySelectorAll('.bl-row'), ready = v.querySelector('.bl-ready'), n = 0, timer = null, seen = false;
  function show(k) { [].forEach.call(rows, function (r, i) { r.classList.toggle('on', i < k); }); ready.classList.toggle('on', k >= rows.length); }
  if (reduce) { show(rows.length); return; }
  function tick() { clearTimeout(timer); if (!seen) return; n = n >= rows.length ? 0 : n + 1; show(n); timer = setTimeout(tick, n === 0 ? 900 : n >= rows.length ? 3600 : 1000); }
  function set(s) { if (s === seen) return; seen = s; clearTimeout(timer); if (seen) timer = setTimeout(tick, 700); }
  function check() { var r = im.getBoundingClientRect(), h = innerHeight || document.documentElement.clientHeight; set(r.bottom > r.height * .3 && r.top < h - r.height * .3); }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { set(es[0].isIntersecting); }, { threshold: .3 }).observe(im);
  addEventListener('scroll', check, { passive: true }); addEventListener('resize', check); check();
})();
