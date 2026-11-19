/* Bunya Shape (bunya-shape.html), Dana 19 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-shape.css
   (+ the app frame, rows and pills from css/dana-rp.css). The film's story, large and in Bunya colours:
   someone asks in plain English for a new field, Shape adds it to the client form as a draft, it's approved, and it's live. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('sh-hidden'); }
  var ASK = 'Add the client’s preferred contact time to the client form';
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  function field(label, val) { return '<label class="sh-f"><span>' + label + '</span><em>' + val + '</em></label>'; }
  var scene = document.createElement('div');
  scene.className = 'sh-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: Bunya Shape. Someone asks, in plain English, to add the client’s preferred contact time to the client form. Shape adds the field as a draft, it is approved, and it goes live for the team.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 2 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><span class="rf-crumb">Bunya Shape</span><h4>Change it yourself</h4><span class="rf-sub">Ask in plain English. Nothing goes live until you approve it.</span>' +
    '<div class="sh-grid"><div class="rf-card sh-form"><div class="rf-ch"><b>Client details</b><small>Your client form</small></div>' +
      field('Full name', 'Priya Shah') + field('Email', 'priya@example.com') +
      '<label class="sh-f sh-new"><span>Preferred contact time <b class="sh-badge" data-badge>Draft</b></span><em>Mornings, before 10am <i>▾</i></em></label>' +
      field('Date of birth', '14 March 1968') + '</div>' +
    '<div class="sh-side"><div class="rf-card sh-ask"><div class="rf-ch"><b>Ask Bunya Shape</b><small>In plain English</small></div>' +
      '<div class="sh-input"><span data-type></span><i class="sh-caret"></i><span class="sh-send">→</span></div>' +
      '<div class="sh-reply"><span class="cr-av"></span><span><b>Bunya Shape</b>Here’s the change on your form. Nothing goes live until you approve it.</span></div>' +
      '<div class="sh-acts"><span class="sh-ok" data-ok>Approve <i>→</i></span><span class="sh-chg">Change it</span></div></div>' +
      '<div class="rf-card sh-lib"><div class="rf-ch"><b>Community library</b><small>Shared by other practices</small></div>' +
        '<div class="rf-row"><span class="rf-av c1">FF</span><span class="rf-nm"><b>Aged care fact find</b><small>Used by 41 practices</small></span><span class="rf-pill soft">Form</span></div>' +
        '<div class="rf-row"><span class="rf-av c2">RP</span><span class="rf-nm"><b>Referral partner report</b><small>Used by 28 practices</small></span><span class="rf-pill soft">Report</span></div></div>' +
    '</div></div></div></div>' +
    '<div class="rf-toast sh-toast" aria-hidden="true"><span class="rf-ol"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><small>Approved by Alex · now</small><b>Live for your whole team</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Bunya Shape · Client form';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  var typed = scene.querySelector('[data-type]'), badge = scene.querySelector('[data-badge]'), ok = scene.querySelector('[data-ok]');
  var st = -1, tm = null, tt = null, playing = !reduce, vis = false;
  /* 0 empty · 1 typing · 2 sent + reply + draft field · 3 approving · 4 live */
  function paint(s) {
    st = s; scene.dataset.s = s;
    clearInterval(tt);
    if (s === 1 && !reduce) {
      var i = 0; typed.textContent = '';
      tt = setInterval(function () { i++; typed.textContent = ASK.slice(0, i); if (i >= ASK.length) clearInterval(tt); }, 38);
    } else typed.textContent = s === 0 ? '' : ASK;
    badge.textContent = s >= 4 ? 'Live' : 'Draft';
    ok.innerHTML = s >= 4 ? '✓ Approved' : 'Approve <i>→</i>';
  }
  function tick() {
    clearTimeout(tm); if (!playing || !vis) return;
    paint(st >= 4 ? 0 : st + 1);
    tm = setTimeout(tick, [1200, 3200, 3000, 1400, 4400][st]);
  }
  var pb = scene.querySelector('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else { clearTimeout(tm); clearInterval(tt); } });
  if (reduce) { paint(4); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 900); else { clearTimeout(tm); } }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();
