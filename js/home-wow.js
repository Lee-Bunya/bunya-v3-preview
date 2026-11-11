/* v3 homepage: the opening sequence, the product swinging flat as you scroll, the statement lighting up
   word by word, and a dark menu bar while the hero is on screen. */
(function () {
  var body = document.body, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.hw-hero'), device = document.querySelector('.hw-device');
  var words = [].slice.call(document.querySelectorAll('.hw-lit span')), lit = document.querySelector('.hw-lit');

  // Teal words in the statement: the product's promises.
  ['record', 'workflow', 'approves'].forEach(function (w) {
    words.forEach(function (s) { if (s.textContent.toLowerCase().indexOf(w) === 0) s.classList.add('t'); });
  });

  // The opening sequence starts once the fonts are in, so nothing re-flows mid-animation.
  function go() { requestAnimationFrame(function () { body.classList.add('hw-ready'); }); }
  if (reduce) body.classList.add('hw-ready');
  else if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(go, 60); });
  else setTimeout(go, 200);

  var ticking = false;
  function frame() {
    ticking = false;
    var vh = innerHeight;
    if (device && !reduce) {
      var r = hero.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, -r.top / (vh * 0.55)));
      device.style.setProperty('--tilt', (24 * (1 - p)).toFixed(2) + 'deg');
      device.style.setProperty('--sc', (0.92 + 0.08 * p).toFixed(3));
      device.style.setProperty('--p', p.toFixed(3));
    }
    if (lit) {
      var b = lit.getBoundingClientRect();
      var q = (vh * 0.82 - b.top) / (b.height + vh * 0.25);
      var n = reduce ? words.length : Math.round(Math.min(1, Math.max(0, q)) * words.length * 1.12);
      words.forEach(function (s, k) { s.classList.toggle('on', k < n); });
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  frame();

  // Dark menu bar over the dark hero; the logo switches to its light version.
  function setDark(on) {
    body.classList.toggle('hw-darknav', on);
    var logo = document.querySelector('#site-nav .logo-img');
    if (logo) logo.src = on ? 'assets/84374dbcdaa8.svg' : 'assets/71cabd5c4963.png';
  }
  var dark = null;
  function checkDark() {
    if (!hero) return;
    var on = hero.getBoundingClientRect().bottom > 56;
    if (on !== dark) { dark = on; setDark(on); }
  }
  addEventListener('scroll', checkDark, { passive: true });
  // The menu is drawn by nav.js on DOMContentLoaded, so check again once it exists.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { dark = null; checkDark(); });
  setTimeout(function () { dark = null; checkDark(); }, 0);
})();
