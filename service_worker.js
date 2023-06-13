// Listen for the browser action being clicked
chrome.action.onClicked.addListener(function(tab) {
  // Send a message to the content script to toggle the extension's enabled state
  chrome.tabs.sendMessage(tab.id, { type: "toggleEnabled" });
});
