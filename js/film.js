/* Brand films (11 Nov 2026, Lee: "Let Pam go to Bali" promo on the home page and landing pages C, D and E).
   Markup: a section with a muted teaser loop (.pam-loop) and any button with data-film-open="pam".
   The loop plays only while on screen (and not at all with reduced motion); pressing play opens the full film with sound
   in a pop-up, 1080p on wide screens and 720p on phones. dataLayer: film_play, film_25/50/75, film_complete. */
(function(){
  'use strict';
  var FILMS = { pam: { title: 'Let Pam go to Bali', hd: 'assets/films/pam/pam-1080.mp4', sd: 'assets/films/pam/pam-720.mp4', poster: 'assets/films/pam/pam-poster.webp' },
    // 13 Nov 2026: the 40-second intro (832x464 for now; swap in a 1080p export when there is one)
    intro: { title: 'Bunya in 40 seconds', hd: 'assets/films/bunya-intro.mp4', sd: 'assets/films/bunya-intro.mp4', poster: 'assets/films/posters/bunya-intro-open.webp', len: '0:40' } };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, dl = window.dataLayer = window.dataLayer || [];
  var loops = document.querySelectorAll('.pam-loop');
  [].forEach.call(loops, function(v){ v.removeAttribute('autoplay'); if (reduce) v.pause(); });
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { var p = e.target.play(); if (p && p.catch) p.catch(function(){}); } else e.target.pause(); }); }, { threshold: .25 });
    [].forEach.call(loops, function(v){ io.observe(v); });
  }
  var box = null, vid = null, last = null, key = '', marks = {};
  function build(){
    box = document.createElement('div');
    box.className = 'film-pop'; box.hidden = true;
    box.innerHTML = '<div class="film-pop-c" role="dialog" aria-modal="true" aria-label="Film"><button type="button" class="film-x" aria-label="Close the film"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button><video controls playsinline preload="auto"></video></div>';
    document.body.appendChild(box);
    vid = box.querySelector('video');
    box.addEventListener('click', function(e){ if (e.target === box || e.target.closest('.film-x')) close(); });
    vid.addEventListener('timeupdate', function(){
      if (!vid.duration) return;
      var pc = vid.currentTime / vid.duration * 100;
      [25, 50, 75].forEach(function(m){ if (pc >= m && !marks[m]) { marks[m] = 1; dl.push({ event: 'film_' + m, film: key }); } });
    });
    vid.addEventListener('ended', function(){ if (!marks.end) { marks.end = 1; dl.push({ event: 'film_complete', film: key }); } });
  }
  // Any other film: data-film-open="<key>" data-film-src="assets/films/x.mp4" data-film-title="…" (watch.html)
  function open(k, el){
    var f = FILMS[k];
    if (!f && el && el.dataset.filmSrc) f = { title: el.dataset.filmTitle || 'Bunya', hd: el.dataset.filmSrc, sd: el.dataset.filmSrc, poster: el.dataset.filmPoster || '', len: el.dataset.filmLen || '' };
    if (!f) return;
    if (!box) build();
    key = k; marks = {}; last = document.activeElement;
    box.querySelector('[role=dialog]').setAttribute('aria-label', f.title + (f.len ? ', ' + f.len : ', a 60-second film'));
    vid.poster = f.poster; vid.src = matchMedia('(max-width: 900px)').matches ? f.sd : f.hd;
    box.hidden = false; document.documentElement.classList.add('film-lock');
    [].forEach.call(loops, function(v){ v.pause(); });
    var p = vid.play(); if (p && p.catch) p.catch(function(){});
    box.querySelector('.film-x').focus({ preventScroll: true });
    dl.push({ event: 'film_play', film: k });
  }
  function close(){
    if (!box || box.hidden) return;
    vid.pause(); box.hidden = true; document.documentElement.classList.remove('film-lock');
    if (last && last.focus) last.focus({ preventScroll: true });
  }
  document.addEventListener('click', function(e){ var b = e.target.closest('[data-film-open]'); if (b) { e.preventDefault(); open(b.dataset.filmOpen, b); } });
  addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
})();
