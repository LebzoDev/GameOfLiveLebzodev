

function getSelectedValue(type='')
{
    let selectedValue = document.getElementById(type).value;
    type==='rows'? rows = selectedValue : cols = selectedValue;
    tab.innerHTML = '';

    const myMatrix = generateMatrix(rows,cols);

    displayTable(myMatrix);
    createRandomOrCleanMatrix();
    startGame();
    getClickEvents();
}

function getClickEvents(){
    cells =document.querySelectorAll('td');

    cells.forEach((element) => element.addEventListener('click', () => {
        const i = element.getAttribute('i');
        const j = element.getAttribute('j');
        const value = grid[i][j];
       
        grid[i][j] = !value;
        element.style.backgroundColor = value ?  '#FFFFFF': '#005792';
    })) 
}


function callBackEventListernner(
        e,
        stoppedValue,startGameRestarted=false,next=false,
        createNewMatrix=false,drawTable=false,cleanMatrix=false)
{
    let element = e.target;
    let id = element.getAttribute('id');

    manageButtonsState(id);
    stopped =stoppedValue;
    createNewMatrix ? createRandomOrCleanMatrix(cleanMatrix) : null;
    !startGameRestarted ? null : (next ? startGame(true):startGame());
    drawTable ? makeChange() : null;
}

function createRandomOrCleanMatrix(clear=false)
{
    round =0;
    grid=[];
    for (let i = 0; i < rows; i++)
    {
        grid[i] = [];
        for (let j = 0; j < cols; j++)
            grid[i][j] = clear ?  false: Math.random() < 0.5 ;
    }
}

function getNeighbors(i, j)
{
  let neighbors = 0;
  for (let xi = -1; xi <= 1; xi++)
    for (let yj = -1; yj <= 1; yj++)
    {
        if (xi === 0 && yj === 0) continue;
        const ni = i + xi;
        const nj = j + yj;
        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj])  neighbors++;
    }
  return neighbors;
}

function makeNewRound()
{
    round++;
    const nextGrid = [];
    for (let i = 0; i < rows; i++)
    {
        nextGrid[i] = [];
        for (let j = 0; j < cols; j++) {
            const neighbors = getNeighbors(i, j);
            nextGrid[i][j] = grid[i][j] ? (neighbors === 2 || neighbors === 3) :  (neighbors === 3);
        }
    }
    stateChanged = JSON.stringify(grid) !== JSON.stringify(nextGrid);
    grid = nextGrid;
    roundElement.textContent=round;
}

function makeChange()
{
    const table = document.querySelector('.tab');
    const rows = table.getElementsByTagName('tr');
    const cols = rows[0].getElementsByTagName('td').length;
  
    for (let i = 0; i < rows.length; i++)
    {
        const row = rows[i];
        for (let j = 0; j < cols; j++)
        {
            const cell = row.getElementsByTagName('td')[j];
            const value = grid[i][j];
            cell.style.backgroundColor = value ? '#005792' : '#FFFFFF';
        }
    }
  }

function startGame(next=false)
{
    setTimeout(()=>
    {
        if (!stopped)
        {
            makeNewRound();
            makeChange();
            if (stateChanged && !next) startGame();
        }
    },500)
}

manageButtonsState('start');
getClickEvents();
generateOptions();
createRandomOrCleanMatrix();
startGame();