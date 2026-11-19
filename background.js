importScripts('pip.js');
chrome.commands.onCommand.addListener((command, tab) => {
  if (command !== 'toggle-pip' || !tab?.id) return;
  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: pip, args: [false] })
    .catch(e => console.log('Disney-PIP:', e.message));
});
