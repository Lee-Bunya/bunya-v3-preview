/* Homepage showcase (prototype): the film in the hero, the pinned journey and the role cards.
   Loads after showcase.js. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ICON = { play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
               pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
               replay: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg>' };

  // Film: settles in, plays once (muted) the first time it is mostly in view, then rests on its end card.
  var film = $('.hm-film');
  if (film) {
    var v = $('video', film), btn = $('.sc-round', film), started = false;
    function icon() {
      var k = v.ended ? 'replay' : v.paused ? 'play' : 'pause';
      btn.innerHTML = ICON[k];
      btn.setAttribute('aria-label', k === 'replay' ? 'Replay the film' : k === 'play' ? 'Play the film' : 'Pause the film');
    }
    ['play', 'pause', 'ended'].forEach(function (e) { v.addEventListener(e, icon); });
    btn.addEventListener('click', function () { if (v.paused || v.ended) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
    icon();
    requestAnimationFrame(function () { film.classList.add('on'); });
    if (!reduce && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !started) { started = true; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
          else if (!e.isIntersecting && !v.paused) v.pause();
        });
      }, { threshold: .6 });
      io.observe(film);
    }
  }

  // Journey: whichever stage sits in the middle of the screen lights up and swaps the pinned picture.
  var steps = $$('.hm-step'), pins = $$('.hm-pin img'), rail = $$('.hm-pin .rail i');
  function show(n) {
    steps.forEach(function (s, k) { s.classList.toggle('now', k === n); });
    pins.forEach(function (im, k) { im.classList.toggle('on', k === n); });
    rail.forEach(function (d, k) { d.classList.toggle('on', k === n); });
  }
  if (steps.length) {
    show(0);
    if ('IntersectionObserver' in window) {
      var jo = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) show(steps.indexOf(e.target)); });
      }, { rootMargin: '-45% 0px -45% 0px' });
      steps.forEach(function (s) { jo.observe(s); });
    }
  }

  // Role cards: arrows step through the row; they dim at either end.
  var row = $('.hm-cards'), prev = $('#hm-prev'), next = $('#hm-next');
  if (row && prev && next) {
    function step(d) {
      var card = $('.hm-card', row), gap = parseFloat(getComputedStyle(row).columnGap) || 18;
      row.scrollBy({ left: d * (card.offsetWidth + gap), behavior: reduce ? 'auto' : 'smooth' });
    }
    function ends() {
      prev.disabled = row.scrollLeft < 8;
      next.disabled = row.scrollLeft + row.clientWidth > row.scrollWidth - 8;
    }
    prev.addEventListener('click', function () { step(-1); });
    next.addEventListener('click', function () { step(1); });
    row.addEventListener('scroll', ends, { passive: true }); addEventListener('resize', ends); ends();
  }
})();
