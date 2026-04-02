//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const submitBtn = document.getElementById("submit");
const message = document.querySelector(".message");
const board = document.getElementById("board");

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

submitBtn.addEventListener("click", function () {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    message.innerText = `${player1}, you're up`;

    createBoard();
});

function createBoard() {
    board.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i + 1;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

function handleClick(event) {
    let index = event.target.id - 1;

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWinner()) {
        let winner = currentPlayer === "X" ? player1 : player2;
        message.innerText = `${winner} congratulations you won!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    let nextPlayer = currentPlayer === "X" ? player1 : player2;
    message.innerText = `${nextPlayer}, you're up`;
}

function checkWinner() {
    for (let combo of winningCombinations) {
        let [a, b, c] = combo;

        if (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {
            return true;
        }
    }
    return false;
}