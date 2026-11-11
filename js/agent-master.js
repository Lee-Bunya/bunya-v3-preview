/* Master agent page: the scroll story (the step in the middle of the screen picks the picture)
   and the highlights reel's arrows. */
(function () {
  var steps = [].slice.call(document.querySelectorAll('.am-step'));
  var pics = [].slice.call(document.querySelectorAll('.am-pics img'));
  function show(i) {
    steps.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    pics.forEach(function (p, k) { p.classList.toggle('on', k === i); });
  }
  if (steps.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) show(+e.target.dataset.i); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach(function (s) { io.observe(s); });
  }

  var track = document.querySelector('.am-track');
  if (track) {
    var btns = document.querySelectorAll('.am-reel-nav [data-dir]');
    function ends() {
      btns[0].disabled = track.scrollLeft < 8;
      btns[1].disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
    }
    [].forEach.call(btns, function (b) {
      b.addEventListener('click', function () {
        var tile = track.querySelector('.am-tile');
        track.scrollBy({ left: (+b.dataset.dir) * (tile.offsetWidth + 22), behavior: 'smooth' });
      });
    });
    track.addEventListener('scroll', ends, { passive: true });
    addEventListener('resize', ends);
    ends();
  }
})();
