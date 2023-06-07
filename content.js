// Enable or disable the functionality based on a condition
var isEnabled = true; // Set this variable to true or false based on your condition

// Function to remove target="_blank" links
function removeTargetBlankLinks() {
  var links = document.querySelectorAll('a[target="_blank"]');
  links.forEach(function(link) {
    link.removeAttribute('target');
  });
}

// Mutation observer to check for changes in the DOM and remove target="_blank" links
var observer = new MutationObserver(removeTargetBlankLinks);

// Check if the functionality is enabled
if (isEnabled) {
  // Override the window.open function to block popups
  window.open = function() {
    console.log("Popup blocked");
  };

  // Override the window.openDatabase function to block database creation
  window.openDatabase = null;

  // Override the window.openDialog function to block dialog creation
  window.openDialog = null;

  // Override the window.showModalDialog function to block modal dialog creation
  window.showModalDialog = null;

  // Override the Element.prototype.open function to block opening new tabs
  Element.prototype.open = function() {
    console.log("New tab blocked");
  };

  // Disable the context menu to prevent opening links in new tabs/windows
  window.addEventListener("contextmenu", function(event) {
    event.preventDefault();
  });

  // Observe the document body for changes and remove target="_blank" links
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href']
  });

  // Remove target="_blank" links on initial page load
  removeTargetBlankLinks();
}
