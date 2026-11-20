/* Website and marketing (website-marketing.html), Dana 20 Nov 2026. Styling: css/dana-wm.css.
   - The hero example becomes a live scene on deep teal: someone asks, the AI answer types out, Aynub Financial is
     cited, and the enquiry lands in Command Centre as a lead. (Aynub is the site's fictional example practice.)
   - The middle plan is marked "Our pick"; the Google Ads add-on gets an icon.
   - Questions headline: "Questions, answered." */
(function () {
  'use strict';
  var mock = document.querySelector('.wm-mock');
  if (mock && !mock.classList.contains('wm-live')) {
    var q = mock.querySelector('.q span'), ap = mock.querySelector('.a p'), note = mock.querySelector('small');
    var Q = q ? q.textContent : '', A = ap ? ap.textContent : '';
    mock.classList.add('wm-live');
    mock.innerHTML =
      '<svg class="wm-rings" viewBox="0 0 800 800" aria-hidden="true"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="9"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="8"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="8"/></g></svg>' +
      '<div class="wm-steps3" aria-hidden="true"><span data-s="1"><i>1</i>Found</span><b></b><span data-s="2"><i>2</i>Cited</span><b></b><span data-s="3"><i>3</i>Enquiry</span></div>' +
      '<div class="wm-chat">' +
        '<div class="wm-q"><span class="wm-qt"></span></div>' +
        '<div class="wm-a"><span class="wm-ak"><i></i>AI answer</span><p class="wm-at"></p>' +
          '<span class="wm-src"><img src="assets/aynub/aynub-mark.svg" alt=""><span><b>Aynub Financial</b><small>Planning to retire in the South Burnett</small></span><em>Source</em></span></div>' +
        '<div class="wm-lead"><span class="wm-li"><svg viewBox="0 0 24 24"><path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/></svg></span><span><b>New enquiry · Command Centre</b><small>Retirement planning · from your website · assigned to Alex</small></span><em>Lead</em></div>' +
      '</div>' +
      '<small class="wm-note">' + (note ? note.textContent : 'Illustrative only.') + '</small>';
    mock.setAttribute('aria-label', 'Illustrative example: someone asks an AI tool for a financial adviser near Kingaroy; the answer names Aynub Financial, cites its page, and the enquiry lands in Command Centre as a lead. ' + Q + ' ' + A);
    var qt = mock.querySelector('.wm-qt'), at = mock.querySelector('.wm-at'), src = mock.querySelector('.wm-src'), lead = mock.querySelector('.wm-lead'), wa = mock.querySelector('.wm-a'), steps = mock.querySelectorAll('.wm-steps3 span');
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches, timer = null, seen = false, run = 0;
    function stage(n) { [].forEach.call(steps, function (s) { s.classList.toggle('on', +s.dataset.s <= n); }); }
    function final() { qt.textContent = Q; at.textContent = A; wa.classList.add('on'); src.classList.add('on'); lead.classList.add('on'); stage(3); }
    if (reduce) { final(); return; }
    function type(el, txt, speed, done) { var i = 0, my = run; (function step() { if (my !== run) return; el.textContent = txt.slice(0, i); if (i++ <= txt.length) timer = setTimeout(step, speed); else done(); })(); }
    function play() {
      run++; clearTimeout(timer); var my = run;
      qt.textContent = ''; at.textContent = ''; wa.classList.remove('on'); src.classList.remove('on'); lead.classList.remove('on'); stage(0);
      type(qt, Q, 28, function () {
        if (my !== run) return; stage(1); wa.classList.add('on');
        timer = setTimeout(function () { type(at, A, 14, function () {
          if (my !== run) return; src.classList.add('on'); stage(2);
          timer = setTimeout(function () { if (my !== run) return; lead.classList.add('on'); stage(3);
            timer = setTimeout(function () { if (seen) play(); }, 5200); }, 1300);
        }); }, 500);
      });
    }
    function set(v) { if (v === seen) return; seen = v; if (seen) play(); else { run++; clearTimeout(timer); final(); } }
    function check() { var r = mock.getBoundingClientRect(), h = innerHeight || document.documentElement.clientHeight; set(r.bottom > r.height * .3 && r.top < h - r.height * .3); }
    final();
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { set(es[0].isIntersecting); }, { threshold: .3 }).observe(mock);
    addEventListener('scroll', check, { passive: true }); addEventListener('resize', check); check();
  }

  var pick = document.querySelector('.wm-card.pick');
  if (pick && !pick.querySelector('.wm-pickb')) pick.insertAdjacentHTML('afterbegin', '<span class="wm-pickb">Our pick</span>');
  var ads = document.querySelector('.wm-ads');
  if (ads && !ads.querySelector('.wm-adi')) ads.insertAdjacentHTML('afterbegin', '<span class="wm-adi" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 11v2a2 2 0 0 0 2 2h1l4 4V5L6 9H5a2 2 0 0 0-2 2z"/><path d="M14 9a3 3 0 0 1 0 6M17 6a7 7 0 0 1 0 12"/></svg></span>');
  [].forEach.call(document.querySelectorAll('main h2'), function (x) { if (/Straight answers/.test(x.textContent)) x.innerHTML = 'Questions, <span>answered.</span>'; });
})();
