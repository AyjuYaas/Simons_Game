const colors = ["green", "red", "yellow", "blue"];
let level = 0;
let counter = 0;
let pattern = [];
let userPattern = [];
let isReady = false;
let finishPattern = false;
const header = $("h1")[0];

$(document).keydown(function () {
  if (!isReady) {
    isReady = true;
    generateSequence();
  }
});
$(document).click(function () {
  if (!isReady) {
    isReady = true;
    generateSequence();
  }
});

async function generateSequence() {
  finishPattern = false;
  await sleep(200);
  level++;
  userPattern = [];
  pattern = [];
  counter = 0;
  header.innerHTML = "Level " + level;
  let de = 200;
  for (let i = 0; i < level; i++) {
    let random = Math.floor(Math.random() * 4);
    pattern.push(random);
    choosenColor = colors[random];
    $(`#${choosenColor}`).fadeIn(150).fadeOut(150).fadeIn(150);
    await sleep(400);
  }
  finishPattern = true;
  console.log(pattern);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

$(".box").click(function (check) {
  if (finishPattern) {
    let userClick = check.currentTarget.classList[1];
    pressed(userClick);
    let index = colors.indexOf(userClick);
    userPattern.push(index);
    counter++;
    if (counter === level) {
      checkAnswer();
    }
  }
});

function pressed(userColor) {
  if (isReady) {
    $(`#${userColor}`).addClass("change");
    setTimeout(function () {
      $(`#${userColor}`).removeClass("change");
    }, 150);
  }
}

function checkAnswer() {
  if (!arraysEqual(pattern, userPattern)) {
    gameOver();
  } else {
    generateSequence();
  }
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function gameOver() {
  level = 0;
  header.innerHTML = "Game Over, Press Anywhere to Start Again!";
  setTimeout(function () {
    isReady = false;
  }, 500);
}
