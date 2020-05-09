// constants

const colorBoard = ["blue", "green", "red", "yellow"];

// state variable //
let userArray = [];
let gameArray = [];
let matchArray;
let turn = false;
let winner;
let counter = 0;

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
    if(count === 0) {
        userArray = [];
        getRandomColor();
        blinkColor();
    }
}


//functions

init();


function init() {
 msgEl.innerHTML = "Press Start to Play";
 count = 0;
 userArray = [];
 gameArray = [];
 turn = false; 
 winner = false;
 render();
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
    counter++;
    blinkColor();
}

function blinkColor() {
    gameArray.forEach(function(blink, idx) {
        setTimeout(function() {
        if(blink === 1) 
        firstColor();
        if(blink === 2)
        secondColor();
        if(blink === 3)
        thirdColor();
        if(blink === 4)
        fourthColor();
    }, (idx + 1) * 700);
});
setTimeout(function() {
    msgEl.innerHTML = 'Your Turn!';
    userTurn();
}, (counter + 1) * 1000);
}

function userTurn() {
    if(turn === true) {
        if(userArray.length === gameArray.length) {
            checkUser();
        } else 
        endGame();
    }
};

function checkUser() {
    turn = false;
    arrayCheck();
    if(matchArray === true) {
        userArray = [];
        msgEl.innerHTML = `Congrats! You passed level ${counter}!`;
    } else 
    endGame();
}

function checkArray() {
    for(let i = 0; i < counter.length; i++) {
        if(userArray.length === gameArray.length) {
            matchArray = true;
        }else 
        matchArray = false;
    }
}



function clearColors() {
    circleOne.style.backgroundColor = 'rgb(76, 116, 247)';
    circleTwo.style.backgroundColor = 'rgb(77, 165, 96)';
    circleThree.style.backgroundColor = 'rgb(230, 97, 97)';
    circleFour.style.backgroundColor = 'rgb(243, 243, 106)';
}




function render() {
    if(userArray.length === 5) {
        msgEl.innerHTML = `You got 5 in a row!!! Keep it up!`
    }else if(userArray.length === 10) {
        `You got 10 in a row! Got a memory on you kid!`
    }

}