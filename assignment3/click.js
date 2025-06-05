// directs user back to home page when esc is pressed
document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    location.href = "index.html";
  }
});

const startButton = document.getElementById("startButton");
// listens for start button and target  click
startButton.addEventListener("click", () => startClickGame(startButton));
target.addEventListener("click", moveScaleTarget);

function startClickGame(inputButton) {
  const score = document.getElementById("score");
  const target = document.getElementById("target");
  var timer = document.getElementById("timer");
  // gets rid of start button or play again button when pressed
  inputButton.style.display = "none";
  // puts score baclk in the top right if it wasnt there already
  score.classList.remove("scaled");
  target.style.display = "block";
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
  // creates first target
  firstScaleTarget();
  //  after 20 seconds the game ends and runs these commands to show the users sscore on the screen
  // and resets the game
  setTimeout(() => {
    // resets timer
    stopTimer();
    timer.innerHTML = "Time Remaining: 20s";
    // gets rid of timer and targets and makes score bigger and adds play again button
    target.style.display = "none";
    timer.style.display = "none";
    score.classList.add("scaled");
    const playAgainButton = document.getElementById("playAgainButton");
    playAgainButton.style.display = "block";
    playAgainButton.addEventListener("click", () =>
      startClickGame(playAgainButton)
    );
  }, 20000);
}

function firstScaleTarget() {
  score = 0;
  document.getElementById("score").textContent = "Score: " + score;
  // target animation
  target.style.transition = "none";
  target.style.transform = "scale(0)";
  // puts target randomly within the window without covering text at top
  target.style.left = Math.random() * (window.innerWidth - 50) + "px";
  target.style.top = Math.random() * (window.innerHeight - 80) + 30 + "px";
  target.offsetHeight;
  // resets target with a buffer so that the correct transitions can be added
  target.style.transition = "transform 1s ease-in-out";
  target.style.transform = "scale(1)";
}

function moveScaleTarget() {
  // adds a score for every time the target is clicked (also could have probably made these
  // two functions into the same function and add a conditional statement for whether
  // the start button is clicked or the target is clicked to add score)
  score += 1;
  document.getElementById("score").textContent = "Score: " + score;
  target.style.transition = "none";
  target.style.transform = "scale(0)";
  target.style.left = Math.random() * (window.innerWidth - 50) + "px";
  target.style.top = Math.random() * (window.innerHeight - 80) + 30 + "px";
  target.offsetHeight;
  target.style.transition = "transform 1s ease-in-out";
  target.style.transform = "scale(1)";
}
