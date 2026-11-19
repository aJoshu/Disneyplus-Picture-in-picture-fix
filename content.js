let observer;

function unblock() {
  document.querySelectorAll('video[disablepictureinpicture]').forEach(v => {
    v.disablePictureInPicture = false;
  });
}

function enable() {
  unblock();
  observer?.disconnect();
  observer = new MutationObserver(unblock);
  observer.observe(document.documentElement, {
    childList: true, subtree: true, attributes: true,
    attributeFilter: ['disablepictureinpicture'],
  });
}

function disable() {
  observer?.disconnect();
  observer = null;
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch(e => console.log('Disney-PIP disable broken, reload the page:', e.message));
  }
  document.querySelectorAll('video').forEach(v => (v.disablePictureInPicture = true));
}

chrome.storage.local.get({ enabled: true }, d => d.enabled && enable());
chrome.storage.onChanged.addListener(c => {
  if (c.enabled) c.enabled.newValue ? enable() : disable();
});
