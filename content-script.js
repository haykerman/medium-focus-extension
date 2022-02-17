function hideElements() {
  const isMedium = document.querySelector(
    'head meta[property="og:site_name"][content="medium" i]'
  );

  if (!isMedium) {
    return;
  }

  const rightSidebar = document.getElementsByTagName("main")[0]?.nextSibling;

  if (rightSidebar?.style.display != "none") {
    rightSidebar.style.display = "none";
  }
}

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

function main() {
  const subject = document.getElementById("root");

  if (subject) {
    observer.observe(subject, {
      characterDataOldValue: true,
      subtree: true,
      childList: true,
      characterData: true,
    });
  }

  hideElements();
}

main();
