/* Command Centre, take 2 (6 Nov 2026): reveal on scroll, the approval steps lighting up,
   and the section bar showing which part of the page you're in. */
(function(){
  'use strict';
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: .15 });
  [].forEach.call(document.querySelectorAll('.t-rv, #steps'), function(el){ io.observe(el); });

  // Section bar: highlight the section in view
  var links = [].slice.call(document.querySelectorAll('.t-bar nav a'));
  var secs = links.map(function(a){ return document.querySelector(a.getAttribute('href')); });
  var ticking = false;
  function spy(){
    ticking = false;
    var line = 140, cur = -1;
    secs.forEach(function(s, i){ if (s && s.getBoundingClientRect().top <= line) cur = i; });
    if (cur > -1 && secs[cur].getBoundingClientRect().bottom < line) cur = cur === secs.length - 1 ? cur : -1;
    links.forEach(function(a, i){ a.classList.toggle('on', i === cur); });
  }
  addEventListener('scroll', function(){ if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
  spy();
})();
