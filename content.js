const SELECTOR = '[data-mcpr]';

let enabled = null;
let observer = null;
let debounceTimer = null;
let styleEl = null;

// ===== STYLE CONTROL =====
function addStyle() {
    if (styleEl) return;

    styleEl = document.createElement('style');
    styleEl.textContent = `${SELECTOR} { display: none !important; }`;

    const inject = () => {
        const parent = document.head || document.documentElement;
        if (!parent) return false;

        parent.appendChild(styleEl);
        return true;
    };

    // Try immediately
    if (inject()) return;

    // Fallback (minimal + safe)
    const observer = new MutationObserver(() => {
        if (inject()) observer.disconnect();
    });

    observer.observe(document, { childList: true });
}

function removeStyle() {
    if (styleEl) {
        styleEl.remove();
        styleEl = null;
    }
}

// ===== OBSERVER/PURGE CONTROL =====
    function purge() {
    if (!enabled) return;

    document.querySelectorAll(SELECTOR).forEach(el => el.remove());
}

function startObserver() {
    if (observer) return;

    observer = new MutationObserver(() => {
        if (!enabled) return;

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(purge, 50);
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
}

function stopObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

function enable() {
    addStyle();
    purge();
    startObserver();
}

function disable() {
    removeStyle();
    stopObserver();
}

browser.storage.local.get("enabled").then(res => {
    enabled = res.enabled ?? true;

    if (enabled) enable();
});

browser.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !changes.enabled) return;

    enabled = changes.enabled.newValue;

    if (enabled) {
        enable();
    } else {
        disable();
    }
});