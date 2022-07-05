const game = document.querySelector('.field');
const item = document.querySelectorAll('.item');
const btnStart = document.querySelector('#btn_start');
const btnReverse = document.querySelector('#btn_reverse');
const btnBack = document.querySelector('#btn_back');
const score = document.querySelector('.score');
const points = document.getElementById('points');
const loser = document.querySelector('.loser');
const winner = document.querySelector('.winner');
const loseScore = document.getElementById('lose_score');
const winScore = document.getElementById('win_score');

let gameover = false;
let current = 0;
let num;
let squares = [];
let firstSquare;
let secondSquare;
let backSquare;
let backArray = [];


btnStart.onclick = function () {
    btnStart.classList.add('active');
    btnBack.classList.add('active');
    score.classList.remove('active');
    createArr();
    createNumber();
    createNumber();    
    document.addEventListener('keyup', listener);
}
btnReverse.onclick = function () {
    btnStart.classList.remove('active');
    btnBack.classList.remove('active');
    score.classList.add('active');
    backSquare = 0;
    cleanScreen();
    addToScreen();
}
btnBack.onclick = function () {
    backStep ();
}

function backStep () {
    backArray = backSquare.split(',');
    let k = 0;
    for (let i = 0; i < 4; i++) {
        squares[i] = [];
        for (let j = 0; j < 4; j++) {
            squares[i][j] = +backArray[k];
            k++;
        }
    }
    addToScreen();
}

function createArr () {
    for (let i = 0; i < 4; i++) {
        squares[i] = [];
        for (let j = 0; j < 4; j++) {
            squares[i][j] = 0;
        }
    }
}

function createNumber () {
    randomNum();
    addRandomNum();
    addToScreen();
}

function randomNum() {
    let a = Math.floor(Math.random() * (5 - 2) + 2);
    if (a%2 == 0) {
        num = a;
    } else {
        num = randomNum();
    }
    return num;
}

function addRandomNum () {
    let i = Math.floor(Math.random()*4);
	let j = Math.floor(Math.random()*4);
    if(squares[i][j] == 0){
        squares[i][j] = num;
    } else {
        addRandomNum();
    }
}

function addToScreen () {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let div = document.getElementById('s' + i + j);
            if (squares[i][j] === 0) {
                div.innerHTML = '';
                div.className = 'item';
            } else {
                div.innerHTML = squares[i][j];
                div.className = 'item sum' + squares[i][j];
            }
        }
    }  
}

function cleanScreen () {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let div = document.getElementById('s' + i + j);
            squares[i][j] = 0;
            div.innerHTML = '';                
        }
    }
    current = 0
    points.innerHTML = current;
    loser.classList.remove('active');    
    winner.classList.remove('active');    
}


function listener (event) {
    if (event.key === 'ArrowLeft') {
        firstSquare = String(squares);
        moveLeft();
        addToScreen();        
        secondSquare = String(squares);
        stopMowing();     
        winGameover();
        loseGameover();
    }
    if (event.key === 'ArrowRight') {        
        firstSquare = String(squares);
        moveRight();
        addToScreen();
        secondSquare = String(squares);
        stopMowing();      
        winGameover();
        loseGameover();
    }
    if (event.key === 'ArrowUp') {        
        firstSquare = String(squares);
        moveUp();
        addToScreen();
        secondSquare = String(squares);
        stopMowing();      
        winGameover();
        loseGameover();
    }
    if (event.key === 'ArrowDown') {
        firstSquare = String(squares);
        moveDown();
        addToScreen();
        secondSquare = String(squares);
        stopMowing();    
        winGameover();
        loseGameover();
    }
}

function stopMowing() {
    if (firstSquare !== secondSquare) {
        backSquare = firstSquare;
        createNumber();
    } 
}

function moveLeft (){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            let nextLeft = findNextItemLeft(i,j);
            if (nextLeft != -1) {
                if (squares[i][j] == 0) {
                    squares[i][j] = squares[i][nextLeft];
                    squares[i][nextLeft] = 0;
                    j--;
                }
                else if (squares[i][j] == squares[i][nextLeft]) {
                    squares[i][j] *= 2;
                    squares[i][nextLeft] = 0;
                    current += squares[i][j];
                    points.innerHTML = current;
                }
            }  
        }
    }
}
function findNextItemLeft (i, j) {
    for (let k = j + 1; k < 4; k++) {
        if (squares[i][k] != 0) {
            return k;
        }
    }
    return -1;
}

function moveRight (){
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j > 0; j--) {
            let nextRight = findNextItemRight(i,j);
            if (nextRight != -1) {
                if (squares[i][j] == 0) {
                    squares[i][j] = squares[i][nextRight];
                    squares[i][nextRight] = 0;
                    j++;
                }
                else if (squares[i][j] == squares[i][nextRight]) {
                    squares[i][j] *= 2;
                    squares[i][nextRight] = 0;
                    current += squares[i][j];
                    points.innerHTML = current;
                }
            } 
        }
    }
}
function findNextItemRight (i, j) {
    for (let k = j - 1; k >= 0; k--) {
        if (squares[i][k] != 0) {
            return k;
        }
    }
    return -1;
}

function moveUp (){
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 3; i++) {
            let nextUp = findNextItemUp(i,j);
            if (nextUp != -1) {
                if (squares[i][j] == 0) {
                    squares[i][j] = squares[nextUp][j];
                    squares[nextUp][j] = 0;
                    i--;
                }
                else if (squares[i][j] == squares[nextUp][j]) {
                    squares[i][j] *= 2;
                    squares[nextUp][j] = 0;
                    current += squares[i][j];
                    points.innerHTML = current;
                }
            } 
        }
    }
}
function findNextItemUp (i, j) {
    for (let k = i + 1; k < 4; k++) {
        if (squares[k][j] != 0) {
            return k;
        }
    }
    return -1;
}

function moveDown (){
    for (let j = 0; j < 4; j++) {
        for (let i = 3; i > 0; i--) {
            let nextDown = findNextItemDown(i,j);
            if (nextDown != -1) {
                if (squares[i][j] == 0) {
                    squares[i][j] = squares[nextDown][j];
                    squares[nextDown][j] = 0;
                    i++;
                }
                else if (squares[i][j] == squares[nextDown][j]) {
                    squares[i][j] *= 2;
                    squares[nextDown][j] = 0;
                    current += squares[i][j];
                    points.innerHTML = current;
                }
            } 
        }
    }
}
function findNextItemDown (i, j) {
    for (let k = i - 1; k >= 0; k--) {
        if (squares[k][j] != 0) {
            return k;
        }
    }
    return -1;
}


function winGameover () {   
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (squares[i][j] == 2048) {
                addToScreen();
                createNumber();                
                winner.classList.add('active');
                winScore.innerHTML = current;
                backSquare = 0;
                document.removeEventListener('keyup', listener);
            }
        }
    }     
}

function loseGameover () { 
    isGameover();
    if (gameover === true) {   
        loseScore.innerHTML = current;
        loser.classList.add('active');
        backSquare = 0;
        document.removeEventListener('keyup', listener);
    }
}

function isGameover () {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (squares[i][j] == 0) {
                gameover = false;
                return gameover;
            } else if (j < 3 && squares[i][j] == squares[i][j+1]) {
                gameover = false;
                return gameover;            
            } else if (i < 3 && squares[i][j] == squares[i+1][j]) {
                gameover = false;
                return gameover;
            }        
        }
    }
    return gameover = true;
}
