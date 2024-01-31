const buttonReset = document.getElementById('reset-button');
const textPlayer = document.getElementById('player-turn');
const textResult = document.getElementById('game-result');
const cells = document.querySelectorAll('td');

let gameWon = false;
let gameDraw = false;
let turn = 0;
let count = 0;
let record = ['','','','','','','','',''];

function gameResult(char){
    if(gameDraw){
        textResult.innerText = 'DRAW!';
    }else{
        textResult.innerText = 'Player ' + char + ' Wins!!';
    }

    gameWon = true;
}

function updatePlayer(char){
    textPlayer.innerText = 'Player ' + char + '\'s turn'
}

function checkResult(){
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Columns
        [0, 4, 8], [2, 4, 6]                // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (record[a] && record[a] === record[b] && record[a] === record[c]) {
            gameDraw = false;
            gameResult(record[a]);
            return;
        }
    }

    if (count === 9) {
        gameDraw = true;
        gameResult();
    }
}

function addO(td, gameCell){
    record[td.id] = 'O';
    gameCell.classList.add("bi-circle");
    
    turn -= 1;
    count += 1;
    updatePlayer('X');
    checkResult();
    
}

function addX(td, gameCell){
    record[td.id] = 'X';
    gameCell.classList.add("bi-x-lg");
    
    turn += 1;
    count += 1;
    updatePlayer('O');
    checkResult();
}

function playerTurn(){
    const thisDiv = this.querySelector('.game-cell');

    if(record[this.id] === '' && !gameWon){
        turn % 2 === 0 ? addX(this, thisDiv) : addO(this, thisDiv);
    }
}

function reset(){
    record.forEach(function (value, index) {
        record[index] = '';
    });

    cells.forEach(function (td){
        const div = td.querySelector('.game-cell');
        div.classList.remove("bi-x-lg");
        div.classList.remove("bi-circle");
    });

    textResult.innerText = '';

    updatePlayer('X');
    turn = 0;
    count = 0;
    gameDraw = false;
    gameWon = false;
}

buttonReset.addEventListener('click', reset);

cells.forEach(function (td){
    td.addEventListener('click', playerTurn);
})