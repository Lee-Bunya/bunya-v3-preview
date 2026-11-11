/* Concept 3: drag the divider between the messy desk and the calm Command Centre; the list below settles row by row. */
(function () {
  var frame = document.getElementById('st-frame'); if (!frame) return;
  var handle = frame.querySelector('.st-handle'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var x = 100;
  function set(v) {
    x = Math.max(0, Math.min(100, v));
    frame.style.setProperty('--x', x.toFixed(2) + '%');
    handle.setAttribute('aria-valuenow', Math.round(x));
  }
  function fromEvent(e) {
    var r = frame.getBoundingClientRect(), cx = (e.touches ? e.touches[0].clientX : e.clientX);
    set((cx - r.left) / r.width * 100);
  }
  var dragging = false;
  function down(e) { dragging = true; frame.classList.remove('st-hint'); frame.classList.add('st-dragging'); fromEvent(e); }
  function move(e) { if (!dragging) return; if (e.cancelable && !e.touches) e.preventDefault(); fromEvent(e); }
  function up() { dragging = false; frame.classList.remove('st-dragging'); }
  frame.addEventListener('mousedown', down);
  addEventListener('mousemove', move);
  addEventListener('mouseup', up);
  frame.addEventListener('touchstart', down, { passive: true });
  frame.addEventListener('touchmove', move, { passive: true });
  addEventListener('touchend', up);
  handle.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { set(x - 5); e.preventDefault(); }
    if (e.key === 'ArrowRight') { set(x + 5); e.preventDefault(); }
  });

  // On arrival: the divider sweeps in from the right to show there is something behind the mess.
  set(100);
  if (!reduce) setTimeout(function () { frame.classList.add('st-hint'); set(58); setTimeout(function () { frame.classList.remove('st-hint'); }, 1700); }, 900);
  else set(58);

  // The list: each row settles as it reaches the middle of the screen.
  var rows = [].slice.call(document.querySelectorAll('.st-row'));
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }); },
      { rootMargin: '0px 0px -40% 0px' });
    rows.forEach(function (r) { io.observe(r); });
  } else rows.forEach(function (r) { r.classList.add('on'); });

  // A dark menu bar over the dark hero.
  var body = document.body, dark = null;
  function checkDark() {
    var on = frame.getBoundingClientRect().bottom > 56;
    if (on === dark) return; dark = on; body.classList.toggle('hw-darknav', on);
    var logo = document.querySelector('#site-nav .logo-img');
    if (logo) logo.src = on ? 'assets/84374dbcdaa8.svg' : 'assets/71cabd5c4963.png'; else dark = null;
  }
  addEventListener('scroll', checkDark, { passive: true });
  setTimeout(checkDark, 0); setTimeout(checkDark, 400);
})();
