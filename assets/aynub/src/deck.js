/* Aynub landscape decks: adds the foot to every .slide without data-nofoot, using <body data-foot="…" data-total="13">,
   then sets every number in the text in IBM Plex (span.n). Dana, 19 Nov 2026. */
(function () {
  var b = document.body, total = b.dataset.total;
  document.querySelectorAll('.slide:not([data-nofoot])').forEach(function (s) {
    s.insertAdjacentHTML('beforeend', '<div class="foot"><img src="../aynub-lockup-financial-on-light.png" alt=""><b>' + b.dataset.foot + '</b><span>Fictional client example · For demonstration purposes only</span><span class="pgn">' + String(s.dataset.n).padStart(2, '0') + '<small>of</small>' + total + '</span></div>');
  });
  var skip = /\b(n|nb|big|num|pgn|nonum)\b/, w = document.createTreeWalker(b, NodeFilter.SHOW_TEXT), t, list = [];
  while ((t = w.nextNode())) if (/\d/.test(t.data)) list.push(t);
  list.forEach(function (t) {
    for (var e = t.parentNode; e && e !== b; e = e.parentNode) if ((e.classList && skip.test(e.className)) || e.tagName === 'SCRIPT' || e.namespaceURI === 'http://www.w3.org/2000/svg' || e.tagName === 'TD') return;
    var s = document.createElement('span');
    s.innerHTML = t.data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/([+~]?\$?\d[\d,.]*%?)/g, '<span class="n">$1</span>');
    t.replaceWith.apply(t, [].slice.call(s.childNodes));
  });
})();
