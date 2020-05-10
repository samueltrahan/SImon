// constants

// state variable //
let userArray = [];
let gameArray = [];
let matchArray;
let counter;
let compTurn;
let winner;
let blink;
let interval;
let playerPress = false;


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



//event listeners

// Start Button
startBtn.addEventListener('click', startGame);


function startGame(e) {
    if(e.target.innerText) {
        startDiv.setAttribute("class", "hidden");
        resetDiv.setAttribute("class", "");
    }
    msgEl.innerHTML = "Follow the colors!"
    if(playerPress || winner) {
    play();
    } 
}
// Reset Button

resetBtn.addEventListener('click', function() {
    resetDiv.setAttribute("class", "hidden")
    startBtn.setAttribute("class", "");
    play();
})

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
    msgEl.innerHTML = `Press Start to Play`;
    userArray = [];
    gameArray = [];
    matchArray = true;
    blink = 0;
    interval = 0
    counter = 1; 
    winner = false;
    setTimeout(function() {
    score.innerHTML = 1;
    }, 1200);
    getRandomColor();
    render();
    
}

function getRandomColor() {
    for(let i = 0; i < 20; i++) {
        gameArray.push(Math.floor(Math.random() *4) + 1);
    }
    compTurn = true;
    interval = setInterval(gameTurn, 800);
}

function gameTurn() {
    playerPress = false;

    if(blink === counter) {
        clearInterval(interval);
        compTurn = false;
        clearColors();
        playerPress = true;
    }

    if(compTurn) {
        clearColors();
        setTimeout(() => {
            if(gameArray[blink] === 1)  {
                firstColor();
            }
            if(gameArray[blink] === 2) {
                secondColor();
            }
            if(gameArray[blink] === 3)  {
                thirdColor();
            }
            if(gameArray[blink] === 4)  {
                fourthColor();
            }
            blink++
        }, 300);
      }
    }


function firstColor() {
    circleOne.style.backgroundColor = "#00008B";
}
function secondColor() {
    circleTwo.style.backgroundColor = "#006400";
}
function thirdColor() {
    circleThree.style.backgroundColor = "#8b0000";
}
function fourthColor() {
    circleFour.style.backgroundColor = "#CCC00";
}




function checkUser() {
    playerPress = false;
    if(userArray[userArray.length - 1] !== gameArray[userArray.length - 1]) {
        matchArray = false;
    } 
    if(userArray.length === 20 && matchArray) {
        render();
    }
    if(matchArray === false) {
        blinkColor();
        score.innerHTML = `Wrong Answer!`;
        setTimeout(() => {
            score.innerHTML = turn;
            clearColors();
        }, 800);
    }
    if(counter === userArray.length && matchArray && !winner) {
        counter++;
        userArray = [];
        compTurn = true;
        blink = 0;
        score.innerHTML = turn;
        interval = setInterval(gameTurn, 500);
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

function scoreIncrease() {
    if(matchArray) {
        score.innerHTML = counter;
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




