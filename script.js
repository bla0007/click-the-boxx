
let box = document.getElementById("box");
let result = document.getElementById("result");
let scoreDisplay = document.getElementById("score");
let clickSound = document.getElementById("clickSound");
let difficulty = document.getElementById("difficulty");

let startTime;
let score = 0;

function getDelay() {
  let diff = difficulty.value;
  if (diff === "easy") return 2000;
  if (diff === "medium") return 1000;
  return 500;
}

function makeBoxAppear() {
  let top = Math.random() * 300;
  let left = Math.random() * 300;
  box.style.top = top + "px";
  box.style.left = left + "px";
  box.style.display = "block";
  startTime = new Date().getTime();
}

function appearAfterDelay() {
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

appearAfterDelay();
