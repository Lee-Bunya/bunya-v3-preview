/* index-new.html only (10 Nov 2026). Runs after hb.js, which still draws the Command Centre panel,
   the apps rail, the product sheets and the sentence that lights up. This file adds:
   the household story (sticky screen), the three-layer switcher and the brand colour swatches. */
(function(){
  /* One household: the screen on the left follows the act being read */
  var acts = [].slice.call(document.querySelectorAll('#hn-acts li')),
      shots = [].slice.call(document.querySelectorAll('#hn-frame img'));
  function act(i){
    acts.forEach(function(a, n){ a.classList.toggle('on', n === i); });
    shots.forEach(function(s, n){ s.classList.toggle('on', n === i); });
  }
  if (acts.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) act(acts.indexOf(e.target)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    acts.forEach(function(a){ io.observe(a); });
  }

  /* Three layers: one panel at a time */
  var tabs = [].slice.call(document.querySelectorAll('.hn-tabs [role="tab"]'));
  function pick(i, focus){
    tabs.forEach(function(t, n){
      var on = n === i, p = document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      p.hidden = !on; p.classList.toggle('on', on);
    });
    if (focus) tabs[i].focus();
    dispatchEvent(new Event('resize')); /* lets hb.js re-check the rail arrows once the apps are showing */
  }
  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){ pick(i); });
    t.addEventListener('keydown', function(e){
      if (e.key === 'ArrowRight') pick((i + 1) % tabs.length, true);
      if (e.key === 'ArrowLeft') pick((i + tabs.length - 1) % tabs.length, true);
    });
  });

  /* Make it yours: swatches recolour the drawn portal */
  var portal = document.getElementById('hn-portal'),
      sw = [].slice.call(document.querySelectorAll('.hn-sw button'));
  sw.forEach(function(b){
    b.addEventListener('click', function(){
      sw.forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      portal.style.setProperty('--b', b.dataset.b);
      portal.style.setProperty('--d', b.dataset.d);
    });
  });
})();
