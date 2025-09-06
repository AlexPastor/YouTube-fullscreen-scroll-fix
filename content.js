const css = `
  ytd-app[fullscreen] {
    overflow: auto !important;
  }

  ytd-app[scrolling] {
    position: absolute !important;
    inset: 0 calc((var(--ytd-app-fullerscreen-scrollbar-width) + 1px) * -1) 0 0 !important;
    overflow-x: auto !important;
  }

  ytd-watch-flexy[fullscreen] #single-column-container.ytd-watch-flexy,
  ytd-watch-flexy[fullscreen] #columns.ytd-watch-flexy {
    display: flex !important;
  }
`;

function injectCSS() {
  const style = document.createElement('style');
  style.id = 'youtube-scroll-fix-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

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
  injectCSS();
}

function disableScrollFix() {
  const style = document.getElementById('youtube-scroll-fix-styles');
  if (style) {
    style.remove();
  }
}
