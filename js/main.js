// state variable //
let gameArray = [];
let matchArray = true;
let round = 1;
let blinkCheck = 0;
let compTurn = true;
let winner = false;
let blink = 0;
let interval;

//cached Elements
const msgEl = document.getElementById('message');
const resetDiv = document.getElementById('resetDiv');
const resetBtn = document.getElementById('resetBtn');
const startDiv = document.getElementById('startDiv');
const startBtn = document.getElementById('startBtn');
const circleOne = document.getElementById('cir1');
const circleTwo = document.getElementById('cir2');
const circleThree = document.getElementById('cir3');
const circleFour = document.getElementById('cir4');
const score = document.getElementById('score');
const simonButtons = document.querySelectorAll('.circleButton');

//event listeners

// Start Button
startBtn.addEventListener('click', startGame);

// Reset Button
resetBtn.addEventListener('click', function () {
  resetDiv.setAttribute('class', 'hidden');
  startDiv.setAttribute('class', '');
  score.innerHTML = 0;
  init();
});

function startGame(event) {
  if (event.target.innerText) {
    startDiv.setAttribute('class', 'hidden');
    resetDiv.setAttribute('class', '');
  }
  setTimeout(function () {
    play();
  }, 700);
}

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
  msgEl.innerHTML = 'Follow the colors!';
  if (round === 1) {
    getRandomColor();
  }
  interval = setInterval(gameTurn, 800);
}

function getRandomColor() {
  for (let i = 0; i < 20; i++) {
    gameArray.push(Math.floor(Math.random() * 4) + 1);
  }
}

function gameTurn() {
  if (compTurn) {
    handleBlink();
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
    circleOne.style.backgroundColor = 'rgb(76, 116, 247)';
    setTimeout(function () {
      circleOne.style.backgroundColor = 'rgb(6, 34, 126)';
    }, 300);
  } else if (buttonNum === 2) {
    circleTwo.style.backgroundColor = 'rgb(77, 165, 96)';
    setTimeout(function () {
      circleTwo.style.backgroundColor = 'rgb(24, 90, 38)';
    }, 300);
  } else if (buttonNum === 3) {
    circleThree.style.backgroundColor = 'rgb(230, 97, 97)';
    setTimeout(function () {
      circleThree.style.backgroundColor = 'rgb(163, 10, 10)';
    }, 300);
  } else {
    circleFour.style.backgroundColor = 'rgb(243, 243, 106)';
    setTimeout(function () {
      circleFour.style.backgroundColor = 'rgb(185, 185, 11)';
    }, 300);
  }
}

function startPlayerTurn() {
  setTimeout(function () {
    msgEl.innerHTML = `Press the correct colors!`
  }, 500)
  setTimeout(function () {
    if (round === 5) {
      msgEl.innerHTML = `Good Job! You got ${round} in a row!!`
    } else if (round === 10) {
      msgEl.innerHTML = `Way to go! That's ${round}! Keep it up!`
    } else if (round === 20) {
      msgEl.innerHTML = `Congratulations! You're memory is no match for this match!
    Press restart to try again!`;
      init();
    }
  }, 1200);
  for (let i = 0; i < simonButtons.length; i++) {
    simonButtons[i].removeAttribute('disabled');
  }
}

function endPlayerTurn() {
  for (let i = 0; i < simonButtons.length; i++) {
    simonButtons[i].setAttribute('disabled', true);
  }
  blinkCheck = 0;
  compTurn = true;
  round++;
  play();
}

// Circle Buttons

function handleSimonButton(buttonNum) {
  blinkButton(buttonNum);
  if (gameArray[blinkCheck] !== buttonNum) {
    msgEl.innerHTML = `Wrong answer!! Ready to try again?
  Press reset to test your memory!`
    endPlayerTurn();
  }
  score.innerHTML = round;

  if (blinkCheck === round - 1) {
    endPlayerTurn();
  } else {
    blinkCheck++;
  }
}

circleOne.addEventListener('click', function () {
  handleSimonButton(1);
});
circleTwo.addEventListener('click', function () {
  handleSimonButton(2);
});
circleThree.addEventListener('click', function () {
  handleSimonButton(3);
});
circleFour.addEventListener('click', function () {
  handleSimonButton(4);
});