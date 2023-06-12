// Enable or disable the functionality based on a condition
var isEnabled = true; // Set this variable to true or false based on your condition

// Remove target="_blank" attribute from links
function removeTargetBlankLinks() {
  var links = document.querySelectorAll('a[target="_blank"]');
  links.forEach(function(link) {
    link.removeAttribute("target");
  });
}

// Function to block new tab creation and remove target="_blank" from links
function blockNewTab(event) {
  event.preventDefault();
  console.log("New tab blocked");

  // Remove target="_blank" attribute from the newly created tab
  if (event.target.tagName === "A" && event.target.getAttribute("target") === "_blank") {
    event.target.removeAttribute("target");
    // Update the HTML page with the link and current time
    updatePageWithLink(event.target.href, new Date());
  }
}

// Update the HTML page with the link and current time
function updatePageWithLink(link, time) {
  var linkElement = document.getElementById("link");
  var timeElement = document.getElementById("time");

  if (linkElement && timeElement) {
    linkElement.textContent = link;
    timeElement.textContent = time;
  } else {
    console.error("Elements with id 'link' and/or 'time' not found.");
  }
}

// Toggle the extension's enabled state
function toggleEnabled() {
  isEnabled = !isEnabled;

  if (isEnabled) {
    // Remove target="_blank" attribute from existing links
    removeTargetBlankLinks();

    // Override the window.open function to block new tab creation and remove target="_blank"
    window.open = blockNewTab;

    console.log("Extension enabled");
  } else {
    window.open = null;

    console.log("Extension disabled");
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "toggleEnabled") {
    toggleEnabled();
  } else if (request.type === "removeTargetBlankLinks") {
    removeTargetBlankLinks();
  } else if (request.type === "updateCurrentWebsite") {
    updateCurrentWebsite(request.websiteData);
  }
});

// Initialize the extension's state when the document has finished loading
window.addEventListener("load", function() {
  toggleEnabled();
});

// Run toggleEnabled function every 100 milliseconds
setInterval(toggleEnabled, 100);
