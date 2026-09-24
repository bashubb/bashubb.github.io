const video = document.querySelector('video');
const playback = document.querySelector('.playback');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = false;
let manuallyStarted = false;
let inView = false;

function updatePlayback() {
  playback.dataset.paused = String(video.paused);
  playback.setAttribute('aria-label', video.paused ? 'Play preview' : 'Pause preview');
}

function syncVideo() {
  if (!inView || document.hidden || userPaused || (motion.matches && !manuallyStarted)) {
    video.pause();
  } else {
    video.play().catch(updatePlayback);
  }
  updatePlayback();
}

playback.hidden = false;
playback.addEventListener('click', () => {
  if (video.paused) {
    userPaused = false;
    manuallyStarted = true;
    video.play().catch(updatePlayback);
  } else {
    userPaused = true;
    video.pause();
  }
});
video.addEventListener('play', updatePlayback);
video.addEventListener('pause', updatePlayback);
motion.addEventListener('change', () => {
  manuallyStarted = false;
  syncVideo();
});
document.addEventListener('visibilitychange', syncVideo);
new IntersectionObserver(entries => {
  inView = entries[0].isIntersecting;
  syncVideo();
}, { threshold: 0.1 }).observe(video);
syncVideo();

const emailButton = document.querySelector('.email-copy');
const copyStatus = document.querySelector('.copy-status');
let copyTimer;
emailButton.addEventListener('click', async () => {
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText('bashubb.dev@gmail.com');
    copyStatus.textContent = 'Email copied';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('.email-address'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = 'Select and copy the address';
  }
  copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 3500);
});
