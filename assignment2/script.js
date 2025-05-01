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
