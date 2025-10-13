document.addEventListener("DOMContentLoaded", () => {
  const titleScreen = document.getElementById("title-screen");
  const gameScreen = document.getElementById("game-screen");
  const board = document.getElementById("game-board");
  const winMessage = document.getElementById("win-message");
  const restartBtn = document.getElementById("restartBtn");
  const backBtn = document.getElementById("backBtn");
  const modeTitle = document.getElementById("mode-title");

  // Provide enough images for hard mode (32 cards = 16 pairs)
  const cardImages = [
    "img/Group 36.png",
    "img/Group 44.png",
    "img/Group 45.png",
    "img/Group 46.png",
    "img/Group 47.png",
    "img/Group 48.png",
    "img/Group 49.png",
    "img/Group 50.png",
    "img/Group 51.png",
    "img/Group 52.png",
    "img/Group 53.png",
    "img/Group 54.png",
    "img/Group 60.png",
    "img/Group 61.png",
    "img/Group 62.png",
    "img/Group 63.png",
  ];

  let cards = [];
  let flippedCards = [];
  let matchedCount = 0;
  let currentCols = 0;
  let currentRows = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function startGame(cols, rows) {
    currentCols = cols;
    currentRows = rows;

    // Swap columns and rows if on a small/mobile screen
    if (window.innerWidth < 768) {
      const temp = cols;
      cols = rows;
      rows = temp;
    }

    titleScreen.style.display = "none";
    gameScreen.style.display = "block";

    board.innerHTML = "";
    winMessage.style.display = "none";
    matchedCount = 0;
    flippedCards = [];

    const totalCards = cols * rows;

    // Shuffle the full image list first so selection changes each game
    const shuffledImages = shuffle([...cardImages]);

    // Pick only as many as needed for this board
    const neededImages = shuffledImages.slice(0, totalCards / 2);

    // Duplicate pairs and shuffle again for random board layout
    cards = shuffle([...neededImages, ...neededImages]);

    // Responsive grid
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    board.style.setProperty("--rows", rows);

    cards.forEach((imgSrc, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.image = imgSrc;
      card.dataset.index = index;

      const inner = document.createElement("div");
      inner.className = "card-inner";

      const front = document.createElement("div");
      front.className = "card-front";

      const back = document.createElement("div");
      back.className = "card-back";
      const img = document.createElement("img");
      img.src = imgSrc;
      back.appendChild(img);

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);

      // Add to board (hidden initially)
      board.appendChild(card);
    });
    // Disable interactions during animation
    board.style.pointerEvents = "none";

    function animateCardsRipple() {
      const cardElements = Array.from(board.querySelectorAll(".card"));

      // Disable board and buttons
      board.style.pointerEvents = "none";
      restartBtn.disabled = true;
      backBtn.disabled = true;
      cardElements.forEach((c) => (c.style.pointerEvents = "none"));

      // Reset cards for animation
      cardElements.forEach((c) => {
        c.classList.remove("loaded", "flipped", "matched");
        c.style.opacity = 0;
        c.style.transform = "scale(0.5) rotateY(90deg)";
      });

      // Animate column by column
      for (let col = 0; col < currentCols; col++) {
        const colCards = [];
        for (let row = 0; row < currentRows; row++) {
          const index = row * currentCols + col;
          colCards.push(cardElements[index]);
        }

        setTimeout(() => {
          colCards.forEach((card) => card.classList.add("loaded"));
        }, col * 150); // 150ms between columns
      }

      // Re-enable interactions after last column animates
      setTimeout(() => {
        board.style.pointerEvents = "auto";
        restartBtn.disabled = false;
        backBtn.disabled = false;
        cardElements.forEach((c) => (c.style.pointerEvents = "auto"));
      }, currentCols * 150 + 600); // 600ms = duration of card animation
    }

    animateCardsRipple();
  }

  function flipCard(e) {
    const card = e.currentTarget;
    if (
      card.classList.contains("flipped") ||
      card.classList.contains("matched") ||
      flippedCards.length === 2
    )
      return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedCount += 2;
      flippedCards = [];
      if (matchedCount === cards.length) {
        winMessage.style.display = "block";
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }

  // Button listeners
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cols = parseInt(btn.dataset.cols);
      const rows = parseInt(btn.dataset.rows);
      startGame(cols, rows);
    });
  });

  restartBtn.addEventListener("click", () => {
    startGame(currentCols, currentRows);
  });

  backBtn.addEventListener("click", () => {
    gameScreen.style.display = "none";
    titleScreen.style.display = "block";
  });
});
