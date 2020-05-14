const simon = new Audio("audio/beep-6.wav");
const simonSound = new Audio("audio/beep20.wav");
const sound = new Audio("audio/robotbleep2.wav");

// state variable //
let gameArray = [];
let matchArray = true;
let round = 1;
let blinkCheck = 0;
let compTurn = true;
let winner = false;
let blink = 0;
let interval;
let tempo = 1000;
let tempoTwo = 1500;
let storedScores = [];

//cached Elements
const msgEl = document.getElementById("message");
const resetDiv = document.getElementById("resetDiv");
const resetBtn = document.getElementById("resetBtn");
const startDiv = document.getElementById("startDiv");
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const circleOne = document.getElementById("cir1");
const circleTwo = document.getElementById("cir2");
const circleThree = document.getElementById("cir3");
const circleFour = document.getElementById("cir4");
const score = document.getElementById("score");
const simonButtons = document.querySelectorAll(".circle-button");
const highScore = document.getElementById("high");
const storage = localStorage.setItem("scores", storedScores);

//event listeners

// Start Button
easy.addEventListener("click", startGame);

// Reset Button
resetBtn.addEventListener("click", function () {
  resetDiv.setAttribute("class", "hidden");
  startDiv.setAttribute("class", "game-button");
  score.innerHTML = 0;
  init();
});

function startGame(event) {
  if (event.target.innerText) {
    startDiv.setAttribute("class", "hidden");
    resetDiv.setAttribute("class", "game-button");
  }
  setTimeout(function () {
    play();
  }, 700);
}

medium.addEventListener("click", function () {
  if (event.target.innerText) {
    startDiv.setAttribute("class", "hidden");
    resetDiv.setAttribute("class", "game-button");
  }
  setTimeout(function () {
    mediumTempo();
    play();
  }, 700);
});

hard.addEventListener("click", function () {
  if (event.target.innerText) {
    startDiv.setAttribute("class", "hidden");
    resetDiv.setAttribute("class", "game-button");
  }
  setTimeout(function () {
    hardTempo();
    play();
  }, 700);
});

function init() {
  msgEl.innerHTML = `Press start to play`;
  gameArray = [];
  matchArray = true;
  round = 1;
  blinkCheck = 0;
  compTurn = true;
  winner = false;
  blink = 0;
  clearInterval(interval);
}

function play() {
  if (round === 1) {
    getRandomColor();
  }
  interval = setInterval(gameTurn, tempoTwo);
}

function getRandomColor() {
  for (let i = 0; i < 5; i++) {
    gameArray.push(Math.floor(Math.random() * 4) + 1);
  }
}

function gameTurn() {
  if (compTurn) {
    handleBlink();
    msgEl.innerHTML = "Follow the colors!";
    blink++;
  }

  if (blink === round) {
    clearInterval(interval);
    blink = 0;
    startPlayerTurn();
  }
}

function handleBlink() {
  if (gameArray[blink] === 1) {
    blinkButton(1);
  } else if (gameArray[blink] === 2) {
    blinkButton(2);
  } else if (gameArray[blink] === 3) {
    blinkButton(3);
  } else {
    blinkButton(4);
  }
}

function blinkButton(buttonNum) {
  if (buttonNum === 1) {
    circleOne.style.backgroundColor = "rgb(76, 116, 247)";
    sound.play();
    //simon.play();
    setTimeout(function () {
      circleOne.style.backgroundColor = "rgb(6, 34, 126)";
    }, tempo);
  } else if (buttonNum === 2) {
    circleTwo.style.backgroundColor = "rgb(77, 165, 96)";
    sound.play();
    //simon.play();
    setTimeout(function () {
      circleTwo.style.backgroundColor = "rgb(24, 90, 38)";
    }, tempo);
  } else if (buttonNum === 3) {
    circleThree.style.backgroundColor = "rgb(230, 97, 97)";
    //simonSound.play();
    sound.play();
    //simon.play();
    setTimeout(function () {
      circleThree.style.backgroundColor = "rgb(163, 10, 10)";
    }, tempo);
  } else {
    circleFour.style.backgroundColor = "rgb(243, 243, 106)";
    sound.play();
    //simon.play();
    setTimeout(function () {
      circleFour.style.backgroundColor = "rgb(185, 185, 11)";
    }, tempo);
  }
}

function startPlayerTurn() {
  setTimeout(function () {
    msgEl.innerHTML = `Press the correct colors!`;
  }, 500);
  // setTimeout(function () {
  //   if (round === 1) {
  //     msgEl.innerHTML = `Good Job! You got ${blinkCheck} in a row!!`;
  //   } else if (round === 2) {
  //     msgEl.innerHTML = `Way to go! That's ${blinkCheck}! Keep it up!`;
  //   } else if (round === 3) {
  //     msgEl.innerHTML = `Congratulations! You're memory is no match for this game!
  //   Press restart to try again!`;
  //     endGame();
  //     return;
  //   }
  // }, 1200);
  for (let i = 0; i < simonButtons.length; i++) {
    simonButtons[i].removeAttribute("disabled");
  }
}

function endPlayerTurn() {
  for (let i = 0; i < simonButtons.length; i++) {
    simonButtons[i].setAttribute("disabled", true);
  }
  setTimeout(function () {
    if (round === gameArray.length - 5) {
      msgEl.innerHTML = `Good Job! You got ${round - 1} in a row!!`;
    } else if (round === gameArray.length - 1) {
      msgEl.innerHTML = `Congratulations! You're memory is no match for this game!
      Press restart to try again!`;
      endGame();
    }
  }, 1200);
  blinkCheck = 0;
  compTurn = true;
  round++;
  play();
}

// Circle Buttons

function handleSimonButton(buttonNum) {
  blinkButton(buttonNum);
  if (gameArray[blinkCheck] !== buttonNum) {
    msgEl.innerHTML = `Wrong answer! Press restart to try again!`;
    return;
  }

  if (blinkCheck === round - 1) {
    endPlayerTurn();
    score.innerHTML = round - 1;
  } else {
    blinkCheck++;
  }
}

circleOne.addEventListener("click", function () {
  handleSimonButton(1);
});
circleTwo.addEventListener("click", function () {
  handleSimonButton(2);
});
circleThree.addEventListener("click", function () {
  handleSimonButton(3);
});
circleFour.addEventListener("click", function () {
  handleSimonButton(4);
});

function mediumTempo() {
  tempoTwo = 1200;
  if (round < 3 && round < 6) {
    tempo = 900;
  } else if (round > 6 && round < 10) {
    tempo = 700;
  } else {
    tempo = 400;
  }
}

function hardTempo() {
  tempoTwo = 1000;
  if (round < 6) {
    tempo = 600;
  } else if (round >= 6 && round < 11) {
    tempo = 500;
  } else {
    tempo = 400;
  }
}

function endGame() {
  for (let i = 0; i < simonButtons.length; i++) {
    simonButtons[i].setAttribute("disabled", true);
  }
  compTurn = false;
  gameArray = [];
  matchArray = true;
  round = 1;
  blinkCheck = 0;
  winner = false;
  blink = 0;
  clearInterval(interval);
  return;
}
