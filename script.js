const boardElement = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('current-player');
const statusText = document.querySelector('.status');
const resetBtn = document.getElementById('reset-btn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// All 8 possible winning combinations (rows, columns, dia.,gonals)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonlsls
];

// Handle cell clicks
function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    
    if (board[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkForWinner();
}

// Update board state array and UI
function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Applies specific X or O color
}

// Check if someone won or if it's a draw
function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === "" || board[b] === "" || board[c] === "") {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player <span style="color: #4ecc71">${currentPlayer}</span> Wins! 🎉`;
        isGameActive = false;
        return;
    }

    // Check for Draw (draw kar rhe hain jab board mein koi empty cell nahi hai aur koi winner nahi hai)
    if (!board.includes("")) {
        statusText.textContent = "It's a Draw! 👔";
        isGameActive = false;
        return;
    }

    // Switch Player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = currentPlayer;
}

// Reset the game to default state
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusText.innerHTML = `Player <span id="current-player">X</span>'s turn`;
    
    setTimeout(() => {
        document.getElementById('current-player').textContent = currentPlayer;
    }, 0);

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('X', 'O');
    });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);