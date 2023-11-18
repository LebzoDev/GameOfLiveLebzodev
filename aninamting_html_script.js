
/**
 * Game of Life implementation
 */


//Declaration of all variables required for this project

const tab = document.querySelector('.tab');
let rows = 10 ;
let cols = 30;

let stopped = false;
let stateChanged=true;
let grid = [];
let cells =document.querySelectorAll('td');
let round = 0;

const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const clear = document.getElementById('clear');
const start = document.getElementById('start');
const next = document.getElementById('next');
const roundElement = document.querySelector('#round');

reset.addEventListener('click', (e) => callBackEventListernner(e,false,true,false,true,false,false));
stop.addEventListener('click',  (e) => callBackEventListernner(e,true,true));
next.addEventListener('click',  (e) => callBackEventListernner(e,false,true,true));
start.addEventListener('click', (e) => callBackEventListernner(e,false,true));
clear.addEventListener('click', (e) => callBackEventListernner(e,true,false,false,true,true,true));


//Declaration of all methods required for animating HTML elements

function generateOptions()
{
    let rowsSelect = document.getElementById("rows");
    let colsSelect = document.getElementById("cols");

    for (let i = 10; i <= 100; i += 10)
    {
        const optionRow = document.createElement("option");
        const optionCol= document.createElement("option");

        optionRow.value = optionRow.value = i;
        optionRow.text  = optionCol.text = i;

        colsSelect.value = cols;
        rowsSelect.value = rows;

        rowsSelect.add(optionRow);
        colsSelect.add(optionCol);
    }
}

function generateMatrix(rows,cols)
{
    let matrix = [];

    for (let i = 0; i < rows; i++)
    {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) 
            matrix[i][j] = 'whatever';
    }
    return matrix;
}

function displayTable(matrix) {
    const table = document.createElement('table');

    for (let i = 0; i < matrix.length; i++)
    {
        const row = document.createElement('tr');
        for (let j = 0; j < matrix[i].length; j++)
        {
            const cell = document.createElement('td');
            cell.setAttribute('i',`${i}`);
            cell.setAttribute('j',`${j}`);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    tab.appendChild(table);
}

function manageButtonsState(id){

    const takeOffDisable = 'opacity:1;cursor:pointer';
    const allowDisable = 'opacity:0.5;cursor:not-allowed';

    switch (id) {
        case 'start':
            start.disabled =true;
            start.style= allowDisable;
            next.disabled =true;
            next.style=allowDisable;
            stop.style=takeOffDisable;
            stop.disabled =false;
            break;
        case 'stop':
            stop.style=allowDisable;
            stop.disabled =true;
            start.style=takeOffDisable;
            start.disabled =false;
            next.style=takeOffDisable;
            next.disabled =false; 
            break;
        case 'clear':
            stop.style=allowDisable;
            stop.disabled =true;
            start.style=allowDisable;
            start.disabled =true;
            next.style=allowDisable;
            next.disabled =true;
            clear.style=allowDisable;
            clear.disabled =true;
            roundElement.textContent=0;
            break;
        case 'reset':
            start.style=allowDisable;
            start.disabled =true;
            next.style= allowDisable;
            next.disabled =true;
            stop.style=takeOffDisable;
            stop.disabled=false;
            clear.style=takeOffDisable;
            clear.disabled=false;
            break;
        default:
            break;
    }
  
}

const myMatrix = generateMatrix(rows,cols);
displayTable(myMatrix);