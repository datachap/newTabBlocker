// Function to delete unwanted links
function deleteUnwantedLinks() {
  // Step 2: Select all links
  const allLinks = document.links;

  // Step 3: Iterate through the links
  Array.from(allLinks).forEach(link => {
    const href = link.href;

    // Step 4: Remove unwanted links
    if (!isInternalLink(href)) {
      link.remove(); // or link.style.display = 'none';
    }
  });
}

// Function to check if a link is internal
function isInternalLink(href) {
  const currentWebsite = window.location.origin;
  return href.startsWith(currentWebsite);
}

// Function to get the current website and sublinks
function getCurrentWebsite() {
  const currentWebsite = window.location.href;
  const sublinks = Array.from(document.links)
    .map(link => link.href)
    .filter(href => isInternalLink(href));

  return {
    currentWebsite,
    sublinks,
  };
}

// Delete unwanted links initially
deleteUnwantedLinks();

// Check and delete unwanted links every second
setInterval(() => {
  deleteUnwantedLinks();
}, 1000);

// Get current website and sublinks
const websiteData = getCurrentWebsite();
console.log('Current Website:', websiteData.currentWebsite);
console.log('Sublinks:', websiteData.sublinks);
