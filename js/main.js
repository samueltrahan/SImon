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
    circleOne.style.backgroundColor = '#00008B';
    setTimeout(function () {
      circleOne.style.backgroundColor = 'rgb(76, 116, 247)';
    }, 300);
  } else if (buttonNum === 2) {
    circleTwo.style.backgroundColor = '#006400';
    setTimeout(function () {
      circleTwo.style.backgroundColor = 'rgb(77, 165, 96)';
    }, 300);
  } else if (buttonNum === 3) {
    circleThree.style.backgroundColor = '#8b0000';
    setTimeout(function () {
      circleThree.style.backgroundColor = 'rgb(230, 97, 97)';
    }, 300);
  } else {
    circleFour.style.backgroundColor = '#CCCC00';
    setTimeout(function () {
      circleFour.style.backgroundColor = 'rgb(243, 243, 106)';
    }, 300);
  }
}

function startPlayerTurn() {
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
    msgEl.innerHTML = 'Wrong Answer!';
    // end game
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
//msgEl.innerHTML = `Congrats! You passed level ${blink}!`;

// function render() {
// if(matchArray === false) {
//     msgEl.innerHTML = `Game Over!!  
//     You got to level ${counter}!`;
//     counter = false;
//     scoreIncrease();
// }else if(userArray.length === 5) {
//     msgEl.innerHTML = `You got 5 in a row!!! Keep it up!`;
// }else if(userArray.length === 10) {
//     `You got 10 in a row! Got a memory on you kid!`;
// }else if(userArray.length === 20) {
//     `Congrats!! You won the game!!!!`;
//     blinkColor();
// }
// }




