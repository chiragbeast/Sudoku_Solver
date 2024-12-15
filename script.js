document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("sudoku-grid");
    const modalContainer = document.getElementById("input-modal");
    const inputGrid = document.getElementById("input-grid");
    let inputArray = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    function createGrid(array) {
      gridContainer.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = document.createElement("input");
          cell.type = "text";
          cell.maxLength = "1";
          cell.className =
            "w-12 h-12 bg-white border border-gray-300 text-center text-lg font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400";
          cell.dataset.row = i;
          cell.dataset.col = j;
          if (array[i][j] !== 0) {
            cell.value = array[i][j];
            cell.disabled = true; 
            cell.classList.add("bg-gray-200");
          }

          gridContainer.appendChild(cell);
        }
      }
    }
    function getGrid() {
      const grid = [];
      const cells = document.querySelectorAll("#sudoku-grid input");
      for (let i = 0; i < 9; i++) {
        grid.push([]);
        for (let j = 0; j < 9; j++) {
          const value = cells[i * 9 + j].value;
          grid[i].push(value === "" ? 0 : parseInt(value));
        }
      }
      return grid;
    }

    function getInputArray() {
      const newArray = [];
      const cells = document.querySelectorAll("#input-grid input");
      for (let i = 0; i < 9; i++) {
        newArray.push([]);
        for (let j = 0; j < 9; j++) {
          const value = cells[i * 9 + j].value;
          newArray[i].push(value === "" ? 0 : parseInt(value));
        }
      }
      inputArray = newArray;
      createGrid(inputArray);
    }
    function isValid(board, row, col, num) {
      for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
          return false;
        }
        const boxRow = 3 * Math.floor(row / 3) + Math.floor(x / 3);
        const boxCol = 3 * Math.floor(col / 3) + (x % 3);
        if (board[boxRow][boxCol] === num) {
          return false;
        }
      }
      return true;
    }
    function solveSudoku(board) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (solveSudoku(board)) {
                  return true;
                }
                board[row][col] = 0;
              }
            }
            return false; 
          }
        }
      }
      return true; 
    }
    function displaySolvedGrid(board) {
      const cells = document.querySelectorAll("#sudoku-grid input");
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = cells[i * 9 + j];
          if (!cell.disabled) {
            cell.value = board[i][j];
            cell.classList.add("bg-green-200");
          }
        }
      }
    }
    function createInputModalGrid() {
      inputGrid.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = document.createElement("input");
          cell.type = "text";
          cell.maxLength = "1";
          cell.className =
            "w-8 h-8 bg-white border border-gray-300 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400";
          inputGrid.appendChild(cell);
        }
      }
    }
    document.getElementById("solve").addEventListener("click", () => {
      const grid = getGrid();
      const solved = solveSudoku(grid);
      if (solved) {
        displaySolvedGrid(grid);
      } else {
        alert("The input Sudoku is invalid or unsolvable!");
      }
    });

    document.getElementById("reset").addEventListener("click", () => {
      createGrid(inputArray);
    });

    document.getElementById("input-button").addEventListener("click", () => {
      modalContainer.classList.remove("hidden");
      createInputModalGrid();
    });

    document.getElementById("save-input").addEventListener("click", () => {
      getInputArray();
      modalContainer.classList.add("hidden");
    });

    document.getElementById("cancel-input").addEventListener("click", () => {
      modalContainer.classList.add("hidden");
    });
    createGrid(inputArray);
  });