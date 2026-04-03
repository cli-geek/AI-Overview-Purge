document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle");
    const statusText = document.getElementById("status-text");
  
    // Load saved state from chrome storage (is the script enabled or not)
    chrome.storage.local.get("enabled", (data) => {
      toggle.checked = data.enabled || false; // Default to false (off) if nothing is set
      statusText.style.color = toggle.checked ? "red" : "white";
    });
  
    // When the toggle changes, save the state and notify background script
    toggle.addEventListener("change", () => {
      const isEnabled = toggle.checked;
      chrome.storage.local.set({ enabled: isEnabled });
  
      // Update the text color based on switch position
      statusText.style.color = isEnabled ? "red" : "white";
  
      // Notify the background script of the new state
      chrome.runtime.sendMessage({ enabled: isEnabled });
    });
  });
  