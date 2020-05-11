// constants

// state variable //
let gameArray = [];
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
const circleButtons = document.querySelectorAll('.circleButton');



//event listeners

// Start Button
startBtn.addEventListener('click', startGame);

// Reset Button
resetBtn.addEventListener('click', function () {
  resetDiv.setAttribute('class', 'hidden');
  startDiv.setAttribute('class', '');
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
// Reset Button


// Circle Buttons

circleOne.addEventListener('click', function(e) {
    if(playerPress) {
    userArray.push(1);
    console.log(userArray);
    checkUser();
    firstColor();
    }
    if(!winner) {
    setTimeout(function() {
        clearColors();
    }, 300);
}
});
circleTwo.addEventListener('click', function(e) {
    if(playerPress) {
    userArray.push(2);
    checkUser();
    secondColor();
    }
    if(!winner) {
    setTimeout(function() {
        clearColors();
    }, 300);
    }
});
circleThree.addEventListener('click', function(e) {
    if(playerPress) {
    userArray.push(3);
    checkUser();
    thirdColor();
    console.log(thirdColor());
    }
    if(!winner) {
    setTimeout(function() {
        clearColors();
    }, 300);
}
});
circleFour.addEventListener('click', function(e) {
    if(playerPress) {
    userArray.push(4);
    checkUser();
    fourthColor();
    }
    if(!winner) {
    setTimeout(function() {
        clearColors();
    }, 300);
}
});

//functions

play();

function play() {
    msgEl.innerHTML = `Follow the colors!`;
    if(round === 1) {
        getRandomColor();
    } 
    interval = setInterval(gameTurn, 800);
    
}

function getRandomColor() {
    for(let i = 0; i < 20; i++) {
        gameArray.push(Math.floor(Math.random() *4) + 1);
    }
}

function gameTurn() {
    if(compTurn) {
        handleBlink();
        blink++
    }

    if(blink === counter) {
        clearInterval(interval);
        blink = 0;
        startPlayerTurn();
    }

}

function handleBlink() {
    if(gameArray[blink] === 1)  {
        blinkButton(1);
    } else if(gameArray[blink] === 2) {
        blinkButton(2)
    } else if(gameArray[blink] === 3)  {
        blinkButton(3);
    }else  {
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


function checkUser() {
    playerPress = false;
    if(userArray[userArray.length - 1] !== gameArray[userArray.length - 1]) {
        matchArray = false;
        render(); 
    } 
    if(userArray.length === 20 && matchArray) {
        render();
    }
    if(counter === userArray.length && matchArray && !winner) {
        counter++;
        userArray = [];
        compTurn = true;
        blink = 0;
        score.innerHTML = counter;
        interval = setInterval(gameTurn, 800);
    }
}
//msgEl.innerHTML = `Congrats! You passed level ${blink}!`;

function render() {
if(matchArray === false) {
    msgEl.innerHTML = `Game Over!!  
    You got to level ${counter}!`;
    counter = false;
    scoreIncrease();
}else if(userArray.length === 5) {
    msgEl.innerHTML = `You got 5 in a row!!! Keep it up!`;
}else if(userArray.length === 10) {
    `You got 10 in a row! Got a memory on you kid!`;
}else if(userArray.length === 20) {
    `Congrats!! You won the game!!!!`;
    blinkColor();
}
}
function clearColors() {
    circleOne.style.backgroundColor = 'rgb(76, 116, 247)';
    circleTwo.style.backgroundColor = 'rgb(77, 165, 96)';
    circleThree.style.backgroundColor = 'rgb(230, 97, 97)';
    circleFour.style.backgroundColor = 'rgb(243, 243, 106)';
}

function blinkColor() {
    circleOne.style.backgroundColor = '#00008B';
    circleTwo.style.backgroundColor = '#006400';
    circleThree.style.backgroundColor = '#8b0000';
    circleFour.style.backgroundColor = '#CCC00';
}




