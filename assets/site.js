const tabs = [...document.querySelectorAll('[role="tab"]')];
const video = document.querySelector('video');
const playback = document.querySelector('.playback');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = false;

function updatePlayback() {
  playback.dataset.paused = String(video.paused);
  playback.setAttribute('aria-label', video.paused ? 'Play preview' : 'Pause preview');
}

function syncVideo() {
  const active = document.querySelector('#tab-mirrorly').getAttribute('aria-selected') === 'true';
  if (!active || document.hidden || motion.matches || userPaused) video.pause();
  else video.play().catch(updatePlayback);
  updatePlayback();
}

function selectApp(app, focus = false) {
  for (const tab of tabs) {
    const selected = tab.dataset.app === app;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    if (selected && focus) tab.focus();
  }
  syncVideo();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectApp(tab.dataset.app));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectApp(tabs[next].dataset.app, true);
  });
});

playback.hidden = false;
playback.addEventListener('click', () => {
  if (video.paused) {
    userPaused = false;
    video.play().catch(updatePlayback);
  } else {
    userPaused = true;
    video.pause();
  }
});
video.addEventListener('play', updatePlayback);
video.addEventListener('pause', updatePlayback);
motion.addEventListener('change', syncVideo);
document.addEventListener('visibilitychange', syncVideo);
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
    copyStatus.textContent = 'Select and copy the email address';
  }
  copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 3500);
});
