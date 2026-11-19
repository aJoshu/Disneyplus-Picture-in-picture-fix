const toggle = document.getElementById("toggle");
let tabId;
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => (tabId = tab?.id));
chrome.storage.local.get({ enabled: true }, d => (toggle.checked = d.enabled));

toggle.onchange = () => {
  if (toggle.checked && tabId) {
    chrome.scripting.executeScript({ target: { tabId }, func: pip, args: [true] }).catch(() => {});
  }
  chrome.storage.local.set({ enabled: toggle.checked });
};
