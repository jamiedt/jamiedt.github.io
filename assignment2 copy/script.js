function startTransition() {
  const circle = document.getElementById("circleOverlay");
  const mainContent = document.getElementById("mainContent");
  const startPage = document.getElementById("startPage");

  // Animate circle to cover the whole screen
  circle.style.width = "3000px";
  circle.style.height = "3000px";

  // Wait for the animation to complete
  setTimeout(() => {
    startPage.style.display = "none";
    mainContent.style.display = "flex";
    void mainContent.offsetWidth;
    mainContent.style.transform = "translateY(0)";
    mainContent.style.opacity = "1";
  }, 1000); // match the CSS transition duration
}

// Time control
let studyTime = 25;

document.getElementById("decreaseTime").addEventListener("click", () => {
  if (studyTime > 5) {
    studyTime -= 5;
    document.getElementById("studyTime").textContent = studyTime;
  }
});

document.getElementById("increaseTime").addEventListener("click", () => {
  studyTime += 5;
  document.getElementById("studyTime").textContent = studyTime;
});

// Study session timer setup
let interval;
let totalSeconds;
let timeRemaining;
let isPaused = false;

document.getElementById("startStudy").addEventListener("click", () => {
  totalSeconds = studyTime * 60;
  timeRemaining = totalSeconds;
  isPaused = false;

  // Switch to timer screen
  document.getElementById("studyTimeSelector").style.display = "none";
  document.getElementById("timerScreen").style.display = "flex";

  // Setup SVG circle
  const circle = document.querySelector(".progress-ring__circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = "0";

  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById("timeRemaining").textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

    const percent = (timeRemaining / totalSeconds) * 100;
    setProgress(percent);
  }

  updateDisplay();

  // Start countdown
  interval = setInterval(() => {
    if (!isPaused) {
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(interval);
        document.getElementById("timeRemaining").textContent = "Done!";
        setProgress(0);
      } else {
        updateDisplay();
      }
    }
  }, 1000);
});

// Pause/play toggle
document.getElementById("pausePlayBtn").addEventListener("click", () => {
  isPaused = !isPaused;
  if (isPaused) {
    document.getElementById("pausePlayBtn").style.backgroundImage =
      "url(play.png)";
  } else {
    document.getElementById("pausePlayBtn").style.backgroundImage =
      "url(pause.png)";
  }
});
