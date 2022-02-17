function hideElements() {
  // const rightSidebar1 = document.getElementsByClassName(
  //   "gg gh c gi h k j i bl gj gk gl"
  // )[0];

  // const rightSidebar2 = document.getElementsByClassName(
  //   "dk dl c dm h k j i bl dn do dp"
  // )[0];

  // const rightSidebar3 = document.getElementsByClassName(
  //   "dk dl dr qp h k j i bl dn do dp"
  // )[0];

  // if (rightSidebar1 && rightSidebar1.style.display != "none") {
  //   rightSidebar1.style.display = "none";
  // }

  // if (rightSidebar2 && rightSidebar2.style.display != "none") {
  //   rightSidebar2.style.display = "none";
  // }

  // if (rightSidebar3 && rightSidebar3.style.display != "none") {
  //   rightSidebar3.style.display = "none";
  // }

  const rightSidebar = document.getElementsByTagName("main")[0]?.nextSibling;

  if (rightSidebar && rightSidebar.style.display != "none") {
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
    console.log("realMutationCount", realMutationCount);
    main();
  }
});

// const subject = document.getElementsByTagName("main")[0];
// const subject = document.body;
const subject = document.getElementById("root");
observer.observe(subject, {
  characterDataOldValue: true,
  subtree: true,
  childList: true,
  characterData: true,
});
