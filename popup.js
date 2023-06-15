// Get the list element
var tabLinksList = document.getElementById('tabLinks');

// Function to display the tab links in the popup
function displayTabLinks(tabLinks) {
  // Clear the previous content
  tabLinksList.innerHTML = '';

  // Create list items for each tab link
  tabLinks.forEach(function(link) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.title || link.url;
    a.target = '_blank';
    li.appendChild(a);
    tabLinksList.appendChild(li);
  });
}

// Send a message to the background script to get the tab links
chrome.runtime.sendMessage({ type: 'getTabLinks' }, function(response) {
  if (response && response.tabLinks) {
    displayTabLinks(response.tabLinks);
  }
});
