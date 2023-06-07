// Listen for the browser action being clicked
chrome.action.onClicked.addListener(function (tab) {
  if (!tab || !tab.url) {
    console.error("Invalid tab or tab URL");
    return;
  }

  // Get the current tab URL
  var currentTabUrl = tab.url;

  // Retrieve the list of enabled tabs from storage
  chrome.storage.local.get("enabledTabs", function (data) {
    var enabledTabs = data.enabledTabs || [];

    // Check if the current tab is already enabled
    var isEnabled = enabledTabs.includes(currentTabUrl);

    if (isEnabled) {
      // Remove the current tab from the enabled tabs list
      enabledTabs = enabledTabs.filter(function (url) {
        return url !== currentTabUrl;
      });

      console.log("Extension disabled for current tab: " + currentTabUrl);
    } else {
      // Add the current tab to the enabled tabs list
      enabledTabs.push(currentTabUrl);

      console.log("Extension enabled for current tab: " + currentTabUrl);
    }

    // Store the updated enabled tabs list
    chrome.storage.local.set({ enabledTabs: enabledTabs }, function () {
      if (chrome.runtime.lastError) {
        console.error("Failed to store enabled tabs: " + chrome.runtime.lastError.message);
      }
    });
  });
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    // Execute script in the current tab to remove target="_blank" links
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: removeTargetBlankLinks,
    });
  }
});

// Function to remove target="_blank" links
function removeTargetBlankLinks() {
  var links = document.querySelectorAll('a[target="_blank"]');
  links.forEach(function (link) {
    link.removeAttribute("target");
  });
}
