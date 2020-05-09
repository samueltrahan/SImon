// constants
const colorLookup = {
    "1": "blue",
    "2": "green",
    "3": "red",
    "4": "yellow"
}


// state variable //
let userArray = [];
let gameArray = [];
let turn = false;
let score;
let winner;
let count = 0;
let matchArray = [];

//cached Elements
const msgEl = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const startBtn = document.getElementById('startBtn');
const colorBtn = document.querySelectorAll('.colorButton');
const circleOne = document.getElementById('cir1');
const circleTwo = document.getElementById('cir2');
const circleThree = document.getElementById('cir3');
const circleFour = document.getElementById('cir4');



//event listeners
circleOne.addEventListener('click', clickOne);
circleTwo.addEventListener('click', clickTwo);
circleThree.addEventListener('click', clickThree);
clickFour.addEventListener('click', clickFour);


// colorBtn.forEach(function(button) {
//     button.addEventListener('click', function(e) {
//         circles.style.backgroundColor = colorLookup[e.target.innerText];
//    })
// });


//functions