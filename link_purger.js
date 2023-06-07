// Function to delete unwanted links
function deleteUnwantedLinks() {
    // Step 2: Select all links
    const allLinks = document.links;
  
    // Step 3: Iterate through the links
    Array.from(allLinks).forEach((link) => {
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
      .map((link) => link.href)
      .filter((href) => isInternalLink(href));
  
    return {
      currentWebsite,
      sublinks,
    };
  }
  
  // Function to display website information on the about.html page
  function displayWebsiteInfo() {
    const websiteData = getCurrentWebsite();
    const currentWebsiteElement = document.getElementById("current-website");
    const sublinksElement = document.getElementById("sublinks");
  
    // Display current website
    currentWebsiteElement.textContent = websiteData.currentWebsite;
  
    // Display sublinks
    sublinksElement.innerHTML = "";
    websiteData.sublinks.forEach((sublink) => {
      const linkElement = document.createElement("a");
      linkElement.href = sublink;
      linkElement.textContent = sublink;
      sublinksElement.appendChild(linkElement);
      sublinksElement.appendChild(document.createElement("br"));
    });
  }
  
  // Delete unwanted links initially
  deleteUnwantedLinks();
  
  // Check and delete unwanted links every second
  setInterval(() => {
    deleteUnwantedLinks();
  }, 1000);
  
  // Display website information on the about.html page
  displayWebsiteInfo();
  