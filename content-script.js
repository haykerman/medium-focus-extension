function hideElements() {
  const rightSidebar = document.getElementsByTagName("main")[0]?.nextSibling;

  if (rightSidebar?.style.display != "none") {
    rightSidebar.style.display = "none";
  }
}

function main() {
  const isMedium = document.querySelector(
    'head meta[property="og:site_name"][content="medium" i]'
  );

  if (isMedium) {
    hideElements();
  }
}

main();

let observer = new MutationObserver((mutations) => {
  let realMutationCount = 0;

  mutations.forEach((mutation) => {
    let oldValue = mutation.oldValue;
    let newValue = mutation.target.textContent;
    if (oldValue !== newValue) {
      realMutationCount++;
    }
  });

  if (realMutationCount > 0) {
    main();
  }
});

const subject = document.getElementById("root");
observer.observe(subject, {
  characterDataOldValue: true,
  subtree: true,
  childList: true,
  characterData: true,
});
