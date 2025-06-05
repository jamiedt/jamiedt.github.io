// directs user back to home page when esc is pressed
document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    location.href = "index.html";
  }
});

const startButton = document.getElementById("startButton");
// listens for start button click
startButton.addEventListener("click", () => startDragGame(startButton));

target.addEventListener("dragstart", function () {
  // hide the original target when it is dragged
  setTimeout(() => {
    target.style.visibility = "hidden";
  }, 0);
});
target.addEventListener("dragend", function () {
  // show the element again after dragging ends
  target.style.visibility = "visible";
});
dragBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});
// adds to score and moves target when target is dropped into the dropbox
dragBox.addEventListener("drop", function (e) {
  e.preventDefault();
  moveScaleTarget();
});

function startDragGame(inputButton) {
  const score = document.getElementById("score");
  const target = document.getElementById("target");
  const dragBox = document.getElementById("dragBox");
  var timer = document.getElementById("timer");
  // gets rid of start button or play again button when pressed
  inputButton.style.display = "none";
  // puts score baclk in the top right if it wasnt there already
  score.classList.remove("scaled");
  target.style.display = "block";
  dragBox.style.display = "block";
  timer.style.display = "block";
  //starts timer
  var myTimer = setInterval(myTimer, 1000);
  var time = 20;
  function myTimer() {
    time--;
    timer.innerHTML = `Time Remaining: ${time}s`;
  }
  //stops timer
  function stopTimer() {
    clearInterval(myTimer);
  }
  firstScaleTarget();
  setTimeout(() => {
    stopTimer();
    timer.innerHTML = "Time Remaining: 20s";
    target.style.display = "none";
    dragBox.style.display = "none";
    timer.style.display = "none";
    score.classList.add("scaled");
    const playAgainButton = document.getElementById("playAgainButton");
    playAgainButton.style.display = "block";
    playAgainButton.addEventListener("click", () =>
      startDragGame(playAgainButton)
    );
  }, 20000);
}

function firstScaleTarget() {
  score = 0;
  document.getElementById("score").textContent = "Score: " + score;
  // target animation
  target.style.transition = "none";
  target.style.transform = "scale(0)";
  target.style.left = Math.random() * (window.innerWidth - 50) + "px";
  target.style.top = Math.random() * (window.innerHeight - 80) + 30 + "px";
  target.offsetHeight;
  target.style.transition = "transform 1s ease-in-out";
  target.style.transform = "scale(1)";
  // dragBox animation
  dragBox.style.transition = "none";
  dragBox.style.transform = "scale(0)";
  dragBox.style.left = Math.random() * (window.innerWidth - 50) + "px";
  dragBox.style.top = Math.random() * (window.innerHeight - 80) + 30 + "px";
  target.offsetHeight;
  dragBox.style.transition = "transform 1s ease-in-out";
  dragBox.style.transform = "scale(1)";
}

function moveScaleTarget() {
  score += 1;
  document.getElementById("score").textContent = "Score: " + score;
  // target animation
  target.style.transition = "none";
  target.style.transform = "scale(0)";
  target.style.left = Math.random() * (window.innerWidth - 50) + "px";
  target.style.top = Math.random() * (window.innerHeight - 80) + 30 + "px";
  target.offsetHeight;
  target.style.transition = "transform 1s ease-in-out";
  target.style.transform = "scale(1)";
  // dragBox animation
  dragBox.style.transition = "none";
  dragBox.style.transform = "scale(0)";
  dragBox.style.left = Math.random() * (window.innerWidth - 50) + "px";
  dragBox.style.top = Math.random() * (window.innerHeight - 80) + 30 + "px";
  target.offsetHeight;
  dragBox.style.transition = "transform 1s ease-in-out";
  dragBox.style.transform = "scale(1)";
}
