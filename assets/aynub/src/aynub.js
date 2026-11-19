/* Shared by the Aynub document sources (Dana, 19 Nov 2026). Adds the running head and page foot to every .pg with a
   data-crumb="NN|Title", using <body data-foot="Document name" data-total="24">, then sets every number in the text
   in IBM Plex (span.n). Pages without data-crumb (covers, back pages) are left as written. */
(function () {
  var b = document.body, foot = b.dataset.foot || '', total = b.dataset.total || document.querySelectorAll('.pg').length;
  document.querySelectorAll('.pg[data-crumb]').forEach(function (p) {
    var c = p.dataset.crumb.split('|'), n = +p.dataset.n, f = p.dataset.foot || foot;
    p.insertAdjacentHTML('afterbegin', '<div class="ph"><img src="../aynub-lockup-financial-on-light.png" alt=""><div class="crumb">' + (b.dataset.pre ? '<i>' + b.dataset.pre + '</i>' : '') + '<span><em>' + c[0] + '</em>' + c[1] + '</span></div></div>');
    p.insertAdjacentHTML('beforeend', '<div class="pf"><span>' + f + '</span><span>Fictional client example · For demonstration purposes only</span><span class="pn">' + String(n).padStart(2, '0') + '<small>of</small>' + total + '</span></div>');
  });
  var skip = /\b(n|nb|big|v|bv|pn|of|nonum)\b/, w = document.createTreeWalker(b, NodeFilter.SHOW_TEXT), t, list = [];
  while ((t = w.nextNode())) if (/\d/.test(t.data)) list.push(t);
  list.forEach(function (t) {
    for (var e = t.parentNode; e && e !== b; e = e.parentNode) if ((e.classList && skip.test(e.className)) || e.tagName === 'SCRIPT' || e.namespaceURI === 'http://www.w3.org/2000/svg') return;
    var s = document.createElement('span');
    s.innerHTML = t.data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/(\$?\d[\d,.]*%?)/g, '<span class="n">$1</span>');
    t.replaceWith.apply(t, [].slice.call(s.childNodes));
  });
})();
