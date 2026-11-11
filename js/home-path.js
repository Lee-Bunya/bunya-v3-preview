/* Concept 6: draw a smooth path through every stage node (and on to the gold end node), then reveal it as you scroll,
   with a glowing dot at its tip and each stage lighting up as the line reaches it. */
(function () {
  var track = document.getElementById('pt-track'); if (!track) return;
  var svg = track.querySelector('.pt-svg'), line = track.querySelector('.pt-line'), ghost = track.querySelector('.pt-ghost');
  var comet = track.querySelector('.pt-comet'), stages = [].slice.call(track.querySelectorAll('.pt-stage'));
  var endNode = track.querySelector('.pt-end .pt-node'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var L = 0, nodeAt = [];

  function centre(el) {
    var t = track.getBoundingClientRect(), r = el.getBoundingClientRect();
    return [r.left + r.width / 2 - t.left, r.top + r.height / 2 - t.top];
  }
  function build() {
    var w = track.offsetWidth, h = track.offsetHeight;
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var pts = [[w / 2, 0]];  // starts centred, under "Follow the path"
    stages.forEach(function (s) { pts.push(centre(s.querySelector('.pt-node'))); });
    pts.push(centre(endNode));
    // Smooth curve: each segment leaves and arrives vertically, so the line weaves like a river.
    var d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i], my = (b[1] - a[1]) * 0.55;
      d += ' C' + a[0].toFixed(1) + ' ' + (a[1] + my).toFixed(1) + ' ' + b[0].toFixed(1) + ' ' + (b[1] - my).toFixed(1) + ' ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1);
    }
    line.setAttribute('d', d); ghost.setAttribute('d', d);
    L = line.getTotalLength();
    line.style.strokeDasharray = L;
    // Where along the line each stage node sits, so a stage lights up exactly when the line reaches it.
    nodeAt = pts.slice(1).map(function (p) {
      var lo = 0, hi = L;
      for (var k = 0; k < 30; k++) { var mid = (lo + hi) / 2; if (line.getPointAtLength(mid).y < p[1]) lo = mid; else hi = mid; }
      return lo;
    });
    frame();
  }
  function frame() {
    if (!L) return;
    var t = track.getBoundingClientRect(), vh = innerHeight;
    // The tip follows a point a little below the middle of the screen.
    var y = vh * 0.58 - t.top;
    var lo = 0, hi = L;
    for (var k = 0; k < 24; k++) { var mid = (lo + hi) / 2; if (line.getPointAtLength(mid).y < y) lo = mid; else hi = mid; }
    var drawn = reduce ? L : Math.max(0, Math.min(L, lo));
    line.style.strokeDashoffset = (L - drawn).toFixed(1);
    var p = line.getPointAtLength(drawn);
    comet.style.setProperty('--cx', p.x.toFixed(1) + 'px'); comet.style.setProperty('--cy', p.y.toFixed(1) + 'px');
    comet.style.opacity = drawn > 4 && drawn < L - 4 ? 1 : 0;
    stages.forEach(function (s, i) { s.classList.toggle('on', drawn >= nodeAt[i] - 8); });
  }
  var ticking = false;
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; frame(); }); } }, { passive: true });
  addEventListener('resize', build);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build); else setTimeout(build, 200);
  setTimeout(build, 600);
})();
