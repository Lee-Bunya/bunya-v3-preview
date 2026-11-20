/* Glossary (glossary.html), Dana 20 Nov 2026. Styling: css/dana-gl.css.
   Each letter becomes a deep-teal card (as on FAQ) with its term count and Bunya's rotating rings; the count follows
   the search. */
(function () {
  'use strict';
  var RINGS = '<svg class="gl-rings" viewBox="0 0 800 800" aria-hidden="true"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="9"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="8"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="8"/></g></svg>';
  var secs = document.querySelectorAll('.gl-sec');
  function label(n) { return n + (n === 1 ? ' term' : ' terms'); }
  [].forEach.call(secs, function (s) {
    var side = s.querySelector('.fq-side'); if (!side || side.classList.contains('gl-on')) return;
    side.classList.add('gl-on');
    side.insertAdjacentHTML('afterbegin', RINGS);
    side.insertAdjacentHTML('beforeend', '<span class="gl-count">' + label(s.querySelectorAll('.gl-term').length) + '</span>');
    /* the letter's terms as jump links inside the card */
    var links = [].map.call(s.querySelectorAll('.gl-term'), function (t) { var h = t.querySelector('h3'); return '<a href="#' + t.id + '" data-t="' + t.id + '">' + (h ? h.textContent : t.id) + '</a>'; }).join('');
    side.insertAdjacentHTML('beforeend', '<nav class="gl-jump" aria-label="Terms under ' + (side.querySelector('h2') || {}).textContent + '">' + links + '</nav>');
  });
  var q = document.getElementById('gl-q');
  if (q) q.addEventListener('input', function () {
    [].forEach.call(secs, function (s) {
      var c = s.querySelector('.gl-count'); if (c) c.textContent = label([].filter.call(s.querySelectorAll('.gl-term'), function (t) { return !t.hidden; }).length);
      [].forEach.call(s.querySelectorAll('.gl-jump a'), function (a) { var t = document.getElementById(a.getAttribute('data-t')); a.hidden = !!(t && t.hidden); });
    });
  });
})();

/* Dana (20 Nov 2026): "level up ... a little bit of fun".
   1. Every term gets an acronym badge (SOA, ROA, BID ...), in deepening teals.
   2. The hero has acronyms floating around the headline; click one to jump to it.
   3. "Test yourself": a flip card (acronym on the front, the plain-English meaning on the back), "Surprise me" deals
      another, "Read the full entry" jumps to it. */
(function () {
  'use strict';
  var terms = [].slice.call(document.querySelectorAll('.gl-term'));
  if (!terms.length) return;
  var SKIP = { of: 1, and: 1, the: 1, to: 1, for: 1 };
  function acro(name) {
    var m = name.match(/\(([A-Z]{2,6})\)/); if (m) return m[1];
    if (/^[A-Z]{2,6}$/.test(name.trim())) return name.trim();
    var w = name.split(/\s+/).filter(function (x) { return x && !SKIP[x.toLowerCase()]; });
    if (w.length === 1) return w[0].slice(0, 2);
    return w.slice(0, 3).map(function (x) { return x[0].toUpperCase(); }).join('');
  }
  function clean(name) { return name.replace(/\s*\([A-Z]{2,6}\)\s*$/, ''); }
  var data = terms.map(function (t, i) {
    var h = t.querySelector('h3'), p = t.querySelector('p'), name = h ? h.textContent.trim() : t.id;
    var def = p ? p.textContent.trim() : '', first = (def.match(/^.*?[.!?](\s|$)/) || [def])[0].trim();
    return { el: t, id: t.id, name: name, short: clean(name), ab: acro(name), def: first, i: i, real: /\([A-Z]{2,6}\)/.test(name) || /^[A-Z]{2,6}$/.test(name) || t.id === 'best-interests-duty' };
  });

  /* 1. badges */
  data.forEach(function (d, i) {
    if (d.el.querySelector('.gl-mono')) return;
    d.el.classList.add('gl-has-mono');
    d.el.insertAdjacentHTML('afterbegin', '<span class="gl-mono gl-m' + (i % 4) + (d.ab.length > 3 ? ' sm' : '') + '" aria-hidden="true">' + d.ab + '</span>');
  });

  /* 2. floating acronyms in the hero (wide screens) */
  var hero = document.querySelector('.fq-hero');
  var FLOAT = ['SOA', 'AFSL', 'BID', 'ROA', 'FSG', 'TMD', 'OFA', 'CPD'];
  var POS = [[7, 20], [13, 48], [5, 74], [16, 92], [88, 18], [92, 46], [84, 70], [93, 92]];
  if (hero && !hero.querySelector('.gl-fly')) {
    hero.classList.add('gl-hero');
    var fly = document.createElement('div'); fly.className = 'gl-fly';
    FLOAT.forEach(function (ab, i) {
      var d = data.filter(function (x) { return x.ab === ab || (ab === 'BID' && x.id === 'best-interests-duty'); })[0]; if (!d) return;
      fly.insertAdjacentHTML('beforeend', '<a class="gl-bub gl-b' + (i % 4) + '" href="#' + d.id + '" style="left:' + POS[i][0] + '%;top:' + POS[i][1] + '%;animation-delay:' + (-i * 1.3) + 's" title="' + d.short + '"><b>' + ab + '</b><span>' + d.short + '</span></a>');
    });
    hero.appendChild(fly);
  }

  /* 3. Test yourself */
  var first = document.querySelector('.gl-sec');
  if (first && !document.querySelector('.gl-fun')) {
    var fun = document.createElement('section');
    fun.className = 'gl-fun'; fun.setAttribute('aria-labelledby', 'gl-fun-h');
    fun.innerHTML =
      '<div class="gl-fun-in">' +
        '<div class="gl-fun-copy"><span class="sx-k">Test yourself</span><h2 id="gl-fun-h">Know your acronyms? <span>Flip and find out.</span></h2>' +
          '<p>Thirty-two terms advice firms use every day. Guess what it means, flip the card to check, then deal another.</p>' +
          '<div class="gl-fun-btns"><button type="button" class="gl-flip-b">Flip the card</button><button type="button" class="gl-deal">Surprise me<i aria-hidden="true">↻</i></button></div>' +
          '<span class="gl-score" aria-live="polite"></span></div>' +
        '<div class="gl-card-wrap"><button type="button" class="gl-card" aria-label="Flip the card">' +
          '<span class="gl-face front"><span class="gl-k">What does it stand for?</span><b class="gl-ab"></b><span class="gl-hint">Tap to flip</span></span>' +
          '<span class="gl-face back"><span class="gl-k">The answer</span><b class="gl-nm"></b><span class="gl-df"></span><a class="gl-go" href="#">Read the full entry ›</a></span>' +
        '</button></div>' +
      '</div>';
    first.parentNode.insertBefore(fun, first);
    /* Bunya's rotating rings: in the quiz panel's corner and on the flash card */
    var RG = '<svg class="gl-rings" viewBox="0 0 800 800" aria-hidden="true"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="9"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="8"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="8"/></g></svg>';
    fun.querySelector('.gl-fun-in').insertAdjacentHTML('afterbegin', RG.replace('gl-rings', 'gl-rings gl-r-panel'));
    fun.querySelector('.gl-face.front').insertAdjacentHTML('afterbegin', RG.replace('gl-rings', 'gl-rings gl-r-card'));
    fun.querySelector('.gl-face.back').insertAdjacentHTML('afterbegin', RG.replace('gl-rings', 'gl-rings gl-r-card'));
    var card = fun.querySelector('.gl-card'), ab = fun.querySelector('.gl-ab'), nm = fun.querySelector('.gl-nm'), df = fun.querySelector('.gl-df'), go = fun.querySelector('.gl-go'), score = fun.querySelector('.gl-score');
    var pool = data.filter(function (d) { return d.real; }), cur = -1, seen = 0;
    function fill(d) { ab.textContent = d.ab; nm.textContent = d.short; df.textContent = d.def; go.setAttribute('href', '#' + d.id); }
    function deal(now) {
      var n; do { n = Math.floor(Math.random() * pool.length); } while (pool.length > 1 && n === cur);
      cur = n; var d = pool[n];
      card.classList.remove('flip');
      if (now === true) { fill(d); return; }
      card.classList.add('deal');
      setTimeout(function () { fill(d); card.classList.remove('deal'); }, 220);
      seen++; score.textContent = seen > 1 ? seen + ' cards dealt' : '';
    }
    function flip() { card.classList.toggle('flip'); }
    card.addEventListener('click', function (e) { if (e.target.closest('.gl-go')) return; flip(); });
    fun.querySelector('.gl-flip-b').addEventListener('click', flip);
    fun.querySelector('.gl-deal').addEventListener('click', function () { deal(); });
    go.addEventListener('click', function (e) {
      e.preventDefault(); var t = document.getElementById(go.getAttribute('href').slice(1)); if (!t) return;
      history.replaceState(null, '', '#' + t.id); t.scrollIntoView({ behavior: 'smooth', block: 'center' });
      t.classList.remove('gl-glow'); void t.offsetWidth; t.classList.add('gl-glow');
    });
    deal(true); seen = 0; score.textContent = '';
  }
})();
