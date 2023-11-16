const tab = document.querySelector('.tab');


// Function to generate the matrix
function generateMatrix(n) {
    let matrix = [];

    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            // You can modify this line to generate different values in the matrix
            matrix[i][j] = i * n + j + 1;
        }
    }

    return matrix;
}

// Function to display the matrix in HTML
function displayMatrix(matrix) {
    const table = document.createElement('table');

    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('td');
            //cell.textContent = matrix[i][j];
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    tab.appendChild(table);
}

// Set the size of the matrix
const matrixSize = 20; // Change this to your desired size
const myMatrix = generateMatrix(matrixSize);

// Display the matrix in the HTML document
displayMatrix(myMatrix);




// Initialize the game
const rows = 20;
const cols = 20;
const cellSize = 20;
const canvas = document.getElementById('canvas');
canvas.width = cols * cellSize;
canvas.height = rows * cellSize;


let oldGrid= [];
let stateChanged=true;

const reset = document.getElementById("reset");
reset.addEventListener('click', ()=>{
    initiateAniamtion();
    gameLoop();
})

let grid = [];

function initiateAniamtion(){
// Create a 2D array to represent the grid of cells

grid=[];
console.log("grid",grid);
for (let i = 0; i < rows; i++) {
  grid[i] = [];
  for (let j = 0; j < cols; j++) {
    grid[i][j] = Math.random() < 0.5;; // Initially, all cells are dead
  }
}
}

initiateAniamtion();


// Function to get the number of alive neighbors of a cell
function getNeighbors(i, j) {
  let neighbors = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      if (di === 0 && dj === 0) continue; // Ignore the current cell
      const ni = i + di;
      const nj = j + dj;
      if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj]) {
        neighbors++;
      }
    }
  }
  return neighbors;
}

// Update the state of the cells based on the rules of the Game of Life
function updateGrid() {
  const nextGrid = [];
  for (let i = 0; i < rows; i++) {
    nextGrid[i] = [];
    for (let j = 0; j < cols; j++) {
      const neighbors = getNeighbors(i, j);
      console.log("tes");
      if (grid[i][j]) {
        if (neighbors === 2 || neighbors === 3) {
          nextGrid[i][j] = true; // Alive cell stays alive if it has 2 or 3 alive neighbors
        } else {
          nextGrid[i][j] = false; // Alive cell dies if it has less than 2 or more than 3 alive neighbors
        }
      } else {
        if (neighbors === 3) {
          nextGrid[i][j] = true; // Dead cell becomes alive if it has exactly 3 alive neighbors
        } else {
          nextGrid[i][j] = false; // Dead cell stays dead if it has less than 3 or more than 3 alive neighbors
        }
      }
    }
  }
  stateChanged = JSON.stringify(grid) !== JSON.stringify(nextGrid);
  console.log("state grid:",stateChanged);
  grid = nextGrid;
}

// Draw the grid of cells
function drawGrid() {
    setTimeout(()=>{
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            if (grid[i][j]) {
              ctx.fillStyle = '#000000';
            } else {
              ctx.fillStyle = '#FFFFFF';
            }
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
          }
        }
    },500)
 
}



// Set up the game loop
function gameLoop() {
    setTimeout(()=>{
        updateGrid();
        drawGrid();
        if (stateChanged) {
            //requestAnimationFrame(gameLoop);
        }else{
          console.log("pas encore",stateChanged);
        }
    },3000)
 
}


gameLoop();