// content.js - SiteSearch-Solo
document.addEventListener('mouseup', () => {
  const selection = window.getSelection().toString().trim();
  if (selection) {
    chrome.runtime.sendMessage({
      type: "SELECTION_CHANGED",
      text: selection
    });
  }
});
