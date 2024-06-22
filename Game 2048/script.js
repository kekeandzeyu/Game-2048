const grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let score = 0;
let highScore = loadHighScore();

document.getElementById('reset-button').addEventListener('click', resetGame);

document.getElementById('up').addEventListener('click', function() {
    if (moveUp()) { handleMove(); }
});
document.getElementById('down').addEventListener('click', function() {
    if (moveDown()) { handleMove(); }
});
document.getElementById('left').addEventListener('click', function() {
    if (moveLeft()) { handleMove(); }
});
document.getElementById('right').addEventListener('click', function() {
    if (moveRight()) { handleMove(); }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && moveUp()) {
        handleMove();
    } else if (event.key === 'ArrowDown' && moveDown()) {
        handleMove();
    } else if (event.key === 'ArrowLeft' && moveLeft()) {
        handleMove();
    } else if (event.key === 'ArrowRight' && moveRight()) {
        handleMove();
    }
});

function handleMove() {
    generateRandomTile();
    updateGrid();
    if (isGameOver()) {
        showGameOver();
    } else if (hasWon()) {
        showWinMessage();
    }
}

function createGrid() {
    const gameBoard = document.getElementById('game-board');
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.id = `tile-${row}-${col}`;
            gameBoard.appendChild(tile);
        }
    }
}

function generateRandomTile() {
    const emptyTiles = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                emptyTiles.push({ row, col });
            }
        }
    }
    if (emptyTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyTiles.length);
        const { row, col } = emptyTiles[randomIndex];
        grid[row][col] = Math.random() < 0.9 ? 2 : 4;
        updateTile(row, col);
    }
}

function updateTile(row, col) {
    const tile = document.getElementById(`tile-${row}-${col}`);
    tile.textContent = grid[row][col] === 0 ? '' : grid[row][col];
    tile.className = 'tile'; // Reset class list
    tile.classList.add(`tile-${grid[row][col]}`); // Add the correct class
}

function moveUp() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
            if (grid[row][col] !== 0) {
                let currentRow = row;
                while (currentRow > 0 && grid[currentRow - 1][col] === 0) {
                    grid[currentRow - 1][col] = grid[currentRow][col];
                    grid[currentRow][col] = 0;
                    currentRow--;
                    moved = true;
                }
                if (currentRow > 0 && grid[currentRow - 1][col] === grid[currentRow][col]) {
                    grid[currentRow - 1][col] *= 2;
                    updateScore(grid[currentRow - 1][col]);
                    grid[currentRow][col] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        for (let row = 2; row >= 0; row--) {
            if (grid[row][col] !== 0) {
                let currentRow = row;
                while (currentRow < 3 && grid[currentRow + 1][col] === 0) {
                    grid[currentRow + 1][col] = grid[currentRow][col];
                    grid[currentRow][col] = 0;
                    currentRow++;
                    moved = true;
                }
                if (
                    currentRow < 3 &&
                    grid[currentRow + 1][col] === grid[currentRow][col]
                ) {
                    grid[currentRow + 1][col] *= 2;
                    updateScore(grid[currentRow + 1][col]); // Update score
                    grid[currentRow][col] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            if (grid[row][col] !== 0) {
                let currentCol = col;
                while (currentCol > 0 && grid[row][currentCol - 1] === 0) {
                    grid[row][currentCol - 1] = grid[row][currentCol];
                    grid[row][currentCol] = 0;
                    currentCol--;
                    moved = true;
                }
                if (
                    currentCol > 0 &&
                    grid[row][currentCol - 1] === grid[row][currentCol]
                ) {
                    grid[row][currentCol - 1] *= 2;
                    updateScore(grid[row][currentCol - 1]);
                    grid[row][currentCol] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        for (let col = 2; col >= 0; col--) {
            if (grid[row][col] !== 0) {
                let currentCol = col;
                while (currentCol < 3 && grid[row][currentCol + 1] === 0) {
                    grid[row][currentCol + 1] = grid[row][currentCol];
                    grid[row][currentCol] = 0;
                    currentCol++;
                    moved = true;
                }
                if (
                    currentCol < 3 &&
                    grid[row][currentCol + 1] === grid[row][currentCol]
                ) {
                    grid[row][currentCol + 1] *= 2;
                    updateScore(grid[row][currentCol + 1]);
                    grid[row][currentCol] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function hasWon() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 2048) {
                return true;
            }
        }
    }
    return false;
}

function showWinMessage() {
    if (confirm("You win!\nDo you want to play again?")) {
        resetGame();
    } else {

    }
}

function updateGrid() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            updateTile(row, col);
        }
    }
}



function isGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                return false;
            }
        }
    }

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            if (
                grid[row][col] === grid[row][col + 1] ||
                (row < 3 && grid[row][col] === grid[row + 1][col])
            ) {
                return false;
            }
        }
    }

    return true;
}

function showGameOver() {
    if (confirm("You lose!\nDo you want to play again?")) {
        resetGame();
    } else {
    }
}

function resetGame() {
    score = 0;
    updateScore(0);
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            grid[row][col] = 0;
        }
    }

    generateRandomTile();
    generateRandomTile();

    updateGrid();
}

function loadHighScore() {
    const storedHighScore = sessionStorage.getItem('highScore');
    return storedHighScore ? parseInt(storedHighScore, 10) : 0;
}

function saveHighScore(score) {
    sessionStorage.setItem('highScore', score);
}

function updateScore(newScore) {
    score += newScore;
    document.getElementById('score').textContent = score;

    if (score > highScore) {
        highScore = score;
        saveHighScore(highScore);
        document.getElementById('high-score').textContent = highScore;
    }
}

function initializeScoreboard() {
    document.getElementById('score').textContent = '0';
    document.getElementById('high-score').textContent = loadHighScore().toString();
}

createGrid();
generateRandomTile();
generateRandomTile();
updateGrid();
initializeScoreboard();
document.addEventListener();