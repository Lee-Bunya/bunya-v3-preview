/* Concept 5: play the three scenes in turn with crossfades, the matching line of type, progress bars and a pause button.
   With reduced motion, show the first scene's poster and all is still. */
(function () {
  var sec = document.getElementById('fm'); if (!sec) return;
  var vids = [].slice.call(sec.querySelectorAll('.fm-v')), lines = [].slice.call(sec.querySelectorAll('.fm-line'));
  var dots = [].slice.call(sec.querySelectorAll('.fm-dot')), pause = sec.querySelector('.fm-pause');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur = 0, paused = reduce;

  function show(i) {
    cur = i;
    vids.forEach(function (v, k) {
      v.classList.toggle('on', k === i);
      if (k === i) { try { v.currentTime = 0; } catch (e) {} if (!paused) v.play().catch(function () {}); }
      else setTimeout(function () { if (k !== cur) v.pause(); }, 1400);
    });
    lines.forEach(function (l, k) { l.classList.toggle('on', k === i); });
    dots.forEach(function (d, k) { d.classList.toggle('done', k < i); d.classList.toggle('on', k === i); d.querySelector('i').style.setProperty('--p', '0%'); });
  }
  vids.forEach(function (v, k) {
    // Move on a moment before the clip ends, so the crossfade covers the cut.
    v.addEventListener('timeupdate', function () {
      if (k !== cur || !v.duration) return;
      dots[k].querySelector('i').style.setProperty('--p', Math.min(100, v.currentTime / (v.duration - 1.2) * 100).toFixed(1) + '%');
      if (v.currentTime > v.duration - 1.2) show((k + 1) % vids.length);
    });
  });
  dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); }); });
  pause.addEventListener('click', function () {
    paused = !paused;
    pause.classList.toggle('paused', paused);
    pause.setAttribute('aria-label', paused ? 'Play the film' : 'Pause the film');
    if (paused) vids[cur].pause(); else vids[cur].play().catch(function () {});
  });
  if (reduce) { pause.classList.add('paused'); pause.setAttribute('aria-label', 'Play the film'); }
  show(0);

  // A dark menu bar over the film.
  var body = document.body, dark = null;
  function checkDark() {
    var on = sec.getBoundingClientRect().bottom > 56;
    if (on === dark) return; dark = on; body.classList.toggle('hw-darknav', on);
    var logo = document.querySelector('#site-nav .logo-img');
    if (logo) logo.src = on ? 'assets/84374dbcdaa8.svg' : 'assets/71cabd5c4963.png'; else dark = null;
  }
  addEventListener('scroll', checkDark, { passive: true });
  setTimeout(checkDark, 0); setTimeout(checkDark, 400);
})();
