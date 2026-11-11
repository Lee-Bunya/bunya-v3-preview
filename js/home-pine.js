/* v3 homepage: the 13 diamonds of the Bunya mark fly in and lock together, then open into
   Command Centre (gold, centre), seven agents (inner ring) and five apps (outer ring) as you scroll. */
(function () {
  var body = document.body, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.getElementById('bp-hero'), stage = document.getElementById('bp-stage');
  if (!hero || !stage) return;
  var stick = hero.querySelector('.bp-stick'), copy = hero.querySelector('.bp-copy'), lines = hero.querySelector('.bp-lines');
  var caps = [].slice.call(hero.querySelectorAll('.bp-captions li')), end = hero.querySelector('.bp-end');
  var els = [].slice.call(stage.querySelectorAll('.bp-piece'));
  var P = els.map(function (el) {
    return { el: el, x: +el.dataset.x, y: +el.dataset.y, w: +el.dataset.w, h: +el.dataset.h, gold: el.classList.contains('gold'),
             svg: el.querySelector('svg'), node: el.querySelector('.bp-node') };
  });
  var teal = P.filter(function (p) { return !p.gold; }), gold = P.filter(function (p) { return p.gold; })[0];

  // Scatter positions: chosen once, so the fly-in is the same on every visit.
  var seed = 7;
  function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  P.forEach(function (p) { p.sx = rand() * 2 - 1; p.sy = rand() * 2 - 1; p.sr = (rand() * 2 - 1) * 200; p.ss = 0.3 + rand() * 0.9; });

  var vw, vh, k, mobile;
  function layout() {
    vw = innerWidth; vh = innerHeight; mobile = vw < 700;
    var coneH = Math.min(vh * (mobile ? 0.17 : 0.3), 300);
    k = coneH / 284;
    var cy0 = -vh * (mobile ? 0.3 : 0.19);
    P.forEach(function (p) {
      p.el.style.width = (p.w * k) + 'px'; p.el.style.height = (p.h * k) + 'px';
      p.el.style.marginLeft = (-p.w * k / 2) + 'px'; p.el.style.marginTop = (-p.h * k / 2) + 'px';
      p.ax = (p.x - 127.5) * k; p.ay = (p.y - 142) * k + cy0;
      p.fx = p.sx * vw * 0.62; p.fy = p.sy * vh * 0.62;
    });
    // The constellation: two ellipses round the centre, a little above the middle of the screen.
    var oy = -vh * (mobile ? 0.06 : 0.075);
    var r1x = mobile ? vw * 0.3 : Math.min(vw * 0.27, 330), r1y = mobile ? vh * 0.19 : Math.min(vh * 0.25, 220);
    var r2x = mobile ? vw * 0.42 : Math.min(vw * 0.43, 560), r2y = mobile ? vh * 0.33 : Math.min(vh * 0.34, 300);
    gold.cx = 0; gold.cy = oy - (mobile ? 10 : 20);
    teal.forEach(function (p, i) {
      var ring = i < 7, n = ring ? 7 : 5, j = ring ? i : i - 7;
      // Apps start at the top, so none lands on the captions at the bottom.
      // Agents are offset half a step so none sits directly under an app.
      var a = -Math.PI / 2 + (j / n) * Math.PI * 2 + (ring ? Math.PI / 7 : 0);
      p.cx = Math.cos(a) * (ring ? r1x : r2x); p.cy = oy + Math.sin(a) * (ring ? r1y : r2y);
      p.ring = ring;
    });
    // Lines from the centre to every node.
    lines.setAttribute('viewBox', '0 0 ' + vw + ' ' + vh);
    lines.innerHTML = teal.map(function (p) {
      var x2 = vw / 2 + p.cx, y2 = vh / 2 + p.cy, len = Math.hypot(p.cx - gold.cx, p.cy - gold.cy);
      p.len = len;
      return '<line class="' + (p.ring ? '' : 'app') + '" x1="' + (vw / 2 + gold.cx) + '" y1="' + (vh / 2 + gold.cy) + '" x2="' + x2 + '" y2="' + y2 + '" style="stroke-dashoffset:' + len + ';stroke-dasharray:' + len + '"/>';
    }).join('');
    teal.forEach(function (p, i) { p.line = lines.children[i]; });
  }

  function place(p, x, y, r, s) { p.el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + r.toFixed(1) + 'deg) scale(' + s.toFixed(3) + ')'; }
  var ease = function (t) { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };

  var intro = true;
  function frame() {
    if (intro) return;
    var r = hero.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
    var q = ease((p - 0.1) / 0.5);
    P.forEach(function (o) {
      place(o, o.ax + (o.cx - o.ax) * q, o.ay + (o.cy - o.ay) * q, 0, 1);
      o.svg.style.opacity = 1 - ease((q - 0.5) / 0.35);
      o.node.style.opacity = ease((q - 0.62) / 0.33);
    });
    teal.forEach(function (o) { o.line.style.strokeDashoffset = o.len * (1 - ease((q - 0.7) / 0.3)); });
    copy.style.opacity = 1 - ease(p / 0.1);
    copy.style.transform = 'translateY(' + (-p * 120).toFixed(1) + 'px)';
    copy.style.pointerEvents = p > 0.05 ? 'none' : '';
    var on = -1;
    caps.forEach(function (c, i) { if (p >= +c.dataset.at) on = i; });
    caps.forEach(function (c, i) { c.classList.toggle('on', i === on && p < 0.9); });
    end.classList.toggle('on', p >= 0.9);
    hero.classList.toggle('bp-open', q > 0.9);
  }

  function start() {
    layout();
    if (reduce) { intro = false; body.classList.add('bp-ready'); frame(); return; }
    P.forEach(function (o) { place(o, o.fx, o.fy, o.sr, o.ss); });
    stage.getBoundingClientRect();
    body.classList.add('bp-ready');
    stage.classList.add('bp-assembling');
    P.forEach(function (o, i) { o.el.style.setProperty('--delay', (0.15 + i * 0.07).toFixed(2) + 's'); place(o, o.ax, o.ay, 0, 1); });
    setTimeout(function () { stage.classList.remove('bp-assembling'); intro = false; frame(); }, 2900);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(start, 80); }); else setTimeout(start, 200);

  var ticking = false;
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; frame(); }); } }, { passive: true });
  addEventListener('resize', function () { layout(); if (!intro) frame(); });

  // A dark menu bar over the dark hero, with the light logo.
  var dark = null;
  function checkDark() {
    var on = hero.getBoundingClientRect().bottom > 56;
    if (on === dark) return;
    dark = on; body.classList.toggle('hw-darknav', on);
    var logo = document.querySelector('#site-nav .logo-img');
    if (logo) logo.src = on ? 'assets/84374dbcdaa8.svg' : 'assets/71cabd5c4963.png';
    else dark = null;
  }
  addEventListener('scroll', checkDark, { passive: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', checkDark);
  setTimeout(checkDark, 0); setTimeout(checkDark, 400);
})();
