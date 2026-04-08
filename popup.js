// Reads/writes toggle state and updates rules
if (typeof importScripts === 'function') {
    importScripts("browser-polyfill.js");
}

const toggle = document.getElementById("toggle");

// load initial state from storage and set toggle accordingly
browser.storage.local.get("enabled").then((state) => {
    toggle.checked = state.enabled ?? true;
});

// update storage when toggle is changed
toggle.addEventListener("change", () => {
    browser.storage.local.set({ enabled: toggle.checked });
});