document.addEventListener("DOMContentLoaded", () => {
  const studyButton = document.getElementById("studyButton");
  const colorCircles = document.getElementById("colorCircles");
  const studyTimeMenu = document.getElementById("studyTimeMenu");
  const decreaseTimeButton = document.getElementById("decreaseTime");
  const increaseTimeButton = document.getElementById("increaseTime");
  const studyTimeDisplay = document.getElementById("studyTime");
  const startStudyButton = document.getElementById("startStudy");
  const audioPlayer = document.getElementById("audioPlayer");
  const songSelector = document.getElementById("songSelector");
  const muteButton = document.getElementById("muteButton");
  const audioElement = document.getElementById("audio");
  const audioSource = document.getElementById("audioSource");
  const stopStudyButton = document.getElementById("stopStudyButton");
  const timerDisplay = document.getElementById("timerDisplay");

  let studyTime = 25; // default study time (in minutes)
  let timer;
  let isMuted = false;
  let timeLeft;

  // Function to generate random circles and animate them
  function createColorCircle() {
    const colors = [
      "#FF6347",
      "#FFD700",
      "#32CD32",
      "#1E90FF",
      "#FF1493",
      "#20B2AA",
    ];
    const circle = document.createElement("div");
    const size = Math.random() * 100 + 50; // Random size between 50px and 150px
    const left = Math.random() * window.innerWidth;
    const top = Math.random() * window.innerHeight;
    const color = colors[Math.floor(Math.random() * colors.length)];
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.position = "absolute";
    circle.style.top = `${top}px`;
    circle.style.left = `${left}px`;
    circle.style.backgroundColor = color;
    circle.style.borderRadius = "50%";
    circle.style.opacity = 0;
    circle.style.animation = `expandCircle 2s forwards`;

    colorCircles.appendChild(circle);

    setTimeout(() => {
      circle.style.opacity = 1;
    }, 0);

    // Remove the circle after animation
    setTimeout(() => {
      circle.remove();
    }, 2000);
  }

  // Animation keyframes for expanding circles
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `
      @keyframes expandCircle {
        0% { transform: scale(0); opacity: 0; }
        100% { transform: scale(5); opacity: 1; }
      }
    `,
    styleSheet.cssRules.length
  );

  // Handle button click to trigger animation
  studyButton.addEventListener("click", () => {
    // Hide the button and show the menu after animation
    studyButton.style.display = "none";
    setTimeout(() => {
      studyTimeMenu.style.display = "block";
    }, 2000);

    // Create multiple random color circles
    for (let i = 0; i < 10; i++) {
      createColorCircle();
    }
  });

  // Update study time when user clicks +/- buttons
  decreaseTimeButton.addEventListener("click", () => {
    if (studyTime > 5) {
      studyTime -= 5;
      studyTimeDisplay.textContent = studyTime;
    }
  });

  increaseTimeButton.addEventListener("click", () => {
    studyTime += 5;
    studyTimeDisplay.textContent = studyTime;
  });

  // Start study session when button clicked
  startStudyButton.addEventListener("click", () => {
    // Hide the menu and show the audio player
    studyTimeMenu.style.display = "none";
    audioPlayer.style.display = "block";

    // Start the timer
    startTimer(studyTime);
  });

  // Start the timer
  function startTimer(minutes) {
    timeLeft = minutes * 60;
    timer = setInterval(() => {
      timeLeft--;
      displayTimeLeft();
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Study session complete!");
      }
    }, 1000);
  }

  // Display the time left in the format MM:SS
  function displayTimeLeft() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }

  // Handle song selection
  songSelector.addEventListener("change", (event) => {
    const song = event.target.value;
    audioSource.src = `${song}.mp3`;
    audioElement.load();
    audioElement.play();
  });

  // Handle mute button
  muteButton.addEventListener("click", () => {
    if (isMuted) {
      audioElement.muted = false;
      muteButton.textContent = "Mute";
    } else {
      audioElement.muted = true;
      muteButton.textContent = "Unmute";
    }
    isMuted = !isMuted;
  });

  // Stop study session and go back to timer screen
  stopStudyButton.addEventListener("click", () => {
    clearInterval(timer); // Stop the timer
    audioElement.pause(); // Stop the audio
    audioElement.currentTime = 0; // Reset audio
    audioPlayer.style.display = "none";
    studyTimeMenu.style.display = "block"; // Show the timer menu again
    studyButton.style.display = "inline-block"; // Show the study button again
  });
});
