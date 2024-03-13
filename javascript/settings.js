// Function to show the tab content based on the selected tab
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    // Show the selected tab content
    const selectedTabContent = document.getElementById(tabName + 'Tab');
    if (selectedTabContent) {
        selectedTabContent.style.display = 'block';
    }
}

// Show the General tab by default
showTab('general');