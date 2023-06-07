// Enable or disable the functionality based on a condition
var isEnabled = true; // Set this variable to true or false based on your condition

// Remove target="_blank" links
function removeTargetBlankLinks() {
  var links = document.querySelectorAll('a[target="_blank"]');
  links.forEach(function(link) {
    link.removeAttribute("target");
  });
}

// Function to remove target="_blank" from existing links
function removeExistingTargetBlankLinks() {
  var existingLinks = document.querySelectorAll('a[target="_blank"]');
  existingLinks.forEach(function(link) {
    link.removeAttribute("target");
  });
}

// Mutation observer to check for changes in the DOM and remove target="_blank" links
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    removeTargetBlankLinks();
  });
});

// Function to block new tab creation and remove target="_blank" from links
function blockNewTab(event) {
  event.preventDefault();
  console.log("New tab blocked");

  // Remove target="_blank" links in the newly created tab
  if (event.target.tagName === "A" && event.target.getAttribute("target") === "_blank") {
    event.target.removeAttribute("target");
  }

  // Close the newly created tab
  if (event.target.tagName === "A" && event.target.getAttribute("target") === "_blank" && event.target.href) {
    var newTabUrl = event.target.href;
    chrome.tabs.create({ url: newTabUrl, active: false }, function(newTab) {
      chrome.tabs.remove(newTab.id);
    });
  }
}

// Toggle the extension's enabled state
function toggleEnabled() {
  isEnabled = !isEnabled;

  if (isEnabled) {
    // Remove target="_blank" links on initial page load
    removeTargetBlankLinks();
    removeExistingTargetBlankLinks();

    // Observe the document body for changes and remove target="_blank" links
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"]
    });

    // Override the window.open function to block popups and remove target="_blank"
    window.open = blockNewTab;
    // Override the window.openDatabase function to block database creation
    window.openDatabase = null;
    // Override the window.openDialog function to block dialog creation
    window.openDialog = null;
    // Override the window.showModalDialog function to block modal dialog creation
    window.showModalDialog = null;
    // Override the Element.prototype.open function to block opening new tabs and remove target="_blank"
    Element.prototype.open = blockNewTab;

    console.log("Extension enabled");
  } else {
    observer.disconnect();
    window.open = null;
    window.openDatabase = undefined;
    window.openDialog = undefined;
    window.showModalDialog = undefined;
    Element.prototype.open = undefined;

    console.log("Extension disabled");
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "toggleEnabled") {
    toggleEnabled();
  } else if (request.type === "removeTargetBlankLinks") {
    removeTargetBlankLinks();
  }
});

// Initialize the extension's state when the document has finished loading
window.addEventListener("load", function() {
  toggleEnabled();
});
