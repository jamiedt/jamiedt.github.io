// directs user back to home page when esc is pressed
document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    location.href = "index.html";
  }
});

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => startClickGame(startButton));

let score = 0;

function startClickGame(inputButton) {
  const score = document.getElementById("score");
  const target = document.getElementById("target");
  inputButton.style.transition = "transform 1s ease-in-out";
  inputButton.classList.remove("show");
  inputButton.classList.remove("hover");
  var timer = document.getElementById("timer");
  setTimeout(() => {
    score.classList.remove("scaled");
    target.style.display = "block";
    timer.style.display = "block";
    var myTimer = setInterval(myTimer, 1000); //starts timer
    var time = 20; //time
    function myTimer() {
      time--;
      timer.innerHTML = `Time Remaining: ${time}s`;
    }
    function stopTimer() {
      clearInterval(myTimer); //stops timer
    }
    firstScaleTarget();
    target.addEventListener("click", moveScaleTarget);
    setTimeout(() => {
      stopTimer();
      timer.innerHTML = "Time Remaining: 20s";
      target.style.display = "none";
      timer.style.display = "none";
      score.classList.add("scaled");
      const playAgainButton = document.getElementById("playAgainButton");
      setTimeout(() => {
        playAgainButton.classList.add("show");
        playAgainButton.addEventListener("transitionend", () => {
          playAgainButton.classList.add("hover");
          playAgainButton.style.transition = "transform 0.3s ease-in-out";
          playAgainButton.addEventListener("click", () =>
            startClickGame(playAgainButton)
          );
        });
      }, 1000);
    }, 20000);
  }, 1000);
}

function firstScaleTarget() {
  score = 0;
  document.getElementById("score").textContent = "Score: " + score;
  target.style.transition = "none";
  target.style.transform = "scale(0)";
  target.style.left = Math.random() * (window.innerWidth - 50) + "px";
  target.style.top = Math.random() * (window.innerHeight - 80) + 30 + "px";
  requestAnimationFrame(() => {
    target.style.transition = "transform 1s ease-in-out";
    target.style.transform = "scale(1)";
  });
}

function moveScaleTarget() {
  score += 1;
  document.getElementById("score").textContent = "Score: " + score;
  target.style.transition = "none";
  target.style.transform = "scale(0)";
  target.style.left = Math.random() * (window.innerWidth - 50) + "px";
  target.style.top = Math.random() * (window.innerHeight - 80) + 30 + "px";
  requestAnimationFrame(() => {
    target.style.transition = "transform 1s ease-in-out";
    target.style.transform = "scale(1)";
  });
}
