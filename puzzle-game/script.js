const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-btn');
const colors = ['red', 'blue', 'green', 'purple', 'orange'];
const numPairs = 12; 
const gridSize = 5 * 5;

let gameColors = [];
let flippedSquares = []; 
let matchedPairs = 0;
let lockBoard = false; 
function initializeGame() {
    
    gameColors = generateGameColors(colors, numPairs, gridSize);
    shuffleArray(gameColors);

    gameBoard.innerHTML = ''; 
    flippedSquares = [];
    matchedPairs = 0;
    lockBoard = false;

    // Create squares and append to board
    gameColors.forEach((color, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.color = color;
        square.dataset.index = index;
        square.addEventListener('click', () => flipSquare(square));
        gameBoard.appendChild(square);
    });
}

function generateGameColors(availableColors, pairsToCreate, totalTiles) {
    let generatedColors = [];
    for (let i = 0; i < pairsToCreate; i++) {
        const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
        generatedColors.push(randomColor, randomColor); // Add two of the same color for a pair
    }

    // If totalTiles > generatedColors.length (e.g., 25 tiles, 12 pairs = 24 colors), add a dummy color
    while (generatedColors.length < totalTiles) {
        generatedColors.push('dummy'); // Will appear as default gray and can't be matched
    }

    // Trim or extend if necessary to match totalTiles exactly (e.g., if numPairs * 2 > totalTiles)
    return generatedColors.slice(0, totalTiles);
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring for swapping
    }
}

function flipSquare(square) {
    if (lockBoard || square === flippedSquares[0] || square.classList.contains('matched')) return;

    square.classList.add('flipped');
    square.classList.add(`color-${square.dataset.color}`); // Apply the actual color

    flippedSquares.push(square);

    if (flippedSquares.length === 2) {
        lockBoard = true; // Prevent further clicks
        checkForMatch();
    }
}

function checkForMatch() {
    const [firstSquare, secondSquare] = flippedSquares;

    if (firstSquare.dataset.color === secondSquare.dataset.color) {
        // It's a match!
        firstSquare.classList.add('matched');
        secondSquare.classList.add('matched');
        firstSquare.removeEventListener('click', () => flipSquare(firstSquare));
        secondSquare.removeEventListener('click', () => flipSquare(secondSquare));
        matchedPairs++;
        resetFlippedSquares();
        if (matchedPairs * 2 === gameColors.filter(c => c !== 'dummy').length) { // Check if all actual pairs are matched
            setTimeout(() => alert('Congratulations! You matched all pairs!'), 500);
        }
    } else {
        // Not a match, flip them back
        setTimeout(() => {
            firstSquare.classList.remove('flipped', `color-${firstSquare.dataset.color}`);
            secondSquare.classList.remove('flipped', `color-${secondSquare.dataset.color}`);
            resetFlippedSquares();
        }, 1000); // Wait 1 second before flipping back
    }
}

function resetFlippedSquares() {
    flippedSquares = [];
    lockBoard = false; // Unlock the board
}

// Event listeners
resetButton.addEventListener('click', initializeGame);

// Initial game setup
initializeGame();
