/* Is Bunya right for you (is-bunya-right.html), Dana 20 Nov 2026. Styling: css/dana-fit.css.
   - Section kickers; fit cards keep one icon tile each (no second dot), "not yet" cards muted.
   - Fit check: numbered questions, and a deep-teal result card with a progress ring (answered of 5) and next-step
     buttons once the result is in. Lee's scoring script is unchanged; this only reads its result. */
(function () {
  'use strict';
  var K = { 'fit-h': 'Good fit', 'not-h': 'Not yet', 'check-h': 'The fit check', 'need-h': 'Before you start' };
  Object.keys(K).forEach(function (id) {
    var h = document.getElementById(id); if (!h || h.previousElementSibling && h.previousElementSibling.classList.contains('sx-k')) return;
    h.insertAdjacentHTML('beforebegin', '<span class="sx-k">' + K[id] + '</span>');
  });

  [].forEach.call(document.querySelectorAll('main h2'), function (x) { if (/^\s*Common questions\.?\s*$/.test(x.textContent) || /Straight answers/.test(x.textContent)) x.innerHTML = 'Questions, <span>answered.</span>'; });
  /* kickers for the remaining heads */
  [].forEach.call(document.querySelectorAll('main .sx-head h2'), function (x) {
    var prev = x.previousElementSibling; if (prev && prev.classList.contains('sx-k')) return;
    var k = /answered/.test(x.textContent) ? 'Questions' : /costs nothing/.test(x.textContent) ? 'Getting started' : '';
    if (k) x.insertAdjacentHTML('beforebegin', '<span class="sx-k">' + k + '</span>');
  });
  var res = document.getElementById('fit-result'), qs = document.querySelectorAll('.fit-qs li');
  if (!res || res.parentNode.classList.contains('fit-side')) return;
  var side = document.createElement('div'); side.className = 'fit-side';
  res.parentNode.insertBefore(side, res);
  side.innerHTML = '<svg class="fit-rings" viewBox="0 0 800 800" aria-hidden="true"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="9"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="8"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="8"/></g></svg>' +
    '<div class="fit-ring" aria-hidden="true"><svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="50"/><circle class="fg" cx="60" cy="60" r="50"/></svg><span><b class="fit-n">0</b><small>of 5</small></span></div>';
  side.appendChild(res);
  side.insertAdjacentHTML('beforeend', '<div class="fit-next"><a class="fit-go" href="build.html">Build yours</a><a class="fit-go ghost" href="booking.html">Book a demo</a></div>');
  var fg = side.querySelector('.fg'), n = side.querySelector('.fit-n'), C = 2 * Math.PI * 50;
  fg.style.strokeDasharray = C; fg.style.strokeDashoffset = C;
  function update() {
    var done = [].filter.call(qs, function (li) { return li.querySelector('[aria-pressed="true"]'); }).length;
    n.textContent = done; fg.style.strokeDashoffset = C * (1 - done / qs.length);
    var st = /\bgood\b/.test(res.className) ? 'good' : /\bnot\b/.test(res.className) ? 'not' : /\bmaybe\b/.test(res.className) ? 'maybe' : '';
    side.setAttribute('data-st', st);
    [].forEach.call(qs, function (li) { li.classList.toggle('done', !!li.querySelector('[aria-pressed="true"]')); });
  }
  if ('MutationObserver' in window) new MutationObserver(update).observe(res, { attributes: true, childList: true, subtree: true });
  [].forEach.call(qs, function (li) { li.addEventListener('click', function () { setTimeout(update, 0); }); });
  update();
})();

/* Dana (20 Nov 2026): "jazz up the page". An at-a-glance panel under the hero; a tag on each fit card; the "what
   you need" cards tick off when tapped (just for the reader, nothing is stored). */
(function () {
  'use strict';
  var hero = document.querySelector('main .sx-hero');
  var nGood = document.querySelectorAll('.fit-card.good').length, nNot = document.querySelectorAll('.fit-card.not').length, nQ = document.querySelectorAll('.fit-qs li').length;
  if (hero && !document.querySelector('.fit-glance')) {
    hero.insertAdjacentHTML('afterend',
      '<section class="fit-glance" aria-label="At a glance">' +
        '<svg class="fit-rings" viewBox="0 0 800 800" aria-hidden="true"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="9"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="8"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="8"/></g></svg>' +
        '<a class="fg-t good" href="#fit-h"><b>' + nGood + '</b><span>signs Bunya fits</span><i>See them ›</i></a>' +
        '<a class="fg-t not" href="#not-h"><b>' + nNot + '</b><span>reasons to wait</span><i>Better to know now ›</i></a>' +
        '<a class="fg-t quiz" href="#check-h"><b>' + nQ + '</b><span>questions, one answer</span><i>Take the fit check ›</i></a>' +
      '</section>');
  }
  [].forEach.call(document.querySelectorAll('.fit-card.good, .fit-card.not'), function (c) {
    if (c.querySelector('.fit-tag')) return;
    c.insertAdjacentHTML('afterbegin', '<span class="fit-tag">' + (c.classList.contains('good') ? '✓ Fits' : 'Wait') + '</span>');
  });
  var needs = document.querySelectorAll('.fit-card.need');
  if (needs.length && !document.querySelector('.fit-tick-hint')) {
    var grid = needs[0].parentNode;
    grid.insertAdjacentHTML('beforebegin', '<p class="fit-tick-hint">Tap each one you already have. <b class="fit-have">0 of ' + needs.length + '</b> in place.</p>');
    var have = document.querySelector('.fit-have');
    [].forEach.call(needs, function (c) {
      c.setAttribute('role', 'button'); c.setAttribute('tabindex', '0'); c.setAttribute('aria-pressed', 'false');
      c.insertAdjacentHTML('afterbegin', '<span class="fit-box" aria-hidden="true"></span>');
      function t() { var on = c.getAttribute('aria-pressed') !== 'true'; c.setAttribute('aria-pressed', on); c.classList.toggle('have', on);
        have.textContent = document.querySelectorAll('.fit-card.need.have').length + ' of ' + needs.length; }
      c.addEventListener('click', function (e) { if (e.target.closest('a')) return; t(); });
      c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } });
    });
  }
})();
