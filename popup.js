function updatePreferences() {
  const rightSidebar = document.getElementById("right-sidebar");
  const leftSidebar = document.getElementById("left-sidebar");
  const footer = document.getElementById("footer");

  chrome.storage.sync.set(
    {
      hideRightSidebar: rightSidebar.checked,
      hideLeftSidebar: leftSidebar.checked,
      hideFooter: footer.checked,
    },
    function () {
      publish();

      const info = document.getElementById("info");
      info.textContent = "Successfully updated!";

      setTimeout(function () {
        info.textContent = "";
      }, 1000);
    }
  );
}

function resetPreferences() {
  document.getElementById("right-sidebar").checked = false;
  document.getElementById("left-sidebar").checked = false;
  document.getElementById("footer").checked = false;

  chrome.storage.sync.set(
    {
      hideRightSidebar: false,
      hideLeftSidebar: false,
      hideFooter: false,
    },
    function () {
      publish();

      const info = document.getElementById("info");
      info.textContent = "Successfully reset!";

      setTimeout(function () {
        info.textContent = "";
      }, 1000);
    }
  );
}

function loadPreferences() {
  chrome.storage.sync.get(
    {
      hideRightSidebar: false,
      hideLeftSidebar: false,
      hideFooter: false,
    },
    function (preferences) {
      document.getElementById("right-sidebar").checked =
        preferences.hideRightSidebar;
      document.getElementById("left-sidebar").checked =
        preferences.hideLeftSidebar;
      document.getElementById("footer").checked = preferences.hideFooter;
    }
  );
}

async function publish() {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  chrome.tabs.sendMessage(activeTab.id, { message: "reload" });
}

document.addEventListener("DOMContentLoaded", loadPreferences);

document.getElementById("reset").addEventListener("click", resetPreferences);
document.getElementById("save").addEventListener("click", updatePreferences);
