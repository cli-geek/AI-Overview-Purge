// Service worker file - handles declarativeNetRequest rules
if (typeof importScripts === 'function') {
    importScripts('browser-polyfill.js'); // Imports the polyfille lib for Chrome
}

browser.runtime.onInstalled.addListener( async () => {
    const state = await browser.storage.local.get("enabled");
    if (state.enabled === undefined) {
        await browser.storage.local.set({ enabled: true });
    }
});