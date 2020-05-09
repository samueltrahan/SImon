// constants

const colorBoard = ["blue", "green", "red", "yellow"];

// state variable //
let userArray = [];
let gameArray = [];
let turn = false;
let winner;
let count = 0;
let matchArray = [];

//cached Elements
const msgEl = document.getElementById('message');
const resetDiv = document.getElementById('resetDiv');
const resetBtn = document.getElementById('resetBtn');
const startDiv = document.getElementById('startDiv');
const startBtn = document.getElementById('startBtn');
const colorBtn = document.querySelectorAll('.colorButton');
const circleOne = document.getElementById('cir1');
const circleTwo = document.getElementById('cir2');
const circleThree = document.getElementById('cir3');
const circleFour = document.getElementById('cir4');



//event listeners
startBtn.addEventListener('click', startGame);

resetBtn.addEventListener('click', function() {
    resetDiv.setAttribute("class", "hidden")
    startBtn.setAttribute("class", "");
    console.log(resetBtn);
    init();
})

circleOne.addEventListener('click', function(e) {
    circleOne.style.backgroundColor = "#00008B";
    setTimeout(function() {
        clearColors();
    }, 700);
});
circleTwo.addEventListener('click', function(e) {
    circleTwo.style.backgroundColor = "#006400";
    setTimeout(function() {
        clearColors();
    }, 700);
});
circleThree.addEventListener('click', function(e) {
    circleThree.style.backgroundColor = "#8b0000";
    setTimeout(function() {
        clearColors();
    }, 700);
});
circleFour.addEventListener('click', function(e) {
    circleFour.style.backgroundColor = "#CCCC00";
    setTimeout(function() {
        clearColors();
    }, 700);
});
// circleTwo.addEventListener('click', clickTwo);
// circleThree.addEventListener('click', clickThree);
// clickFour.addEventListener('click', clickFour);



// Event listener functions

function startGame(e) {
    if(e.target.innerText) {
        startDiv.setAttribute("class", "hidden");
        resetBtn.setAttribute("class", "");
    }
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
}

function getRandomColor() {
    gameArray.push(Math.floor(Math.random() * 4) + 1);
    count++;
}

function clearColors() {
    circleOne.style.backgroundColor = 'rgb(76, 116, 247)';
    circleTwo.style.backgroundColor = 'rgb(77, 165, 96)';
    circleThree.style.backgroundColor = 'rgb(230, 97, 97)';
    circleFour.style.backgroundColor = 'rgb(243, 243, 106)';
}