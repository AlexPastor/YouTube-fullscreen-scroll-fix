const button = document.getElementById("toggle");

function updateButton(enabled) {
  if (enabled) {
    button.textContent = "ON";
    button.className = "on";
  } else {
    button.textContent = "OFF";
    button.className = "off";
  }
}

// Load initial state
chrome.storage.sync.get("enabled", ({ enabled }) => {
  updateButton(enabled ?? false);
});

// Toggle on click
button.addEventListener("click", () => {
  chrome.storage.sync.get("enabled", ({ enabled }) => {
    const newState = !enabled;
    chrome.storage.sync.set({ enabled: newState });
    updateButton(newState);

    // Refresh the current YouTube tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0 && tabs[0].id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });
});
