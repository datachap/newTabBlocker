var isEnabled = true;

// Function to toggle the extension on/off
function toggleExtension() {
  isEnabled = !isEnabled;
  // Perform necessary actions based on the toggle state
  if (isEnabled) {
    console.log('Extension enabled');
    // Enable the extension
    self.registration.showNotification('Extension Enabled', {
      body: 'The extension is now enabled.',
      icon: 'img/on_16.png'
    });
  } else {
    console.log('Extension disabled');
    // Disable the extension
    self.registration.showNotification('Extension Disabled', {
      body: 'The extension is now disabled.',
      icon: 'img/off_16.png'
    });
  }
}

// Add an event listener for receiving messages from the main script
self.addEventListener('message', function(event) {
  var message = event.data;

  if (message.type === 'toggleEnabled') {
    toggleExtension();
  }
});

// Add an event listener for receiving messages from the main script in the service worker scope
self.addEventListener('message', function(event) {
  var message = event.data;

  if (message.type === 'toggleEnabled') {
    toggleExtension();
  }
});
