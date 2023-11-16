const tab = document.querySelector('.tab');
let count  = 20;




function generateMatrix(n) {
    let matrix = [];

    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = i * n + j + 1;
        }
    }

    return matrix;
}

function displayTable(matrix) {
    const table = document.createElement('table');

    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('td');
            cell.setAttribute('i',`${i}`);
            cell.setAttribute('j',`${j}`);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    tab.appendChild(table);
}

function updateNumberValue() {
    count = document.querySelector("#number").value
    console.log('Number value changed:', count);
    displayTable(generateMatrix(count));
}

console.log("count",count);

const matrixSize =20;
const rows = 20 ;
const cols = 20;
const myMatrix = generateMatrix(matrixSize);


displayTable(myMatrix);