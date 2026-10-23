(() => {
  const video = document.querySelector('.hero-drone-video');
  const button = document.querySelector('.hero-video-toggle');
  if (!video || !button) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => {
    button.textContent = video.paused ? 'Play video' : 'Pause video';
    button.setAttribute('aria-label', video.paused ? 'Play background video' : 'Pause background video');
  };
  const play = () => {
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    video.muted = true;
    video.play().catch(update);
  };
  button.hidden = false;
  button.addEventListener('click', () => video.paused ? play() : video.pause());
  video.addEventListener('play', update);
  video.addEventListener('pause', update);
  video.addEventListener('error', () => { video.hidden = true; button.hidden = true; });
  reduced.addEventListener('change', () => { if (reduced.matches) video.pause(); });
  if (!reduced.matches && !navigator.connection?.saveData) play();
})();
