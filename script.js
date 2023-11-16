
let stopped = false;
let stateChanged=true;
let oldGrid= [];
let grid = [];

const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const clear = document.getElementById('clear');
const start = document.getElementById('start');
const next = document.getElementById('next');
let cells =document.querySelectorAll('td');

console.log("element",cells);
reset.addEventListener('click', () => callBackEventListernner(false,true,false,true,false,false));
stop.addEventListener('click',  () => callBackEventListernner(true,true));
next.addEventListener('click',  () => callBackEventListernner(false,true,true));
start.addEventListener('click', () => callBackEventListernner(false,true));
clear.addEventListener('click', () => callBackEventListernner(true,false,false,true,true,true));

function callBackEventListernner(
        stoppedValue,
        gameLoopRestarted=false,
        next=false,
        createNewMatrix=false,
        drawTable=false,
        cleanMatrix=false)
    {
        stopped =stoppedValue;
        createNewMatrix ? createRandomOrCleanMatrix(cleanMatrix) : null;
        !gameLoopRestarted ? null : (next ? gameLoop(true):gameLoop());
        drawTable ? drawGridTable() : null;
    }


cells.forEach((element) => element.addEventListener('click', () => {

    const i = element.getAttribute('i');
    const j = element.getAttribute('j');
    const value = grid[i][j];
   
    // Change state and Set the color of the current cell
    grid[i][j] = !value;
    element.style.backgroundColor = value ?  '#FFFFFF': '#005792';
}))


function createRandomOrCleanMatrix(clear=false){
    grid=[];
    for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
        grid[i][j] = clear ?  false: Math.random() < 0.5 ;
    }
    }
}

function getNeighbors(i, j) {
  let neighbors = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      if (di === 0 && dj === 0) continue;
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
  grid = nextGrid;
}

// Draw the grid of cells

function drawGridTable() {
    const table = document.querySelector('.tab');
    const rows = table.getElementsByTagName('tr');
    const cols = rows[0].getElementsByTagName('td').length;
    console.log("logs",cols);
  
    // Iterate through each row
    for (let i = 0; i < rows.length; i++) {
      // Get the current row
      const row = rows[i];
  
      // Iterate through each cell in the current row
      for (let j = 0; j < cols; j++) {
        // Get the current cell
        const cell = row.getElementsByTagName('td')[j];
  
        // Get the value of the current cell
        const value = grid[i][j];
  
        // Set the color of the current cell
        if (value) {
          cell.style.backgroundColor = '#005792';
        } else {
          cell.style.backgroundColor = '#FFFFFF';
        }
      }
    }
  }

// Set up the game loop
function gameLoop(next=false) {
    setTimeout(()=>{
        if (!stopped) {

            updateGrid();
            drawGridTable();
            if (stateChanged && !next) {
               gameLoop();
            }else{
                console.log("pas encore",stateChanged,next);
            }
        }
    },500)
    
}

createRandomOrCleanMatrix();
gameLoop();