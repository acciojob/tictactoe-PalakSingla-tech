//your JS code here. If required.

const form = document.getElementById("player-form");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let players = [];
let currentPlayer = 0;
let board = Array(9).fill("");
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const player1 = document.getElementById("player-1").value.trim();
    const player2 = document.getElementById("player-2").value.trim();

    if (!player1 || !player2) {
        return;
    }

    players = [
        { name: player1, symbol: "x" },
        { name: player2, symbol: "o" }
    ];

    currentPlayer = 0;
    board = Array(9).fill("");
    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    form.hidden = true;
    game.hidden = false;

    updateMessage();
});

function updateMessage() {
    message.textContent =
        `${players[currentPlayer].name}, you're up`;
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", function () {
        if (gameOver || board[index] !== "") {
            return;
        }

        const player = players[currentPlayer];

        board[index] = player.symbol;
        cell.textContent = player.symbol;

        if (hasWon(player.symbol)) {
            message.textContent =
                `${player.name} congratulations you won!`;
            gameOver = true;
            return;
        }

        if (board.every(value => value !== "")) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === 0 ? 1 : 0;
        updateMessage();
    });
});

function hasWon(symbol) {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === symbol)
    );
}
