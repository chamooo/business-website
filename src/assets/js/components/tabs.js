function makeActive(items, type = "tabs") {
  items.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      removeClass(items, "active");

      if (type === "tabs") {
        toggleTabs(item);
        setActiveImage(index);
      } else if (type === "images") {
        setActiveTab(index);
      }

      item.classList.add("active");
    });
  });
}

function setActiveImage(index) {
  const images = document.querySelectorAll(".row-variants__images img");
  removeClass(images, "active");

  if (images[index]) {
    images[index].classList.add("active");
  }
}

function setActiveTab(index) {
  const tabsContainers = document.querySelectorAll(".js-tabs");

  tabsContainers.forEach((container) => {
    const tabs = [...container.querySelectorAll(".js-tabs-item")];
    removeClass(tabs, "active");

    if (tabs[index]) {
      tabs[index].classList.add("active");
      toggleTabs(tabs[index]);
    }
  });
}

function toggleTabs(trigger) {
  const tabName = trigger.getAttribute("data-name");
  const tabTarget = trigger.getAttribute("data-tab");

  const allContents = document.querySelectorAll(
    `[data-content][data-name=${tabName}]`,
  );
  const content = document.querySelectorAll(
    `[data-content=${tabTarget}][data-name=${tabName}]`,
  );

  removeClass(allContents, "active");
  content.forEach((item) => item?.classList.add("active"));
}

const tabsContainers = document.querySelectorAll(".js-tabs");
tabsContainers.forEach((container) => {
  const tabs = container.querySelectorAll(".js-tabs-item");
  makeActive(tabs);
});

const images = document.querySelectorAll(".row-variants__images img");
makeActive(images, "images");

const hasOneActive = document.querySelectorAll(".has-one-active");
hasOneActive.forEach((container) => {
  const items = container.querySelectorAll(".has-one-active-item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      removeClass(items, "active");
      item.classList.add("active");
    });
  });
});
