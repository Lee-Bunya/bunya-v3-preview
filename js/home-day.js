/* Concept 2: a working day passes as you scroll. Scroll position → time of day (7:30 am to 7:30 pm) →
   sky, sun, ridges, clock, the moment on screen and the running tally. */
(function () {
  var sec = document.getElementById('dy'); if (!sec) return;
  var stick = sec.querySelector('.dy-stick'), intro = sec.querySelector('.dy-intro'), night = sec.querySelector('.dy-night');
  var moments = [].slice.call(sec.querySelectorAll('.dy-moment')), pics = [].slice.call(sec.querySelectorAll('.dy-pics img'));
  var notes = [].slice.call(sec.querySelectorAll('.dy-note')), hm = sec.querySelector('.dy-hm'), ap = sec.querySelector('.dy-ap');
  var tN = sec.querySelector('.t-notes'), tA = sec.querySelector('.t-actions'), tP = sec.querySelector('.t-approvals');
  var hours = moments.map(function (m) { return +m.dataset.h; });
  var T0 = 7.5, T1 = 19.5;

  // Sky through the day: [hour, top, middle, bottom, far ridge, mid ridge, near ridge, light text?]
  var KEYS = [
    [7.5, '#0B1B2E', '#3B4A6B', '#E9967A', '#2A3550', '#1C2740', '#121C2E', 1],
    [8.6, '#4F86B0', '#9CC3D6', '#F6D9B8', '#5C7A93', '#3F5A6E', '#26394A', 0],
    [11.5, '#3C9DC4', '#8FD0DE', '#E3F5F2', '#6E9EA2', '#4A7774', '#2F5552', 0],
    [14.5, '#4A97BC', '#97CCD6', '#F2E8CF', '#77999B', '#4F716F', '#304E4D', 0],
    [16.8, '#3D6E96', '#C9A98A', '#F5B66A', '#6F6A79', '#4A4558', '#2B2A3C', 1],
    [18.2, '#1A2A4A', '#5A4A6E', '#E07A5F', '#3A3550', '#262640', '#161A2C', 1],
    [19.5, '#040A16', '#0E1A30', '#1B2D4A', '#141F33', '#0D1626', '#070D18', 1]
  ];
  function hex(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
  function mix(a, b, t) { var x = hex(a), y = hex(b); return 'rgb(' + x.map(function (v, i) { return Math.round(v + (y[i] - v) * t); }).join(',') + ')'; }
  function at(t) {
    for (var i = 0; i < KEYS.length - 1; i++) if (t <= KEYS[i + 1][0]) {
      var a = KEYS[i], b = KEYS[i + 1], f = (t - a[0]) / (b[0] - a[0]);
      return { top: mix(a[1], b[1], f), mid: mix(a[2], b[2], f), bot: mix(a[3], b[3], f), far: mix(a[4], b[4], f), mid2: mix(a[5], b[5], f), near: mix(a[6], b[6], f),
               light: (f < 0.5 ? a[7] : b[7]) === 1 };
    }
    var k = KEYS[KEYS.length - 1];
    return { top: k[1], mid: k[2], bot: k[3], far: k[4], mid2: k[5], near: k[6], light: true };
  }
  function clock(t) {
    var mins = Math.round((t % 1) * 60 / 5) * 5, h = Math.floor(t) + (mins === 60 ? 1 : 0); mins = mins % 60;
    var h12 = ((h + 11) % 12) + 1;
    return [h12 + ':' + (mins < 10 ? '0' : '') + mins, h < 12 ? 'am' : 'pm'];
  }
  var body = document.body, dark = null;
  function setDark(on) {
    if (on === dark) return; dark = on;
    body.classList.toggle('hw-darknav', on);
    var logo = document.querySelector('#site-nav .logo-img');
    if (logo) logo.src = on ? 'assets/84374dbcdaa8.svg' : 'assets/71cabd5c4963.png'; else dark = null;
  }

  function frame() {
    var r = sec.getBoundingClientRect(), vh = innerHeight;
    var p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
    var t = T0 + (T1 - T0) * Math.min(1, p / 0.9);
    var s = at(t), st = stick.style;
    st.setProperty('--sky-top', s.top); st.setProperty('--sky-mid', s.mid); st.setProperty('--sky-bot', s.bot);
    st.setProperty('--far', s.far); st.setProperty('--mid', s.mid2); st.setProperty('--near', s.near);
    st.setProperty('--ink-now', s.light ? '#fff' : '#06222A');
    st.setProperty('--sub-now', s.light ? 'rgba(255,255,255,.74)' : 'rgba(6,34,42,.66)');
    // The sun rises behind the left ridge, arcs over and sets on the right; then the moon and stars.
    var sp = (t - 7) / 11.5, sx = 32 + sp * 62, sy = 84 - Math.sin(Math.PI * Math.min(1, Math.max(0, sp))) * 70;
    st.setProperty('--sun-x', sx.toFixed(1) + '%'); st.setProperty('--sun-y', sy.toFixed(1) + '%');
    st.setProperty('--sun', t > 16.5 ? '#FFC07A' : '#FFF1C9');
    st.setProperty('--sun-o', Math.max(0, Math.min(1, (18.6 - t) / 0.6)).toFixed(2));
    st.setProperty('--moon-o', Math.max(0, Math.min(1, (t - 18.4) / 0.8)).toFixed(2));
    st.setProperty('--stars-o', Math.max(0, Math.min(1, (t - 18) / 1.2)).toFixed(2));
    var c = clock(t); hm.textContent = c[0]; ap.textContent = c[1];
    var on = -1; hours.forEach(function (h, i) { if (t >= h - 0.25) on = i; });
    intro.classList.toggle('off', on >= 0);
    moments.forEach(function (m, i) { m.classList.toggle('on', i === on); });
    pics.forEach(function (im, i) { im.classList.toggle('on', i === Math.max(0, on)); });
    notes.forEach(function (n, i) { n.classList.toggle('on', i === on); });
    // A running tally across the day (illustrative).
    var done = on + 1;
    tN.textContent = [0, 0, 1, 1, 1, 1, 1, 2][done]; tA.textContent = [0, 0, 3, 4, 4, 6, 7, 9][done]; tP.textContent = [0, 0, 1, 2, 3, 4, 5, 6][done];
    var isNight = p > 0.93;
    night.classList.toggle('on', isNight); stick.classList.toggle('night', isNight);
    setDark(r.bottom > 56 && s.light);
  }
  var ticking = false;
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; frame(); }); } }, { passive: true });
  addEventListener('resize', frame);
  frame(); setTimeout(frame, 300); setTimeout(frame, 900);
})();
