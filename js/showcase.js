/* Command Centre showcase (prototype): hero settle, highlights gallery, closer-look zoom,
   add-on switcher, chapter image settle, and the film and workflow dialogs. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function onSeen(el, fn, threshold) {
    if (!('IntersectionObserver' in window)) return fn();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); fn(); } });
    }, { threshold: threshold || .25 });
    io.observe(el);
  }

  // Hero: the devices settle in once the image has loaded.
  var hero = $('.sc-hero'), heroImg = hero && $('figure img', hero);
  if (heroImg) {
    var show = function () { requestAnimationFrame(function () { hero.classList.add('on'); }); };
    heroImg.complete ? show() : heroImg.addEventListener('load', show);
    setTimeout(show, 2500);
  }

  // Chapter images ease from a slight zoom as they arrive.
  $$('.sc-shot').forEach(function (f) { onSeen(f, function () { f.classList.add('in'); }, .2); });

  // Highlights: a snap-scrolling reel. Plays through once when first seen; the dots show progress.
  var reel = $('.sc-reel');
  if (reel) {
    var cards = $$('.sc-card', reel), dots = $$('.sc-dots button'), toggle = $('#sc-reel-play');
    var i = 0, playing = false, t0 = 0, raf = 0, DUR = 5200, ended = false;
    var ICON = { play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
                 pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
                 replay: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg>' };
    function setIcon(k, label) { toggle.innerHTML = ICON[k]; toggle.setAttribute('aria-label', label); }
    function mark(n) {
      cards.forEach(function (c, k) { c.classList.toggle('now', k === n); });
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === n ? 'true' : 'false'); d.style.setProperty('--p', k < n ? 1 : 0); });
    }
    function go(n, smooth) {
      i = n; mark(n);
      var pad = parseFloat(getComputedStyle(reel).scrollPaddingLeft) || 0;
      reel.scrollTo({ left: cards[n].offsetLeft - reel.offsetLeft - pad, behavior: smooth === false || reduce ? 'auto' : 'smooth' });
    }
    function tick(now) {
      if (!playing) return;
      var p = Math.min(1, (now - t0) / DUR);
      dots[i].style.setProperty('--p', p);
      if (p >= 1) {
        if (i === cards.length - 1) { playing = false; ended = true; setIcon('replay', 'Replay highlights'); return; }
        go(i + 1); t0 = now;
      }
      raf = requestAnimationFrame(tick);
    }
    function play() {
      if (ended) { ended = false; go(0); }
      playing = true; t0 = performance.now() - (parseFloat(dots[i].style.getPropertyValue('--p')) || 0) * DUR;
      setIcon('pause', 'Pause highlights'); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
    }
    function pause() { playing = false; cancelAnimationFrame(raf); setIcon('play', 'Play highlights'); }
    toggle.addEventListener('click', function () { playing ? pause() : play(); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { pause(); ended = false; dots[k].style.setProperty('--p', 0); go(k); }); });
    // A swipe or trackpad scroll takes over from autoplay and keeps the dots in step.
    var settle;
    reel.addEventListener('scroll', function () {
      clearTimeout(settle);
      settle = setTimeout(function () {
        var pad = parseFloat(getComputedStyle(reel).scrollPaddingLeft) || 0, best = 0, bd = Infinity;
        cards.forEach(function (c, k) { var dd = Math.abs(c.offsetLeft - reel.offsetLeft - pad - reel.scrollLeft); if (dd < bd) { bd = dd; best = k; } });
        if (best !== i) { pause(); i = best; mark(best); }
      }, 120);
    }, { passive: true });
    ['pointerdown', 'wheel', 'touchstart'].forEach(function (ev) { reel.addEventListener(ev, function (e) { if (ev !== 'wheel' || Math.abs(e.deltaX) > Math.abs(e.deltaY)) pause(); }, { passive: true }); });
    mark(0); setIcon('play', 'Play highlights');
    if (!reduce) onSeen(reel, play, .5);
  }

  // Closer look: each choice cross-fades its screen in, then glides in to the part that matters.
  var screen = $('.sc-screen');
  if (screen) {
    var picks = $$('.sc-pick'), imgs = $$('img', screen), zoomT;
    function focus(img, on) {
      var f = (img.dataset.focus || '.5 .5 1').split(' ').map(Number), s = on ? f[2] : 1;
      var tx = Math.max((1 - s) * 100, Math.min(0, (.5 - f[0] * s) * 100));
      var ty = Math.max((1 - s) * 100, Math.min(0, (.5 - f[1] * s) * 100));
      img.style.transform = s === 1 ? 'none' : 'translate(' + tx + '%,' + ty + '%) scale(' + s + ')';
    }
    function choose(k) {
      clearTimeout(zoomT);
      picks.forEach(function (p, j) { p.setAttribute('aria-pressed', j === k ? 'true' : 'false'); });
      imgs.forEach(function (im, j) { if (j !== k) { im.classList.remove('on'); setTimeout(function () { if (!im.classList.contains('on')) focus(im, false); }, 500); } });
      var im = imgs[k]; im.classList.add('on');
      zoomT = setTimeout(function () { focus(im, true); }, reduce ? 0 : 650);
    }
    picks.forEach(function (p, k) { p.addEventListener('click', function () { if (p.getAttribute('aria-pressed') !== 'true') choose(k); }); });
    imgs.forEach(function (im) { focus(im, false); });
    imgs[0].classList.add('on');
    onSeen(screen, function () { zoomT = setTimeout(function () { focus(imgs[0], true); }, reduce ? 0 : 500); }, .5);
  }

  // Add-ons: a segmented control swaps the stage image and its caption.
  var seg = $('.sc-seg');
  if (seg) {
    var tabs = $$('[role="tab"]', seg), figs = $$('.sc-stage figure'), caps = $$('.sc-captions p');
    function pick(k, f) {
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === k ? 'true' : 'false'); t.tabIndex = j === k ? 0 : -1; });
      figs.forEach(function (x, j) { x.classList.toggle('on', j === k); });
      caps.forEach(function (x, j) { x.classList.toggle('on', j === k); x.hidden = j !== k; });
      if (f) tabs[k].focus();
    }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { pick(k); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); pick((k + d + tabs.length) % tabs.length, true); }
      });
    });
  }

  // Dialogs: the film and the workflow sheet. The film plays when opened and stops when closed.
  $$('[data-open]').forEach(function (b) {
    var dlg = document.getElementById(b.dataset.open);
    if (!dlg || !dlg.showModal) return;
    b.addEventListener('click', function () {
      dlg.showModal(); document.documentElement.classList.add('sc-open');
      var v = $('video', dlg); if (v) { v.currentTime = 0; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    });
  });
  $$('.sc-dialog').forEach(function (dlg) {
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('sc-open');
      var v = $('video', dlg); if (v) v.pause();
    });
    $('.sc-x', dlg).addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('inner')) dlg.close(); });
  });
})();
