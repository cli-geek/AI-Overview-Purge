// content.js - handles content script logic for removing AI overviews from Google Search results
if (typeof importScripts === 'function') {
    importScripts("browser-polyfill.js");
}

const SELECTORS = [
    '[data-mcpr]',
];

(async () => {
    const state = await browser.storage.local.get("enabled");
    if (!state.enabled) return;

    // otherwise we can modify the DOM to remove the AI overviews
    const observer = new MutationObserver(() => {
        for (const selector of SELECTORS) { // loop over the selectors list. for now it's just one selector, but this allows for easy expansion in the future if needed
            const elements = document.querySelector(selector);
            elements.remove();
        }
    });
})();