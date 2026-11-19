/* Bunya Voice (bunya-voice.html), Dana 20 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-vo.css
   (+ the app frame, rows, pills and toast from css/dana-rp.css). Lee's still becomes a live screen that fills its card:
   the Harper Family ring on Teams with their record already on screen, Alex answers, the call is recorded with consent,
   and when it ends the note lands on their file. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var still = shot.querySelector(':scope > img');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
  var PHONE = '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    CAL = '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', MSG = '<path d="M4 5h16v11H8l-4 4z"/>',
    TICK = '<path d="M6 12.5l4 4 8-9"/>', SHIELD = '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2 2 4-4"/>';
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>',
    PHONE, CAL, '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var bars = ''; for (var i = 0; i < 30; i++) { var h = 24 + Math.round(70 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * .41))); bars += '<i style="height:' + h + '%;animation-delay:' + (-(i % 6) * .14) + 's"></i>'; }
  var scene = document.createElement('div');
  scene.className = 'vo-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: the Harper Family call the firm on Microsoft Teams and their client record is already on screen. The adviser answers, the call is recorded with consent, and when it ends a note of the call is added to their file.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 1 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><span class="rf-crumb">Clients · Harper Family</span><h4>Harper Family</h4><span class="rf-sub vo-live"><i></i><span data-sub>Calling now on Teams</span></span>' +
    '<div class="vo-grid"><div class="vo-rec">' +
      '<div class="vo-stats"><div class="rf-card vo-st"><span class="vo-ic">' + svg(CAL) + '</span><span><small>Next review</small><b>Review due in March</b></span></div>' +
        '<div class="rf-card vo-st"><span class="rf-av c3 vo-av">AR</span><span><small>Adviser</small><b>Alex Reid</b></span></div>' +
        '<div class="rf-card vo-st"><span class="vo-ic">' + svg(MSG) + '</span><span><small>Last contact</small><b data-last>Call with Alex · 12 Sep</b></span></div></div>' +
      '<div class="rf-card vo-calls"><div class="rf-ch"><b>Calls</b><small>Recorded with consent</small></div>' +
        '<div class="rf-row vo-call vo-today"><span class="vo-ci">' + svg(PHONE) + '</span><span class="rf-nm"><b data-tt>Today’s call</b><small data-ts>Call notes go here after the call</small><span class="vo-note">Called to confirm the March review. Alex to send the agenda the week before.</span></span><span class="rf-pill soft" data-tp>Live</span></div>' +
        '<div class="rf-row vo-call"><span class="vo-ci">' + svg(PHONE) + '</span><span class="rf-nm"><b>Call with Alex · 18 minutes · 12 Sep</b><small>Noted on their file · recorded with consent</small><span class="vo-note on">Asked about adding to super before 30 June. Alex to send the contribution limits.</span></span><span class="rf-pill ok">Notes</span></div>' +
        '<div class="rf-row vo-call"><span class="vo-ci">' + svg(PHONE) + '</span><span class="rf-nm"><b>Call with Sarah · 4 minutes · 21 Aug</b><small>Noted on their file · recorded with consent</small></span><span class="rf-pill ok">Notes</span></div></div></div>' +
    '<div class="vo-phone"><div class="vo-ph"><span class="vo-teams">T</span><span>Teams</span><em data-ph>Incoming call</em></div>' +
      '<div class="vo-who"><span class="vo-ring"><i></i><i></i><b><img src="assets/voice/vo-harper.jpg" alt=""></b></span><b>Harper Family</b><small data-ps>Matched to their client record</small></div>' +
      '<div class="vo-time" data-t>0:00</div><div class="vo-wave">' + bars + '</div>' +
      '<span class="vo-consent">' + svg(SHIELD) + 'Recording with consent</span>' +
      '<div class="vo-btns"><span class="vo-no">' + svg(PHONE) + '<span>Decline</span></span><span class="vo-yes">' + svg(PHONE) + '<span data-yes>Answer</span></span></div></div></div></div></div>' +
    '<div class="rf-toast vo-toast" aria-hidden="true"><span class="rf-ol">' + svg(TICK) + '</span><span><small>Bunya Voice · now</small><b>Call noted on the Harper Family file</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  if (still) still.classList.add('vo-hidden');
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Bunya Voice · Harper Family';

  function q(s) { return scene.querySelector(s); }
  var tEl = q('[data-t]'), secs = 0, clock = null;
  function fmt(n) { return Math.floor(n / 60) + ':' + ('0' + n % 60).slice(-2); }
  var st = -1, tm = null, playing = !reduce, vis = false;
  /* 0 ringing · 1 answered, recording · 2 still talking · 3 call ended, noting · 4 noted on the file */
  function paint(s) {
    st = s; scene.dataset.s = s;
    clearInterval(clock);
    if (s === 0) { secs = 0; tEl.textContent = '0:00'; }
    if ((s === 1 || s === 2) && !reduce) clock = setInterval(function () { secs += 40; tEl.textContent = fmt(secs); }, 400);
    if (s >= 3) { secs = Math.max(secs, 372); tEl.textContent = fmt(secs); }
    q('[data-sub]').textContent = s === 0 ? 'Calling now on Teams' : s < 3 ? 'On a call with Alex · recording with consent' : 'Call ended · noted on their file';
    q('[data-ph]').textContent = s === 0 ? 'Incoming call' : s < 3 ? 'On call' : 'Call ended';
    q('[data-yes]').textContent = s === 0 ? 'Answer' : s < 3 ? 'On call' : 'Ended';
    q('[data-tt]').textContent = s < 3 ? 'Today’s call' : 'Call with Alex · 6 minutes · today';
    q('[data-ts]').textContent = s === 0 ? 'Call notes go here after the call' : s < 3 ? 'Recording with consent' : s === 3 ? 'Noting the call…' : 'Noted on their file · recorded with consent';
    var tp = q('[data-tp]'); tp.className = 'rf-pill ' + (s >= 4 ? 'ok' : 'soft'); tp.textContent = s >= 4 ? 'Notes' : s >= 3 ? 'Noting' : 'Live';
    q('[data-last]').textContent = s >= 4 ? 'Call with Alex · today' : 'Call with Alex · 12 Sep';
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 4 ? 0 : st + 1); tm = setTimeout(tick, st === 4 ? 4400 : st === 0 ? 2400 : st === 3 ? 1500 : 1800); }
  var pb = q('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else { clearTimeout(tm); clearInterval(clock); } });
  if (reduce) { paint(4); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 2400); else { clearTimeout(tm); clearInterval(clock); } }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();
