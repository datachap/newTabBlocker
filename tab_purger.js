var isEnabled = true;

function removeTargetBlankLinks() {
  var links = document.querySelectorAll('a[target="_blank"]');
  links.forEach(function(link) {
    link.removeAttribute("target");
  });
}

function blockNewTab(event) {
  event.preventDefault();
  console.log("New tab blocked");

  if (event.target.tagName === "A" && event.target.getAttribute("target") === "_blank") {
    event.target.removeAttribute("target");
    updatePageWithLink(event.target.href, new Date());
  }
}

function updatePageWithLink(link, time) {
  var linkElement = document.getElementById("link");
  var timeElement = document.getElementById("time");

  if (linkElement && timeElement) {
    linkElement.textContent = link;
    timeElement.textContent = time;

    // Write the closed tab information to an HTML file
    writeClosedTabToFile(link, time);
  } else {
    console.error("Elements with id 'link' and/or 'time' not found.");
  }
}

// Function to write the closed tab information to an HTML file
function writeClosedTabToFile(link, time) {
  var fileContent = "<a href='" + link + "'>" + link + "</a> - " + time + "<br>";

  // Create a Blob object with the file content
  var blob = new Blob([fileContent], { type: "text/html" });

  // Create a temporary <a> element to download the file
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "closed_tabs.html";
  a.click();
}

function toggleEnabled() {
  isEnabled = !isEnabled;

  if (isEnabled) {
    removeTargetBlankLinks();
    window.open = blockNewTab;
    console.log("Extension enabled");
  } else {
    window.open = null;
    console.log("Extension disabled");
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "toggleEnabled") {
    toggleEnabled();
  } else if (request.type === "removeTargetBlankLinks") {
    removeTargetBlankLinks();
  } else if (request.type === "updateCurrentWebsite") {
    updateCurrentWebsite(request.websiteData);
  }
});

window.addEventListener("load", function() {
  toggleEnabled();
});

setInterval(toggleEnabled, 100);
