const boardElement = document.getElementById('board');
const playerDisplay = document.getElementById('playerDisplay');
const startModal = document.getElementById('startModal');
const winModal = document.getElementById('winModal')
const resultMessage = document.getElementById('resultMessage')

let currentPlayer = 'X' ;
let gameState = Array(9).fill(null);
let playerNames = ['',''];

function startGame() {
    const p1 = document.getElementById('player1').value || 'Player 1';
    const p2 = document.getElementById('player2').value || 'Player 2';
    playerNames = [p1, p2];
    currentPlayer = 'X';
    gameState = Array(9).fill(null);
    boardElement.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.style.opacity = 0;
        setTimeout(() => {
            cell.classList.add('pop-in');
            cell.style.opacity = 1;
        }, i * 80);
        cell.addEventListener('click', handleMove);
        boardElement.appendChild(cell);
    }
    updatePlayerDisplay();
    startModal.style.display = 'none';
}
    function updatePlayerDisplay() {
        const name = currentPlayer === 'X' ? playerNames[0] : playerNames[1];
        playerDisplay.textContent = `${name}'s turn (${currentPlayer})`;
    }

    function handleMove(e) {
        const index = Number(e.target.dataset.index);
        if (!gameState[index]) {
            gameState[index] = currentPlayer;
            e.target.textContent = currentPlayer;

            // Bounce Animation
            e.target.classList.remove('mark-bounce');
            void e.target.offsetWidth;
            e.target.classList.add('mark-bounce');

            // Color update
            e.target.style.color = currentPlayer === 'X' ? '#4285F4' : '#FBBC05';

            if (checkWinner()) {
                const winner = currentPlayer === 'X' ? playerNames[0] : playerNames[1];
                resultMessage.textContent = `${winner} wins!` ;
                winModal.style.display = 'flex';
            } else if (gameState.every(cell => cell !== null)) {
                resultMessage.textContent = " It's a Draw";
                winModal.style.display = 'flex';
            } else{
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updatePlayerDisplay();
            }
        }
        console.log('Checking winner:', gameState);
    }

    function checkWinner() {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return wins.some(combo => {
            const [a,b,c] = combo;
            const win = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
            if (win) {
                console.log(`Winner combo: ${a},${b},${c}`);
            }
            return win;
        });
    }

    function resetGame() {
        winModal.style.display = 'none';
        startGame();
    }
    function startFresh() {
        winModal.style.display = 'none';
        startModal.style.display = 'flex';
    }
