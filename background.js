// Service worker file - handles declarativeNetRequest rules
if (typeof importScripts === 'function') {
    importScripts('./browser-polyfill.js'); // Imports the polyfille lib for Chrome
}

const RULES = [
    {
        id: 1,
        priority: 1,
        action: {
            type: "redirect",
            redirect: { transform: { queryTransform: { addOrReplaceParams: [{ key: "q", value: "placeholder"}] } } }
        },
        condition: {
            urlFilter: "*://www.google.com/search*",
            resourceTypes: ["main_frame"]
        }
    }
];

async function enabledRules() { // called when toggled ON
    await browser.declarativeNetRequest.updateDynamicRules({
        addRules: RULES,
        removeRuleIds: RULES.map(rule => rule.id)
    });
}

async function disableRules() { // called when toggled OFF
    await browser.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: RULES.map(rule => rule.id)
    });
}