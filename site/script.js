document.addEventListener("DOMContentLoaded", () => {
    const rows = 6;
    const columns = 7;
    const board = [];
    let currentPlayer = 'red';

    const gameBoard = document.getElementById("game-board");
    const restartButton = document.getElementById("restart-button");

    // Initialize board
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.column = c;
            gameBoard.appendChild(cell);
            row.push(cell);
        }
        board.push(row);
    }

    // Click event
    gameBoard.addEventListener("click", (event) => {
        const cell = event.target;
        if (!cell.classList.contains("cell")) return;

        const column = cell.dataset.column;

        // Place piece in the lowest available row
        for (let r = rows - 1; r >= 0; r--) {
            const targetCell = board[r][column];
            if (!targetCell.classList.contains("red") && !targetCell.classList.contains("yellow")) {
                targetCell.classList.add(currentPlayer);
                if (checkWin(r, column)) {
                    alert(`${currentPlayer} wins!`);
                }
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                break;
            }
        }
    });

    // Restart button event
    restartButton.addEventListener("click", () => {
        for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < columns; c++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = r;
                cell.dataset.column = c;
                gameBoard.appendChild(cell);
                row.push(cell);
            }
            board.push(row);
        }    
        
        board.forEach(row => {
            row.forEach(cell => {
                cell.classList.remove("red", "yellow");
            });
        });
        currentPlayer = 'red';
    });

    // Check win function
    function checkWin(row, column) {
        return checkDirection(row, column, 1, 0) || // Horizontal
            checkDirection(row, column, 0, 1) || // Vertical
            checkDirection(row, column, 1, 1) || // Diagonal \
            checkDirection(row, column, 1, -1);  // Diagonal /
    }

    function checkDirection(row, column, rowDir, colDir) {
        let count = 0;
        let r = row;
        let c = column;

        // Check in the positive direction
        while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c].classList.contains(currentPlayer)) {
            count++;
            r += rowDir;
            c += colDir;
        }

        r = row - rowDir;
        c = column - colDir;

        // Check in the negative direction
        while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c].classList.contains(currentPlayer)) {
            count++;
            r -= rowDir;
            c -= colDir;
        }

        return count >= 4;
    }
});