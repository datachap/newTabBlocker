// Listen for the page to finish loading
window.addEventListener("load", function() {
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
});
