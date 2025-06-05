// directs user back to home page when esc is pressed
document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    location.href = "index.html";
  }
});

const startButton = document.getElementById("startButton");
// listens for start button click
startButton.addEventListener("click", () => startClickGame(startButton));

let hoverTimer = "";

// function for when user is hovering over with the correct shape but then
// scrolls and changes their shape so that the error animation plays
function cancelHover() {
  clearTimeout(hoverTimer);
  target.classList.remove("hovering");
  target.classList.add("wrong");
  target.classList.add("wrongColor");
  window.removeEventListener("wheel", cancelHover);
  setTimeout(() => {
    target.classList.remove("wrong");
  }, 500);
}

// listens for when mouse hovers over the target
target.addEventListener("mouseenter", () => {
  // searches classes to figure out what the current target shape is
  let targetShape = "";
  for (let i = 0; i < shapes.length; i++) {
    if (target.classList.contains(shapes[i])) {
      targetShape = shapes[i];
      break;
    }
  }
  // conditional statement to add hover animation and add to score if shape is correct
  if (currentCursorShape == targetShape) {
    target.classList.add("hovering");
    window.addEventListener("wheel", cancelHover);
    hoverTimer = setTimeout(() => {
      target.classList.remove("hovering");
      window.removeEventListener("wheel", cancelHover);
      moveScaleTarget();
    }, 1000);
    // otherwise play wrong shape animation
  } else {
    target.classList.add("wrong");
    target.classList.add("wrongColor");
    setTimeout(() => {
      target.classList.remove("wrong");
    }, 500);
  }
});

// if mouse leaves the target early get rid of all aniations and classes
target.addEventListener("mouseleave", () => {
  clearTimeout(hoverTimer);
  target.classList.remove("hovering");
  target.classList.remove("wrongColor");
});

function startClickGame(inputButton) {
  const score = document.getElementById("score");
  const target = document.getElementById("target");
  const hint = document.getElementById("hint");
  var timer = document.getElementById("timer");
  // gets rid of start button or play again button when pressed
  inputButton.style.display = "none";
  // puts score baclk in the top right if it wasnt there already
  score.classList.remove("scaled");
  target.style.display = "block";
  timer.style.display = "block";
  hint.style.display = "none";
  //starts timer
  const myTimer = setInterval(updateTimer, 1000);
  let time = 20;
  function updateTimer() {
    time--;
    timer.innerHTML = `Time Remaining: ${time}s`;
  }
  //stops timer
  function stopTimer() {
    clearInterval(myTimer);
  }
  // starts cursor scroll function
  startCursor();
  // adds first target
  firstScaleTarget();
  // after 20 seconds the game ends and the score screen shows up with play again button
  setTimeout(() => {
    stopTimer();
    // changes cursor back to normal
    document.body.style.cursor = "default";
    timer.innerHTML = "Time Remaining: 20s";
    target.style.display = "none";
    timer.style.display = "none";
    hint.style.display = "block";
    score.classList.add("scaled");
    const playAgainButton = document.getElementById("playAgainButton");
    playAgainButton.style.display = "block";
    playAgainButton.addEventListener("click", () =>
      startClickGame(playAgainButton)
    );
  }, 20000);
}

// first time target is scaled in an instance score is reset to 0
function firstScaleTarget() {
  score = 0;
  document.getElementById("score").textContent = "Score: " + score;
  target.style.transition = "none";
  target.style.transform = "scale(0)";
  // makes target a random shape
  assignRandomShape(target);
  // places target in a random location within the window but slightly lower than the top
  // so that the targets dont clash with the timer and the other text
  target.style.left = Math.random() * (window.innerWidth - 50) + "px";
  target.style.top = Math.random() * (window.innerHeight - 80) + 30 + "px";
  // refreshes animations to include transitions
  target.offsetHeight;
  target.style.transition = "transform 1s ease-in-out";
  target.style.transform = "scale(1)";
}

// every other time +1 score is added each time
function moveScaleTarget() {
  score += 1;
  document.getElementById("score").textContent = "Score: " + score;
  target.style.transition = "none";
  target.style.transform = "scale(0)";
  assignRandomShape(target);
  target.style.left = Math.random() * (window.innerWidth - 50) + "px";
  target.style.top = Math.random() * (window.innerHeight - 80) + 30 + "px";
  target.offsetHeight;
  target.style.transition = "transform 1s ease-in-out";
  target.style.transform = "scale(1)";
}

let currentCursorShape = "circle";

function startCursor() {
  // dictionary of cursor images
  const cursors = [
    "cursors/circle.png",
    "cursors/square.png",
    "cursors/triangle.png",
  ];

  // starts with index 0 which is a circle
  let cursorIndex = 0;
  currentCursorShape = shapes[cursorIndex];

  requestAnimationFrame(() => {
    document.body.style.cursor = `url(${cursors[cursorIndex]})16 16, auto`;
  });

  let scrollTimeout;

  window.addEventListener("wheel", scrollWheel);

  // gets rid of the cursor scrolling effect
  setTimeout(() => {
    window.removeEventListener("wheel", scrollWheel);
  }, 20000);

  function scrollWheel(e) {
    if (scrollTimeout) return;
    // makes scroll image go froward or back depending if the user scrolls up or down
    if (e.deltaY > 0) {
      cursorIndex = (cursorIndex + 2) % cursors.length;
      document.body.style.cursor = `url(${cursors[cursorIndex]})16 16, auto`;
      currentCursorShape = shapes[cursorIndex];
    } else {
      cursorIndex = (cursorIndex + 1) % cursors.length;
      document.body.style.cursor = `url(${cursors[cursorIndex]})16 16, auto`;
      currentCursorShape = shapes[cursorIndex];
    }

    // makes it so scrolling can only change once every 300ms to stop uncontrollable scrolling
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
    }, 300);
  }
}

// shape name dictionary
const shapes = ["circle", "square", "triangle"];

function assignRandomShape(target) {
  // remove any existing shape classes
  shapes.forEach((shape) => target.classList.remove(shape));

  // pick a random shape
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

  // add the new shape class
  target.classList.add(randomShape);
}
