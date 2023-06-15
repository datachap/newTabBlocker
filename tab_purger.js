var isEnabled = true;
var isTabBlocked = false;

function toggleEnabled() {
  isEnabled = !isEnabled;

  if (isEnabled) {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        isTabBlocked = true; // Set the tab blocked flag for existing tabs
        blockNewTab(tab);
      });
    });
    console.log("Extension enabled");
  } else {
    console.log("Extension disabled");
  }
}

function blockNewTab(tab) {
  if (isEnabled && isTabBlocked && tab.openerTabId !== chrome.tabs.TAB_ID_NONE) {
    chrome.tabs.update(tab.id, { active: true });
    chrome.tabs.remove(tab.id);
    console.log("New tab blocked");
    updatePageWithLink(tab.url, new Date());
  }
}

function updatePageWithLink(link, time) {
  // Send a message to the content script to update the page with the link and time
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "updatePage", link, time });
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "toggleEnabled") {
    toggleEnabled();
  }
});

chrome.tabs.onCreated.addListener(blockNewTab);

