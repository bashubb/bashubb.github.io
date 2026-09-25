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
