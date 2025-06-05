// event listeners for all the start buttons to redirect user to the relevant page
const clickButton = document.getElementById("clickButton");
clickButton.addEventListener("click", function () {
  location.href = "click.html";
});

const dragButton = document.getElementById("dragButton");
dragButton.addEventListener("click", function () {
  location.href = "drag.html";
});

const hoverButton = document.getElementById("hoverButton");
hoverButton.addEventListener("click", function () {
  location.href = "hover.html";
});
