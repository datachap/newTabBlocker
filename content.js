// Function to toggle the extension on/off
function toggleExtension() {
    chrome.runtime.sendMessage({ type: "toggleEnabled" });
    updateToggleButton();
  }
  
  // Function to update the toggle button's appearance
  function updateToggleButton() {
    var toggleButton = document.getElementById("toggleButton");
    var toggleIcon = document.getElementById("toggleIcon");
  
    if (isEnabled) {
      toggleButton.classList.add("enabled");
      toggleButton.classList.remove("disabled");
      toggleIcon.src = "img/on_16.png";
    } else {
      toggleButton.classList.add("disabled");
      toggleButton.classList.remove("enabled");
      toggleIcon.src = "img/off_16.png";
    }
  }
  
  // Add an event listener for receiving messages from the background script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "toggleEnabled") {
      toggleExtension();
    }
  });
  
  // Add the toggle button to the web page
  var toggleButton = document.createElement("button");
  toggleButton.id = "toggleButton";
  toggleButton.addEventListener("click", toggleExtension);
  
  // Create the different sizes of the logo
  var logoSizes = [16, 48, 128];
  for (var i = 0; i < logoSizes.length; i++) {
    var toggleIcon = document.createElement("img");
    toggleIcon.src = "img/on_" + logoSizes[i] + ".png";
    toggleIcon.alt = "Toggle Icon";
    toggleButton.appendChild(toggleIcon);
  }
  
  // Append the toggle button to the body of the page
  document.body.appendChild(toggleButton);
  
  // Initialize the toggle button's appearance
  updateToggleButton();
  