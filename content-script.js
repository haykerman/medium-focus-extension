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

  chrome.storage.sync.get(null, function (preferences) {
    const rightSidebar = mainContent.nextSibling;
    if (rightSidebar) {
      rightSidebar.style.display = preferences.hideRightSidebar
        ? "none"
        : "block";
    }

    const leftSidebar = mainContent.previousSibling;
    if (leftSidebar) {
      leftSidebar.style.display = preferences.hideLeftSidebar
        ? "none"
        : "block";
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
