// Listen for the browser action being clicked
chrome.action.onClicked.addListener(function(tab) {
  // Send a message to the content script to toggle the extension's enabled state
  chrome.tabs.sendMessage(tab.id, { type: "toggleEnabled" });
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    // Send a message to the content script to remove target="_blank" links
    chrome.tabs.sendMessage(tabId, { type: "removeTargetBlankLinks" });
  }
});
