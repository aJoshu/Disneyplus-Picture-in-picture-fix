function pip(force) {
  const run = () => {
    if (document.pictureInPictureElement) return document.exitPictureInPicture();
    const vids = [...document.querySelectorAll('video')];
    const v = vids.find(x => !x.paused) || vids.sort((a, b) => b.clientWidth - a.clientWidth)[0];
    if (!v) return console.log('Feed not found');
    v.disablePictureInPicture = false;
    v.requestPictureInPicture().catch(e => console.log('Disney-PIP failed:', e.message));
  };
  if (force) return run();
  chrome.storage.local.get({ enabled: true }, d => (d.enabled ? run() : console.log('Disney-PIP is turned off')));
}
