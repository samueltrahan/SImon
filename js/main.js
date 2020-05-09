// constants

const colorBoard = ["blue", "green", "red", "yellow"];

// state variable //
let userArray = [];
let gameArray = [];
let turn = false;
let winner;
let count = 0;
let matchArray;
let tempo;

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

function getRandomColor() {
    gameArray.push(Math.floor(Math.random() * 4) + 1);
    count++;
}

function firstColor() {
    circleOne.style.backgroundColor = "#00008B";
    setTimeout(function() {
        clearColors();
    }, tempo);
}
function secondColor() {
    circleTwo.style.backgroundColor = "#006400";
    setTimeout(function() {
        clearColors();
    }, tempo);
}
function thirdColor() {
    circleThree.style.backgroundColor = "#8b0000";
    setTimeout(function() {
        clearColors();
    }, tempo);
}
function fourthColor() {
    circleFour.style.backgroundColor = "#CCCC00";
    setTimeout(function() {
        clearColors();
    }, tempo);
}


function clearColors() {
    circleOne.style.backgroundColor = 'rgb(76, 116, 247)';
    circleTwo.style.backgroundColor = 'rgb(77, 165, 96)';
    circleThree.style.backgroundColor = 'rgb(230, 97, 97)';
    circleFour.style.backgroundColor = 'rgb(243, 243, 106)';
}