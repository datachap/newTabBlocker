try {
    // eslint-disable-next-line no-undef
    importScripts("service_worker.js");
  } catch (e) {
    console.error(e);
  }
  
  // Update the code to use chrome.action API instead of chrome.browserAction
  
  // Handle the browser action click event
  chrome.action.onClicked.addListener(function(tab) {
    // Your logic for handling the click event
    // ...
  });
  