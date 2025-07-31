let box = document.getElementById("box");
let result = document.getElementById("result");
let scoreDisplay = document.getElementById("score");
let clickSound = document.getElementById("clickSound");
let difficulty = document.getElementById("difficulty");

let startTime;
let score = 0;
let misses = 0;
const maxMisses = 3;
let timeoutRef = null;

function getDelay() {
  let diff = difficulty.value;
  if (diff === "easy") return 2000;
  if (diff === "medium") return 1000;
  return 600;
}

function makeBoxAppear() {
  let top = Math.random() * (window.innerHeight - 100);
  let left = Math.random() * (window.innerWidth - 100);
  box.style.top = top + "px";
  box.style.left = left + "px";
  box.style.display = "block";
  startTime = new Date().getTime();

  // Set miss timer
  timeoutRef = setTimeout(() => {
    if (box.style.display === "block") {
      box.style.display = "none";
      misses++;
      if (misses >= maxMisses) {
        alert("😢 Game Over! You missed 3 times.\nYour final score: " + score);
        resetGame();
      } else {
        appearAfterDelay();
      }
    }
  }, getDelay());
}

function appearAfterDelay() {
  clearTimeout(timeoutRef); // Clear previous timer
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
  result.textContent = "Your time will appear here.";
  scoreDisplay.textContent = "Score: 0";
  box.style.display = "none";
}
appearAfterDelay();
