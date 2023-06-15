try {
  // Register the service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);

        // Add an event listener for the browser action click event
        chrome.action.onClicked.addListener(function(tab) {
          // Send a message to the service worker to toggle the extension's enabled state
          navigator.serviceWorker.controller.postMessage({ type: "toggleEnabled" });
        });
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  }
} catch (e) {
  console.error(e);
}
