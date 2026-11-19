/* How it works (how-it-works.html), Dana 20 Nov 2026. Styling: css/dana-hw.css (+ the Teams call from css/dana-meet.css).
   Chapter 1, the Shah family's discovery meeting: the film showed initials in the Teams tiles. It's replaced by the same
   live call as the Meeting Notes page, with Alex, Priya and Arjun's photos, live captions and Bunya's notes filling in,
   set on the Bunya rings so it sits with the other chapters' films. It shows whenever chapter 1's film would. */
(function () {
  'use strict';
  var frame = document.querySelector('.hw-frame');
  var v0 = frame && frame.querySelector('video[data-i="0"]');
  if (!v0) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* the film is replaced, so don't download it */
  v0.pause(); v0.removeAttribute('autoplay'); v0.preload = 'none'; v0.removeAttribute('src'); v0.load(); v0.classList.add('hw-v0');

  var P = {
    alex: { n: 'Alex Reid', img: 'assets/meeting/alex.jpg' },
    priya: { n: 'Priya Shah', img: 'assets/meeting/priya.jpg' },
    arjun: { n: 'Arjun Shah', img: 'assets/meeting/arjun.jpg' }
  };
  var SCRIPT = [
    ['priya', 'We’d like to <mark>stop work at 60</mark>, and Arjun at <mark>63</mark>.', 0],
    ['arjun', 'And we’re <mark>not sure about keeping the SMSF</mark>.', 1],
    ['alex', 'Let’s <mark>check your cover</mark> before your contract ends.', 2],
    ['alex', 'I’ll ask for your <mark>super statements</mark> today.', 3]
  ];
  var NOTES = [['Their goals', 'Priya to retire at 60, Arjun at 63'], ['Their concerns', 'Whether to keep the SMSF'],
    ['What was agreed', 'Check their cover before Arjun’s contract ends'], ['Next steps', 'Super statements · fact find · strategy meeting']];
  function tile(k) {
    return '<div class="mt-tile" data-p="' + k + '"><img src="' + P[k].img + '" alt="">' +
      '<span class="mt-name"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>' + P[k].n + '</span></div>';
  }
  var live = document.createElement('div');
  live.className = 'hw-live';
  live.setAttribute('aria-hidden', 'true');
  live.innerHTML =
    '<svg class="hw-orbit" viewBox="0 0 800 800"><g class="o1"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="7" fill="#013B43"/><circle class="n" cx="669" cy="131" r="6" fill="#11B8B1"/></g>' +
      '<g class="o2"><circle class="d" cx="400" cy="400" r="318"/></g><g class="o3"><circle class="g" cx="400" cy="400" r="262"/><circle class="n" cx="138" cy="400" r="6.5" fill="#F4B528"/></g><g class="o4"><circle cx="400" cy="400" r="206"/></g></svg>' +
    '<div class="hw-st"><div class="mt-scene">' +
      '<div class="mt-call">' +
        '<div class="mt-top"><span class="mt-t">T</span><b>Discovery · Shah Family</b><span class="mt-rec"><i></i>Recording with consent</span><span class="mt-time">51:59</span><span class="mt-leave">Leave</span></div>' +
        '<div class="mt-grid">' + tile('alex') + tile('priya') + tile('arjun') + '</div>' +
        '<div class="mt-cap"><span class="mt-cap-k">Live captions</span><div class="mt-line mt-prev"><img alt=""><span><b></b><q></q></span></div><div class="mt-line mt-cur"><img alt=""><span><b></b><q></q></span></div></div>' +
      '</div>' +
      '<div class="mt-notes"><div class="mt-nh"><span class="mt-logo"></span><span><b>Noted by Bunya</b><small><i></i>Listening</small></span></div>' +
        '<ol>' + NOTES.map(function (x, i) { return '<li data-i="' + i + '"><span class="k">' + x[0] + '</span><span class="v">' + x[1] + '</span></li>'; }).join('') + '</ol>' +
        '<div class="mt-ready"><span class="mt-chk">✓</span><span><b>File note, email and 3 tasks</b><small>Ready for Alex to check</small></span></div></div>' +
    '</div></div>';
  frame.appendChild(live);
  var st = live.querySelector('.hw-st');
  function fit() { var w = frame.clientWidth, h = frame.clientHeight; if (w) st.style.setProperty("--k", Math.min(w * .92 / 900, h * .9 / Math.max(1, st.offsetHeight))); }
  fit();
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(frame); else addEventListener('resize', fit);

  var tiles = live.querySelectorAll('.mt-tile'), lis = live.querySelectorAll('.mt-notes li');
  var prev = live.querySelector('.mt-prev'), line = live.querySelector('.mt-cur'), lImg = line.querySelector('img'), lName = line.querySelector('b'), lText = line.querySelector('q');
  var ready = live.querySelector('.mt-ready'), status = live.querySelector('.mt-nh small');
  var step = -1, timer = null;
  function show(i) {
    step = i;
    if (i >= SCRIPT.length) { ready.classList.add('on'); status.lastChild.textContent = 'Meeting ended · draft ready'; [].forEach.call(tiles, function (t) { t.classList.remove('talk'); }); return; }
    var s = SCRIPT[i], who = P[s[0]];
    [].forEach.call(tiles, function (t) { t.classList.toggle('talk', t.dataset.p === s[0]); });
    if (i > 0 && lText.innerHTML) { prev.querySelector('img').src = lImg.src; prev.querySelector('b').textContent = lName.textContent; prev.querySelector('q').innerHTML = lText.innerHTML; prev.classList.add('on'); }
    else prev.classList.remove('on');
    line.classList.remove('on'); void line.offsetWidth;
    lImg.src = who.img; lName.textContent = who.n; lText.innerHTML = s[1]; line.classList.add('on');
    [].forEach.call(lis, function (li, k) { li.classList.toggle('on', k <= s[2]); li.classList.toggle('new', k === s[2]); });
    ready.classList.remove('on'); status.lastChild.textContent = 'Listening';
  }
  function reset() { [].forEach.call(lis, function (li) { li.classList.remove('on', 'new'); }); ready.classList.remove('on'); }
  /* phones: the sticky frame is hidden and each chapter has its own small film, so the call moves into chapter 1 */
  var stage = document.querySelector('.co-stage'), li0 = document.querySelector('.co-acts > li[data-i="0"]'), vm = li0 && li0.querySelector('video.m');
  var scene = live.querySelector('.mt-scene'), mob = document.createElement('div'), onPhone = false, phoneSeen = false;
  mob.className = 'hw-mob';
  if (vm) { vm.pause(); vm.removeAttribute('src'); vm.preload = 'none'; vm.load(); vm.classList.add('hw-v0'); vm.parentNode.insertBefore(mob, vm); }
  function place() {
    onPhone = !!stage && getComputedStyle(stage).display === 'none';
    if (onPhone && scene.parentNode !== mob) mob.appendChild(scene);
    if (!onPhone && scene.parentNode !== st) { st.appendChild(scene); fit(); }
  }
  place(); addEventListener('resize', function () { var was2 = onPhone; place(); if (was2 !== onPhone) sync(); });
  if (li0 && 'IntersectionObserver' in window) new IntersectionObserver(function (es) { phoneSeen = es[0].isIntersecting; sync(); }, { threshold: .25 }).observe(li0);
  function active() { return onPhone ? phoneSeen : v0.classList.contains('on'); }
  function tick() {
    clearTimeout(timer);
    if (!active()) return;
    var next = step + 1; if (next > SCRIPT.length) { reset(); next = 0; }
    show(next); timer = setTimeout(tick, next >= SCRIPT.length ? 5200 : 3400);
  }
  if (reduce) { show(SCRIPT.length - 1); show(SCRIPT.length); return; }
  show(0);
  /* play while chapter 1 is showing; Lee's story script marks the active film with .on */
  var was = false;
  function sync() { var a = active(); if (a && !was) { fit(); clearTimeout(timer); timer = setTimeout(tick, 1800); } if (!a) clearTimeout(timer); was = a; }
  if ('MutationObserver' in window) new MutationObserver(sync).observe(v0, { attributes: true, attributeFilter: ['class'] });
  sync();
})();
