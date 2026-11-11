/* Command Centre, rebuilt (6 Nov 2026): reveal-on-scroll, the hero screen growing as you scroll,
   the Apple-style product bar, the highlights carousel and the approval steps. */
(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fade things up as they come into view
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
  [].forEach.call(document.querySelectorAll('.cx-rv, #steps'), function(el){ io.observe(el); });

  // Hero screen: grows from 90% to full size over the first part of the scroll
  var shot = $('shot'), sub = $('sub'), ctas = $('hero-ctas'), ticking = false;
  function onScroll(){
    if (ticking) return; ticking = true;
    requestAnimationFrame(function(){
      ticking = false;
      if (!reduce && shot) {
        var r = shot.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * .9)));
        shot.style.setProperty('--cx-s', (0.9 + 0.1 * p).toFixed(4));
      }
      var show = ctas.getBoundingClientRect().bottom < 60;
      sub.classList.toggle('on', show);
      sub.setAttribute('aria-hidden', String(!show));
      sub.querySelector('a').tabIndex = show ? 0 : -1;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  // Highlights carousel: arrows, dots, and the dot that matches the card in view
  var rail = $('rail'), cards = [].slice.call(rail.children), dots = $('hl-dots'), prev = $('hl-prev'), next = $('hl-next'), cur = 0;
  dots.innerHTML = cards.map(function(_, i){ return '<button type="button" aria-label="Highlight ' + (i + 1) + '"></button>'; }).join('');
  function go(i){
    i = Math.max(0, Math.min(cards.length - 1, i));
    rail.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
  }
  function sync(){
    var x = rail.scrollLeft, best = 0, d = Infinity;
    cards.forEach(function(c, i){ var dd = Math.abs(c.offsetLeft - cards[0].offsetLeft - x); if (dd < d) { d = dd; best = i; } });
    if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4) best = cards.length - 1;
    cur = best;
    [].forEach.call(dots.children, function(b, i){ b.classList.toggle('on', i === cur); b.setAttribute('aria-current', i === cur ? 'true' : 'false'); });
    prev.disabled = cur === 0; next.disabled = cur === cards.length - 1;
  }
  rail.addEventListener('scroll', function(){ requestAnimationFrame(sync); }, { passive: true });
  prev.addEventListener('click', function(){ go(cur - 1); });
  next.addEventListener('click', function(){ go(cur + 1); });
  dots.addEventListener('click', function(e){ var b = e.target.closest('button'); if (b) go([].indexOf.call(dots.children, b)); });
  rail.addEventListener('keydown', function(e){ if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
  sync();
})();
