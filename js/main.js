// constants

const turns = {
    '1': "player",
    '-1': 'game',
    '0': 'null'
}

// state variable //
let userArray = [];
let gameArray = [];
let turn;
let compTurn;
let winner;
let counter = 0;
let blink;
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



//event listeners

// Start Button
startBtn.addEventListener('click', startGame);


// Reset Button
resetBtn.addEventListener('click', function() {
    resetDiv.setAttribute("class", "hidden")
    startBtn.setAttribute("class", "");
    init();
})

// Circle Buttons
circleOne.addEventListener('click', function(e) {
    userArray.push(1);
    circleOne.style.backgroundColor = "#00008B";
    setTimeout(function() {
        clearColors();
    }, 500);
});
circleTwo.addEventListener('click', function(e) {
    userArray.push(2);
    circleTwo.style.backgroundColor = "#006400";
    setTimeout(function() {
        clearColors();
    }, 500);
});
circleThree.addEventListener('click', function(e) {
    userArray.push(3);
    circleThree.style.backgroundColor = "#8b0000";
    setTimeout(function() {
        clearColors();
    }, 500);
});
circleFour.addEventListener('click', function(e) {
    userArray.push(4);
    circleFour.style.backgroundColor = "#CCCC00";
    setTimeout(function() {
        clearColors();
    }, 500);
});




// Event listener functions

function startGame(e) {
    if(e.target.innerText) {
        startDiv.setAttribute("class", "hidden");
        resetDiv.setAttribute("class", "");
    }
    msgEl.innerHTML = "Follow the colors";
    if(counter === 0) {
        userArray = [];
        getRandomColor();
        blinkColor();
    }
    console.log(userArray)
    console.log
}


//functions

init();


function init() {
 msgEl.innerHTML = "Press Start to Play";
 counter = 0;
 userArray = [];
 gameArray = [];
 blink = 0;
 interval = 0
 turn = 1; 
 render();
 setTimeout(function() {
     score.innerHTML = 1;
 }, 1200);

for(let i = 0; i < 20; i++) {
    gameArray.push(getRandomColor());
}
compTurn = true;

interval = setInterval(gameTurn, 800);

}



function gameTurn() {
    turn = false;

    if(blink === turn) {
        clearInterval(interval);
        compTurn = false;
        clearColors();
        turn = true;
    }

    if(compTurn) {
        clearColors();
        setTimeout(() => {
            if(gameArray[blink] === 1) firstColor();
            if(gameArray[blink] === 2) secondColor();
            if(gameArray[blink] === 3) thirdColor();
            if(gameArray[blink] === 4) fourthColor();
            blink++
        }, 700);
    }
    setTimeout(function() {
        msgEl.innerHTML = 'Your Turn!';
        userTurn();
    }, (counter + 1) * 1000);
    }


function firstColor() {
    circleOne.style.backgroundColor = "#00008B";
    setTimeout(function() {
        clearColors();
    }, 700);
}
function secondColor() {
    circleTwo.style.backgroundColor = "#006400";
    setTimeout(function() {
        clearColors();
    }, 700);
}
function thirdColor() {
    circleThree.style.backgroundColor = "#8b0000";
    setTimeout(function() {
        clearColors();
    }, 700);
}
function fourthColor() {
    circleFour.style.backgroundColor = "#CCCC00";
    setTimeout(function() {
        clearColors();
    }, 700);
}

function getRandomColor() {
    gameArray.push(Math.floor(Math.random() * 4) + 1);
    blink++;
    blinkColor();
}



function userTurn() {
    turn = true;
        if(userArray.length === gameArray.length) {
            checkUser();
        } else 
        render();
    }

function checkUser() {
    turn = false;
    checkArray();
    if(matchArray === true) {
        userArray = [];
        msgEl.innerHTML = `Congrats! You passed level ${counter}!`;
    } else 
    render();
}

//check user answer is correct
function checkArray() {
    for(let i = 0; i < counter.length; i++) {
        if(userArray.length === gameArray.length) {
            matchArray = true;
            startAgain();
        }else 
        matchArray = false;
    }
}


function render() {
if(matchArray === false) {
    msgEl.innerHTML = `Good game!  
    You got to level ${counter}!`;
    gameArray = [];
    userArray = [];
    turn = false;
    scoreIncrease();
}else if(userArray.length === 5) {
    msgEl.innerHTML = `You got 5 in a row!!! Keep it up!`;
}else if(userArray.length === 10) {
    `You got 10 in a row! Got a memory on you kid!`;
}
}

function startAgain() {
    counter++;
    getRandomColor();
    blinkColor();
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




