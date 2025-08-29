function removeAttr() {
  document.querySelectorAll("[deprecate-fullerscreen-ui]")
    .forEach(el => el.removeAttribute("deprecate-fullerscreen-ui"));
}

let observer;

// Run based on saved state
chrome.storage.sync.get("enabled", ({ enabled }) => {
  if (enabled) enableScrollFix();
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    if (changes.enabled.newValue) {
      enableScrollFix();
    } else {
      disableScrollFix();
    }
  }
});

function enableScrollFix() {
  removeAttr();
  observer = new MutationObserver(removeAttr);
  observer.observe(document.body, { childList: true, subtree: true });
}

function disableScrollFix() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
