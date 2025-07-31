let box = document.getElementById("box");
let result = document.getElementById("result");
let scoreDisplay = document.getElementById("score");
let clickSound = document.getElementById("clickSound");
let gameOverSound = document.getElementById("gameOverSound");
let difficulty = document.getElementById("difficulty");
let restartBtn = document.getElementById("restartBtn");

let startTime;
let score = 0;
let misses = 0;
const maxMisses = 3;
let timeoutRef = null;
let gameOver = false;

function getDelay() {
  let diff = difficulty.value;
  if (diff === "easy") return 2000;
  if (diff === "medium") return 1000;
  return 600;
}

function setAnimatedBackground() {
  const r = Math.floor(Math.random() * 100 + 100);
  const g = Math.floor(Math.random() * 100 + 100);
  const b = Math.floor(Math.random() * 100 + 100);
  document.body.style.background = `radial-gradient(circle at ${Math.random()*100}vw ${Math.random()*100}vh, rgba(${r},${g},${b},0.3), #ffffff)`;
}

function makeBoxAppear() {
  if (gameOver) return;

  let top = Math.random() * (window.innerHeight - 100);
  let left = Math.random() * (window.innerWidth - 100);
  box.style.top = top + "px";
  box.style.left = left + "px";
  box.style.display = "block";
  startTime = new Date().getTime();

  setAnimatedBackground();

  timeoutRef = setTimeout(() => {
    if (box.style.display === "block") {
      box.style.display = "none";
      misses++;
      if (misses >= maxMisses) {
        gameOverSound.play();
        alert("😢 Game Over! You missed 3 times.\\nYour final score: " + score);
        gameOver = true;
        restartBtn.style.display = "inline-block";
      } else {
        appearAfterDelay();
      }
    }
  }, getDelay());
}

function appearAfterDelay() {
  clearTimeout(timeoutRef);
  setTimeout(makeBoxAppear, Math.random() * getDelay());
}

box.onclick = function () {
  let endTime = new Date().getTime();
  let reactionTime = (endTime - startTime) / 1000;
  result.textContent = "Your time: " + reactionTime + "s";
  score++;
  scoreDisplay.textContent = "Score: " + score;
  clickSound.play();
  box.style.display = "none";
  appearAfterDelay();
};

function resetGame() {
  score = 0;
  misses = 0;
  gameOver = false;
  result.textContent = "Your time will appear here.";
  scoreDisplay.textContent = "Score: 0";
  restartBtn.style.display = "none";
  box.style.display = "none";
  document.body.style.background = "#f0f0f0";
  appearAfterDelay();
}

restartBtn.onclick = resetGame;

appearAfterDelay();
