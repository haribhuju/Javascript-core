document.addEventListener("DOMContentLoaded", (event) => {
  const draggables = document.querySelectorAll(".draggable");
  const dropableContainers = document.querySelectorAll(".dropable-container");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
    draggable.addEventListener("dragend", dragEnd);
  });

  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.classList.add("opacity-50");
  }

  function dragEnd(e) {
    e.target.classList.remove("opacity-50");
  }

  dropableContainers.forEach((container) => {
    container.addEventListener("dragover", dragOver);
    container.addEventListener("dragenter", dragEnter);
    container.addEventListener("drop", dragDrop);
    updateCount(container);
  });

  function updateCount(container) {
    const parent = container.parentElement;
    const countDisplay = parent.previousElementSibling;
    const itemCount = countDisplay.querySelectorAll(".item-count");

    const draggablesInContainer = container.querySelectorAll(".draggable");
    itemCount.forEach((item) => {
      item.textContent = draggablesInContainer.length || 0;
    });
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragDrop(e) {
    e.preventDefault();
    const dropableContainer = e.target.closest(".dropable-container");
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);
    if (dropableContainer) {
      dropableContainer.appendChild(draggable);
      updateCount(dropableContainer);
    }
    dropableContainers.forEach(updateCount);
  }
});
