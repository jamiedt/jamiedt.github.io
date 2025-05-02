// when study button is clicked, i learned that you dont have to name functions but you
// can simply run them everytime a button is clicked and have it all contained within
// the event listener
document.getElementById("study").addEventListener("click", () => {
  const circle = document.getElementById("circleOverlay");
  const mainContent = document.getElementById("mainContent");
  const startPage = document.getElementById("startPage");

  // animate circle to cover the whole screen
  circle.style.width = "3000px";
  circle.style.height = "3000px";

  // wait for circle to cover screen
  setTimeout(() => {
    startPage.style.display = "none";
    mainContent.style.display = "flex";
    void mainContent.offsetWidth;
    mainContent.style.transform = "translateY(0)";
    mainContent.style.opacity = "1";
  }, 1000);
});

// adding and subrtacting time starts at 25 min
let studyTime = 25;

document.getElementById("decreaseTime").addEventListener("click", () => {
  // minimum time is 5 min goes up and down in 5s
  if (studyTime > 5) {
    studyTime -= 5;
    document.getElementById("studyTime").textContent = studyTime;
  }
});

document.getElementById("increaseTime").addEventListener("click", () => {
  studyTime += 5;
  document.getElementById("studyTime").textContent = studyTime;
});

// study session timer setup
let interval;
let totalSeconds;
let timeRemaining;
let isPaused = false;
let audioOn = true;

document.getElementById("startStudy").addEventListener("click", () => {
  // calculate seconds
  totalSeconds = studyTime * 60;
  timeRemaining = totalSeconds;
  isPaused = false;

  // switch to timer screen
  const studyTimeSelector = document.getElementById("studyTimeSelector");
  const timerScreen = document.getElementById("timerScreen");

  // fades in and out for smooth transition
  studyTimeSelector.style.opacity = "0";
  setTimeout(() => {
    studyTimeSelector.style.display = "none";
    timerScreen.style.display = "flex";
    void timerScreen.offsetWidth;
    timerScreen.style.opacity = "1";
  }, 500);

  // setup timer circle
  const pcircle = document.querySelector(".progress-ring__circle");
  const radius = pcircle.r.baseVal.value;
  // circle maths
  const circumference = 2 * Math.PI * radius;

  pcircle.style.strokeDasharray = `${circumference}`;
  pcircle.style.strokeDashoffset = "0";

  // changing dash offset to percentage of time left so the sector gets smaller
  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    pcircle.style.strokeDashoffset = offset;
  }
  // updates clock (i had help online to do this)
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

  // start countdown and updates every 1 second
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

  const audio = document.getElementById("studyAudio");
  if (audioOn) {
    audio.play();
  }
});

// pause/play toggle
document.getElementById("pausePlayBtn").addEventListener("click", () => {
  // changes boolean then changes the icon when toggled
  isPaused = !isPaused;
  if (isPaused) {
    document.getElementById("pausePlayBtn").style.backgroundImage =
      "url(img/play.png)";
    document.getElementById("timeRemaining").textContent = "Paused";
  } else {
    document.getElementById("pausePlayBtn").style.backgroundImage =
      "url(img/pause.png)";
  }
});

// back button
document.getElementById("backBtn").addEventListener("click", () => {
  const studyTimeSelector = document.getElementById("studyTimeSelector");
  const timerScreen = document.getElementById("timerScreen");
  const audio = document.getElementById("studyAudio");

  timerScreen.style.opacity = "0";
  // waits for it to fade out
  setTimeout(() => {
    timerScreen.style.display = "none";
    studyTimeSelector.style.display = "block";
    void studyTimeSelector.offsetWidth;
    studyTimeSelector.style.opacity = "1";
    document.getElementById("pausePlayBtn").style.backgroundImage =
      "url(img/pause.png)";
  }, 500);
  // makes sure to reset the timer and pause the audio when leaving
  clearInterval(interval);
  audio.pause();
});

// mute and unmute audio buttons
// i decided to only include a mute and unmute button for the audio player
// my reason for this is that i want to keep screen distractions to a minimum
// as it is a study website so the less buttons the better and a simple mute unmute
// button is good so that users can decide whether or not they want music while stufying
document.getElementById("muteUnmute").addEventListener("click", () => {
  audioOn = !audioOn;
  const audio = document.getElementById("studyAudio");
  if (!audioOn) {
    audio.pause();
    document.getElementById("muteUnmute").style.backgroundImage =
      "url(img/mute.png)";
    document.getElementById("nowPlaying").textContent = "";
  } else {
    document.getElementById("muteUnmute").style.backgroundImage =
      "url(img/unmute.png)";
    audio.play();
    // popup that shows when youre playing music
    document.getElementById("nowPlaying").textContent =
      "Now playing: Lo-Fi Beats";
  }
});
