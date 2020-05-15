//Audio files
const sound = new Audio("audio/robotbleep2.wav");
const yahoo = new Audio("audio/yahoo.wav");

// state variable //
let solutionSequence = [];
let solutionSequenceIndex = 0;
let roundBlinkCount = 0;
let roundInterval;
let blinkDuration = 1000;
let blinkGapDuration = 1500;
let highScore = getHighScore() || 0;
let currentRound = 1;
let currentScore = 0;
let isWinner = false;

//cached Elements
const msgEl = document.getElementById("message");
const restartDiv = document.getElementById("restartDiv");
const restartBtn = document.getElementById("restartBtn");
const startDiv = document.getElementById("startDiv");
const easyElement = document.getElementById("easy");
const mediumElement = document.getElementById("medium");
const hardElement = document.getElementById("hard");
const blueSimonButton = document.getElementById("blue-simon-button");
const greenSimonButton = document.getElementById("green-simon-button");
const redSimonButton = document.getElementById("red-simon-button");
const yellowSimonButton = document.getElementById("yellow-simon-button");
const currentScoreElement = document.getElementById("score");
const simonButtons = document.querySelectorAll(".simon-button");
const highScoreElement = document.getElementById("high-score-board");


highScoreElement.innerHTML = highScore;

//event listeners
//Difficulty buttons
easyElement.addEventListener("click", startGame);

function startGame(event) {
  if (event.target.innerText) {
    startDiv.setAttribute("class", "hidden");
    restartDiv.setAttribute("class", "game-button");
  }
  setTimeout(function () {
    playGameSequence();
  }, 700);
}
mediumElement.addEventListener("click", function () {
  if (event.target.innerText) {
    startDiv.setAttribute("class", "hidden");
    restartDiv.setAttribute("class", "game-button");
  }
  setTimeout(function () {
    setMediumTempo();
    playGameSequence();
  }, 700);
});
hardElement.addEventListener("click", function () {
  if (event.target.innerText) {
    startDiv.setAttribute("class", "hidden");
    restartDiv.setAttribute("class", "game-button");
  }
  setTimeout(function () {
    setHardTempo();
    playGameSequence();
  }, 700);
});


// Reset Button
restartBtn.addEventListener("click", restart);



function restart() {
  msgEl.innerHTML = `Press start to play`;
  restartDiv.setAttribute("class", "hidden");
  startDiv.setAttribute("class", "game-button");
  score.innerHTML = 0;
  solutionSequence = [];
  currentRound = 1;
  solutionSequenceIndex = 0;
  roundBlinkCount = 0;
  isWinner = false;
  currentScore = 0;
  clearInterval(roundInterval);
}


function playGameSequence() {
  msgEl.innerHTML = "Follow the colors!";
  if (currentRound === 1) {
    generateSolutionSequence();
  }
  roundInterval = setInterval(playGameBlink, blinkGapDuration);
}

function playGameBlink() {
  handleBlink();
  roundBlinkCount++;

  if (roundBlinkCount === currentRound) {
    endGameTurn();
  }
}

function endGameTurn() {
  clearInterval(roundInterval);
  roundBlinkCount = 0;
  startPlayerTurn();
}

function generateSolutionSequence() {
  for (let i = 0; i < 4; i++) {
    solutionSequence.push(Math.floor(Math.random() * 4) + 1);
  }
}
//Function handles which colors flashes based on the number given
function handleBlink() {
  if (solutionSequence[roundBlinkCount] === 1) {
    handleButtonBlink(1);
  } else if (solutionSequence[roundBlinkCount] === 2) {
    handleButtonBlink(2);
  } else if (solutionSequence[roundBlinkCount] === 3) {
    handleButtonBlink(3);
  } else {
    handleButtonBlink(4);
  }
}
//Function takes care of the color flash, sound play, and sound volume, and tempo.  
function handleButtonBlink(buttonNum) {
  if (buttonNum === 1) {
    blueSimonButton.style.backgroundColor = "rgb(76, 116, 247)";
    sound.volume = 0.2;
    sound.play();
    setTimeout(function () {
      blueSimonButton.style.backgroundColor = "rgb(6, 34, 126)";
    }, blinkDuration);
  } else if (buttonNum === 2) {
    greenSimonButton.style.backgroundColor = "rgb(77, 165, 96)";
    sound.volume = 0.2;
    sound.play();
    setTimeout(function () {
      greenSimonButton.style.backgroundColor = "rgb(24, 90, 38)";
    }, blinkDuration);
  } else if (buttonNum === 3) {
    redSimonButton.style.backgroundColor = "rgb(230, 97, 97)";
    sound.volume = 0.2;
    sound.play();
    setTimeout(function () {
      redSimonButton.style.backgroundColor = "rgb(163, 10, 10)";
    }, blinkDuration);
  } else {
    yellowSimonButton.style.backgroundColor = "rgb(243, 243, 106)";
    sound.volume = 0.2;
    sound.play();
    setTimeout(function () {
      yellowSimonButton.style.backgroundColor = "rgb(185, 185, 11)";
    }, blinkDuration);
  }
}
//start player turn, enables color buttons 
function startPlayerTurn() {
  setTimeout(function () {
    msgEl.innerHTML = `Press the correct colors!`;
  }, 500);
  for (let i = 0; i < simonButtons.length; i++) {
    simonButtons[i].removeAttribute("disabled");
  }
}
//End players turn, disables color buttons, give messages at certain points of the game
//give a win message at the end of the game.  Switches to comp turn
function endPlayerTurn() {
  disableButtons();
  currentScore++;
  if (currentScore === solutionSequence.length - 2) {
    setTimeout(function () {
      msgEl.innerHTML = `Good Job! You got ${currentScore} in a row!!`;
    }, 1000)
  } else if (currentScore === solutionSequence.length) {
    isWinner = true
    return endGame();
  }

  currentRound++;
  if (currentScore > highScore) {
    setHighScore(currentScore);
    highScoreElement.innerHTML = currentScore;
  }

  currentScoreElement.innerHTML = currentScore;
  solutionSequenceIndex = 0;
  playGameSequence();
}

// Function handles the color buttons right or wrong.  If correct turns player turn
// off and starts comp turn

function handleSimonButtonClick(buttonNum) {
  handleButtonBlink(buttonNum);
  if (solutionSequence[solutionSequenceIndex] !== buttonNum) {
    endGame()
  }

  if (solutionSequenceIndex === currentScore) {
    endPlayerTurn();
  } else {
    solutionSequenceIndex++;
  }
}

blueSimonButton.addEventListener("click", function () {
  handleSimonButtonClick(1);
});
greenSimonButton.addEventListener("click", function () {
  handleSimonButtonClick(2);
});
redSimonButton.addEventListener("click", function () {
  handleSimonButtonClick(3);
});
yellowSimonButton.addEventListener("click", function () {
  handleSimonButtonClick(4);
});

//Function holds the most recent high score
function getHighScore() {
  return localStorage.getItem("highScore");
}
//Put the high score on the page
//function set the local storage and checks to see if there is a higher round
function setHighScore(currentScore) {
  if (currentScore + 1 > highScore) {
    localStorage.setItem("highScore", currentScore);
  }
}

//Function in control of the medium difficulty setting the tempo and tempoTwo for the game
function setMediumTempo() {
  blinkGapDuration = 1200;
  if (currentRound < 3 && currentRound < 6) {
    blinkDuration = 900;
  } else if (currentRound > 6 && currentRound < 10) {
    blinkDuration = 700;
  } else {
    blinkDuration = 400;
  }
}
//Function in control of the hard difficulty
function setHardTempo() {
  blinkGapDuration = 1000;
  if (currentRound < 6) {
    blinkDuration = 600;
  } else if (currentRound >= 6 && currentRound < 11) {
    blinkDuration = 500;
  } else {
    blinkDuration = 400;
  }
}
//Function ends the game, disabling the color buttons when game is ended
//and puts setting back to all square
function endGame() {
  disableButtons();
  if (isWinner) {
    msgEl.innerHTML = `Congratulations! You're memory is too great for this game!
    Press restart and play again!`;
    yahoo.play();
  } else {
    msgEl.innerHTML = `Wrong answer! Press restart to try again!`;
  }
}

function disableButtons() {
  for (let i = 0; i < simonButtons.length; i++) {
    simonButtons[i].setAttribute("disabled", true);
  }
}