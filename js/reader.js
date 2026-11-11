/* Document reader (10 Nov 2026, Lee: "click it and it opens … like a catalogue reader where you can flick through the pages").
   Opens Aynub Financial's demonstration documents (a fictional practice, every page as approved) as a flip-through book.
   A4 documents show as two-page spreads with a page turn on wide screens, one page at a time on phones; slide decks and the
   email show one page at a time. Pages are images in assets/aynub/docs/<doc>/<n>.webp (captured 11 Nov 2026 from Dana's updated set, real platform and fund names taken out, plus the Value of Advice Statement).
   Open it from any element with data-reader="<doc>" (and optional data-page="<n>"). Keys: arrows, Home/End, Esc. Swipe on touch. */
(function(){
  'use strict';
  var DOCS = {
    soa:         { t: 'SOA walkthrough', k: 'a4', n: 21 },
    proposal:    { t: 'Advice proposal', k: 'a4', n: 11 },
    welcome:     { t: 'Welcome pack', k: 'a4', n: 21 },
    annual:      { t: 'Annual review', k: 'deck', n: 18 },
    portfolio:   { t: 'Portfolio review', k: 'deck', n: 12 },
    sustainable: { t: 'Sustainable portfolio review', k: 'deck', n: 13 },
    value:       { t: 'Value of Advice statement', k: 'a4', n: 24 },
    email:       { t: 'Strategy email', k: 'email', n: 1 }
  };
  var ROOT = 'assets/aynub/docs/';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wide = matchMedia('(min-width: 900px)');
  var el, book, L, R, bar, count, range, prevB, nextB, doc, key, views = [], vi = 0, busy = false, lastFocus = null;
  var src = function(n){ return ROOT + key + '/' + n + '.webp'; };
  var ico = function(d){ return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>'; };

  function build(){
    el = document.createElement('div');
    el.className = 'rd'; el.hidden = true;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'rd-t');
    el.innerHTML =
      '<div class="rd-top"><div class="rd-tt"><b id="rd-t"></b><small>Aynub Financial · fictional example</small></div>' +
        '<span class="rd-count" id="rd-count" aria-live="polite"></span>' +
        '<button type="button" class="rd-x" aria-label="Close">' + ico('M6 6l12 12M18 6L6 18') + '</button></div>' +
      '<div class="rd-stage"><button type="button" class="rd-nav prev" aria-label="Previous page">' + ico('M15 5l-7 7 7 7') + '</button>' +
        '<div class="rd-book"><div class="rd-pg l"><img alt=""></div><div class="rd-pg r"><img alt=""></div></div>' +
        '<button type="button" class="rd-nav next" aria-label="Next page">' + ico('M9 5l7 7-7 7') + '</button></div>' +
      '<div class="rd-foot"><input type="range" min="0" value="0" aria-label="Go to page"><p>Aynub Financial is a fictional practice created to demonstrate our documents. It holds no ABN or AFSL, and nothing here is financial advice.</p></div>';
    document.body.appendChild(el);
    book = el.querySelector('.rd-book'); L = el.querySelector('.rd-pg.l'); R = el.querySelector('.rd-pg.r');
    count = el.querySelector('#rd-count'); range = el.querySelector('input'); prevB = el.querySelector('.prev'); nextB = el.querySelector('.next');
    el.querySelector('.rd-x').addEventListener('click', close);
    prevB.addEventListener('click', function(){ go(vi - 1); });
    nextB.addEventListener('click', function(){ go(vi + 1); });
    range.addEventListener('input', function(){ go(+range.value, true); });
    el.addEventListener('click', function(e){ if (e.target === el || e.target.classList.contains('rd-stage')) close(); });
    el.addEventListener('keydown', function(e){
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(vi + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(vi - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0, true); }
      else if (e.key === 'End') { e.preventDefault(); go(views.length - 1, true); }
      else if (e.key === 'Tab') { /* keep focus inside */
        var f = [].slice.call(el.querySelectorAll('button:not([disabled]),input')); var i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    var x0 = null;
    book.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; }, { passive: true });
    book.addEventListener('touchend', function(e){ if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) go(vi + (dx < 0 ? 1 : -1)); });
    wide.addEventListener ? wide.addEventListener('change', relayout) : wide.addListener(relayout);
  }

  function spreads(){ return doc.k === 'a4' && wide.matches; }
  function makeViews(){
    views = [];
    if (spreads()) { views.push([null, 1]); for (var p = 2; p <= doc.n; p += 2) views.push([p, p + 1 <= doc.n ? p + 1 : null]); }
    else for (var q = 1; q <= doc.n; q++) views.push([q]);
  }
  function viewOf(page){ for (var i = 0; i < views.length; i++) if (views[i].indexOf(page) > -1) return i; return 0; }
  function setPg(pg, n){
    var im = pg.querySelector('img');
    pg.classList.toggle('blank', !n);
    if (n) { im.src = src(n); im.alt = doc.t + ', page ' + n + ' of ' + doc.n; } else { im.removeAttribute('src'); im.alt = ''; }
  }
  function label(){
    var v = views[vi].filter(Boolean);
    count.textContent = (doc.k === 'deck' ? 'Slide ' : 'Page ') + v.join('–') + ' of ' + doc.n;
    prevB.disabled = vi === 0; nextB.disabled = vi === views.length - 1;
    range.max = views.length - 1; range.value = vi; range.hidden = views.length < 2;
    [vi - 1, vi + 1, vi + 2].forEach(function(j){ if (views[j]) views[j].forEach(function(n){ if (n) { var i = new Image(); i.src = src(n); } }); });
  }
  function paint(){
    var v = views[vi];
    if (spreads()) { setPg(L, v[0]); setPg(R, v[1]); } else { setPg(L, null); setPg(R, v[0]); }
    label();
  }

  function go(to, jump){
    if (busy || !views[to] || to === vi) return;
    var from = vi, fwd = to > from; vi = to;
    if (reduce || jump) { paint(); return; }
    if (!spreads()) { /* one page at a time: a quick slide */
      book.classList.remove('in-l', 'in-r'); void book.offsetWidth; paint(); book.classList.add(fwd ? 'in-r' : 'in-l'); return;
    }
    /* A page turn: the leaf carries the old page on its front and the new one on its back. */
    busy = true;
    var a = views[from], b = views[to], leaf = document.createElement('div');
    leaf.className = 'rd-leaf ' + (fwd ? 'fw' : 'bk');
    leaf.innerHTML = '<div class="f"><img alt=""></div><div class="b"><img alt=""></div>';
    var front = fwd ? a[1] : a[0], back = fwd ? b[0] : b[1];
    if (front) leaf.querySelector('.f img').src = src(front); else leaf.querySelector('.f').classList.add('blank');
    if (back) leaf.querySelector('.b img').src = src(back); else leaf.querySelector('.b').classList.add('blank');
    if (fwd) setPg(R, b[1]); else setPg(L, b[0]);
    book.appendChild(leaf); void leaf.offsetWidth; leaf.classList.add('go');
    var done = function(){ if (!leaf.parentNode) return; paint(); leaf.remove(); busy = false; };
    leaf.addEventListener('transitionend', done); setTimeout(done, 900);
    label();
  }

  function relayout(){ if (!doc || el.hidden) return; var page = (views[vi] || []).filter(Boolean)[0] || 1; makeViews(); vi = viewOf(page); setup(); paint(); }
  function setup(){
    var ar = doc.k === 'deck' ? 1552 / 873 : doc.k === 'email' ? null : (spreads() ? 2 : 1) * 794 / 1123;
    ['a4', 'deck', 'email', 'spread', 'single'].forEach(function(c){ el.classList.remove(c); });
    el.classList.add(doc.k, spreads() ? 'spread' : 'single');
    if (ar) book.style.setProperty('--ar', ar);
  }
  function open(k, page){
    if (!DOCS[k]) return;
    if (!el) build();
    key = k; doc = DOCS[k]; lastFocus = document.activeElement;
    el.querySelector('#rd-t').textContent = doc.t;
    makeViews(); vi = viewOf(page || 1); setup(); paint();
    el.hidden = false; document.documentElement.classList.add('rd-open');
    void el.offsetWidth; el.classList.add('on');
    el.querySelector('.rd-x').focus();
  }
  function close(){
    if (!el || el.hidden) return;
    el.classList.remove('on'); document.documentElement.classList.remove('rd-open');
    setTimeout(function(){ el.hidden = true; }, reduce ? 0 : 250);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-reader]'); if (!t) return;
    e.preventDefault(); open(t.dataset.reader, +t.dataset.page || 1);
  });
  window.bunyaReader = { open: open, close: close, DOCS: DOCS };
})();
