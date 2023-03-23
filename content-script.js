function hideElements() {
  if (!chrome.runtime?.id) {
    return;
  }

  const isMedium = document.querySelector(
    'head meta[property="og:site_name"][content="medium" i]'
  );

  if (!isMedium) {
    return;
  }

  const mainContent = document.getElementsByTagName("main")[0];
  if (!mainContent) {
    return;
  }

  const footer = document.getElementsByTagName("footer")[0];
  const floatingActionBar = footer.nextElementSibling.nextElementSibling;

  chrome.storage.sync.get(null, function (preferences) {
    const rightSidebar = mainContent.nextSibling;
    if (rightSidebar) {
      rightSidebar.style.display = preferences.hideRightSidebar
        ? "none"
        : "block";
    }

    if (floatingActionBar) {
      floatingActionBar.style.display = preferences.hideFloatingActionBar
        ? "none"
        : "";
    }
  });
}

function setupObserver() {
  const observer = new MutationObserver((mutations) => {
    let realMutationCount = 0;

    mutations.forEach((mutation) => {
      const oldValue = mutation.oldValue;
      const newValue = mutation.target.textContent;
      if (oldValue !== newValue) {
        realMutationCount++;
      }
    });

    if (realMutationCount > 0) {
      hideElements();
    }
  });

  const subject = document.getElementById("root");

  if (subject) {
    observer.observe(subject, {
      characterDataOldValue: true,
      subtree: true,
      childList: true,
      characterData: true,
    });
  }
}

function main() {
  hideElements();
  setupObserver();
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "reload") {
    hideElements();
  }
});

main();
