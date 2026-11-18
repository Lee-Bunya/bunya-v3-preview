/* Small UX additions for Pricing and Build your Bunya (Dana, 18 Nov 2026). Styling lives in css/dana-system.css.
   Pricing: a sticky section index built from the section headings, which highlights the section you're reading.
   Build:   tap anywhere on a choice row to select it (not only the small box), and the slider fills to its value.
   It only adds behaviour on top of the page; if it doesn't load, the pages work exactly as before. */
(function () {
  'use strict';

  /* ---- Intro text: each sentence starts on its own line (tablets and up, see css/dana-system.css) ---- */
  [].forEach.call(document.querySelectorAll('.sx-hero > p, .byo-hero > p, .sx-end > p'), function (p) {
    if (p.children.length || p.classList.contains('dana-sents')) return;   // plain text only
    var parts = p.textContent.trim().split(/(?<=[.!?])\s+(?=[A-Z])/);
    if (parts.length < 2) return;
    p.textContent = '';
    parts.forEach(function (s, i) {
      var span = document.createElement('span');
      span.className = 'dana-sent';
      span.textContent = s;
      p.appendChild(span);
      if (i < parts.length - 1) p.appendChild(document.createTextNode(' '));
    });
    p.classList.add('dana-sents');
  });

  /* ---- Pricing: section index ---- */
  var list = document.querySelector('.pr-list');
  var hero = document.querySelector('.pr-hero');
  if (list && hero) {
    var groups = [].slice.call(list.querySelectorAll(':scope > .pr-grp'));
    var nav = document.createElement('nav');
    nav.className = 'dx-jump';
    nav.setAttribute('aria-label', 'Price sections');
    var inner = document.createElement('div');
    inner.className = 'dx-jump-in';
    var links = groups.map(function (g, i) {
      var h = g.querySelector('h2');
      if (!g.id) g.id = 'prices-' + (i + 1);
      var a = document.createElement('a');
      a.href = '#' + g.id;
      var n = document.createElement('span');
      n.textContent = String(i + 1).padStart(2, '0');
      a.appendChild(n);
      a.appendChild(document.createTextNode(h ? h.textContent : ''));
      inner.appendChild(a);
      return a;
    });
    nav.appendChild(inner);
    hero.insertAdjacentElement('afterend', nav);

    // Mark the index once it sticks under the menu
    var stuck = new IntersectionObserver(function (es) {
      nav.classList.toggle('stuck', es[0].intersectionRatio < 1 && es[0].boundingClientRect.top < 70);
    }, { threshold: [1], rootMargin: '-61px 0px 0px 0px' });
    stuck.observe(nav);

    // Highlight the section being read and keep its chip in view
    var current = -1;
    function setOn(i) {
      if (i === current) return;
      current = i;
      links.forEach(function (a, j) { a.classList.toggle('on', j === i); });
      var a = links[i];
      if (a) {
        var l = a.offsetLeft - 16, r = a.offsetLeft + a.offsetWidth + 16;
        if (l < inner.scrollLeft || r > inner.scrollLeft + inner.clientWidth) inner.scrollTo({ left: l, behavior: 'smooth' });
      }
    }
    function spy() {
      var line = 60 + 56 + 80, on = -1;
      groups.forEach(function (g, i) { if (g.getBoundingClientRect().top <= line) on = i; });
      setOn(on);
      // tuck the index away once the price list has scrolled past
      nav.classList.toggle('gone', list.getBoundingClientRect().bottom < line);
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; spy(); }); }
    }, { passive: true });
    spy();
  }

  /* ---- Build: whole-row selecting and the slider fill ---- */
  var steps = document.querySelector('.byo-steps');
  if (steps) {
    steps.addEventListener('click', function (e) {
      if (e.target.closest('a, button, input, label, summary, select, textarea')) return;
      var row = e.target.closest('.pr-row');
      if (!row || !steps.contains(row)) return;
      var tk = row.querySelector('.pr-tk');
      if (tk && !tk.disabled) tk.click();
    });
  }

  var range = document.getElementById('byo-hh');
  if (range) {
    var fill = function () {
      var min = +range.min || 0, max = +range.max || 100;
      range.style.setProperty('--p', ((range.value - min) / (max - min) * 100) + '%');
    };
    range.addEventListener('input', fill);
    // the page's own script also sets the value (size buttons, saved builds): follow it
    document.addEventListener('click', function (e) { if (e.target.closest('.byo-sizes button')) requestAnimationFrame(fill); });
    window.addEventListener('pageshow', fill);
    fill();
    setTimeout(fill, 300);
  }
})();
