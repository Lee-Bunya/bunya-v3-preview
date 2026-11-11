/* Agents (v3): hub search and stage filter, the "made to work with the core" accordion,
   and on agent pages the before/after toggle plus the panel and flow reveals. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hub: stage chips and a search box narrow the lineup together.
  var cards = $$('.acard'), q = $('#agent-q'), empty = $('#agent-empty'), stage = 'all';
  function apply() {
    var term = (q && q.value || '').trim().toLowerCase(), shown = 0;
    cards.forEach(function (c) {
      var ok = (stage === 'all' || c.dataset.s === stage) && (!term || c.textContent.toLowerCase().indexOf(term) > -1);
      c.hidden = !ok; if (ok) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }
  $$('.chips button').forEach(function (b, _, all) {
    b.addEventListener('click', function () {
      all.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      stage = b.dataset.f; apply();
    });
  });
  if (q) q.addEventListener('input', apply);
  // A stage link in the directory (#stage-engage) opens the lineup on that stage.
  function fromHash() {
    var m = /^#stage-(\w+)$/.exec(location.hash), b = m && $('.chips [data-f="' + m[1] + '"]');
    if (b) { b.click(); var l = $('#lineup'); if (l) l.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }
  }
  addEventListener('hashchange', fromHash); fromHash();

  // Hub: one accordion item open at a time; the picture follows.
  var accBtns = $$('.acc > button'), pics = $$('.together .pic img');
  accBtns.forEach(function (b, k) {
    b.addEventListener('click', function () {
      accBtns.forEach(function (x, j) { x.setAttribute('aria-expanded', j === k ? 'true' : 'false'); });
      pics.forEach(function (p, j) { p.classList.toggle('on', j === k); });
    });
  });

  // Agent page: Today / With the agent.
  var ba = $('#ba'), baTabs = $$('[data-ba]');
  baTabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var w = t.dataset.ba === '1';
      baTabs.forEach(function (x) { x.setAttribute('aria-selected', x === t ? 'true' : 'false'); x.tabIndex = x === t ? 0 : -1; });
      ba.classList.toggle('with', w);
      $$('dd', ba).forEach(function (d, k) {
        d.classList.add('swap');
        setTimeout(function () { d.textContent = w ? d.dataset.b : d.dataset.a; d.classList.remove('swap'); }, reduce ? 0 : 160 + k * 60);
      });
    });
  });

  // Agent page: the output panel fills in and the flow line draws once each is seen.
  var seen = $$('.panel, .flow');
  if (!('IntersectionObserver' in window) || reduce) seen.forEach(function (el) { el.classList.add('in-view'); });
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, { threshold: .35 });
    seen.forEach(function (el) { io.observe(el); });
    setTimeout(function () { seen.forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in-view'); }); }, 600);
  }
})();

/* Hub shelves: arrows step through each row and dim at either end. */
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('.shelf'), function (sh) {
    var row = sh.querySelector('.shelf-row'), btns = sh.querySelectorAll('.shelf-nav [data-dir]');
    if (!row) return;
    function ends() {
      btns[0].disabled = row.scrollLeft < 8;
      btns[1].disabled = row.scrollLeft + row.clientWidth > row.scrollWidth - 8;
    }
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener('click', function () {
        var c = row.querySelector('.scard'); row.scrollBy({ left: (+b.dataset.dir) * (c.offsetWidth + 20) * 2, behavior: 'smooth' });
      });
    });
    row.addEventListener('scroll', ends, { passive: true }); addEventListener('resize', ends); ends();
  });
})();
