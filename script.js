//your JS code here. If required.
const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const setupDiv = document.getElementById('setup');
const gameBoardDiv = document.getElementById('game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1, player2;
let currentPlayer;
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

submitBtn.addEventListener('click', () => {
    player1 = player1Input.value || "Player 1";
    player2 = player2Input.value || "Player 2";
    currentPlayer = player1;
    
    setupDiv.style.display = 'none';
    gameBoardDiv.style.display = 'block';
    messageDiv.innerText = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.id) - 1;

        if (boardState[index] !== "" || !gameActive) return;

        // Mark cell
        const symbol = currentPlayer === player1 ? "x" : "o";
        boardState[index] = symbol;
        cell.innerText = symbol;

        if (checkWin()) {
            messageDiv.innerText = `${currentPlayer} congratulations you won!`;
            gameActive = false;
            highlightWinner();
        } else if (!boardState.includes("")) {
            messageDiv.innerText = "It's a draw!";
            gameActive = false;
        } else {
            // Switch player
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            messageDiv.innerText = `${currentPlayer}, you're up`;
        }
    });
});

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            const symbol = currentPlayer === player1 ? "x" : "o";
            return boardState[index] === symbol;
        });
    });
}

function highlightWinner() {
    winningConditions.forEach(condition => {
        const symbol = currentPlayer === player1 ? "x" : "o";
        if (condition.every(index => boardState[index] === symbol)) {
            condition.forEach(index => {
                document.getElementById((index + 1).toString()).classList.add('winner');
            });
        }
    });
}