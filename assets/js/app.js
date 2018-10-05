window.onload = function () {
    /*
    Check if logged in
    */
    if (localStorage.getItem("loggedInUser") === null) {
        window.location.replace("index.html");
    }

    /*
    Vars
    */
    let matrixArray;

    /*
    Create grid
    */
    var grid = clickableGrid(8, 8, function (el, row, col, i) {
        let inversCol = 7 - col;
        var invertedEl = document.querySelector("table tr:nth-child(" + (row + 1) + ") td:nth-child(" + (8 - col) + ")");
        if (el.classList.contains('clicked')) {
            el.classList.remove('clicked');
            invertedEl.classList.remove('clicked');

            matrixArray[row][col] = "black";
            matrixArray[row][inversCol] = "black";
        } else {
            el.className = 'clicked';
            invertedEl.classList.add('clicked');

            matrixArray[row][col] = "color";
            matrixArray[row][inversCol] = "color";
        }
    });

    document.body.insertBefore(grid, document.body.firstChild);

    function clickableGrid(rows, cols, callback) {
        matrixArray = createArray(rows, cols);
        var i = 0;
        var grid = document.createElement('table');
        grid.className = 'grid';
        for (var r = 0; r < rows; ++r) {
            var tr = grid.appendChild(document.createElement('tr'));
            for (var c = 0; c < cols; ++c) {
                var cell = tr.appendChild(document.createElement('td'));
                cell.id = ++i;
                cell.addEventListener('click', (function (el, r, c, i) {
                    return function () {
                        callback(el, r, c, i);
                    }
                })(cell, r, c, i), false);
            }
        }
        return grid;
    }

    /*
    Update color in matrix
    */
    const colorPicker = document.querySelector('#colorPicker');
    colorPicker.addEventListener('change', function () {
        var nodes = document.querySelectorAll('.grid td.clicked');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].style.backgroundColor = colorPicker.options[colorPicker.selectedIndex].value;
        }
    })

    /*
    Create color matrix array
    */
    function createArray(col, row) {
        matrixArray = [];
        for (let i = 0; i < row; i++) {
            matrixArray[i] = [];
            for (let j = 0; j < col; j++) {
                matrixArray[i][j] = 'black'
            }
        }
        return matrixArray;
    }

    /*
    Show on sensehat button
    */
    document.querySelector('.btnShow').addEventListener('click', function () {
        let selectedColor = getSelectedColor();
        updateMatrixInFirebase(selectedColor);

        /*
        var rootRef = firebase.database().ref();
        var urlRef = rootRef.child("matrix");
        urlRef.once("value", function (snapshot) {
            snapshot.forEach(function (child) {
                console.log(child.val());
            });
        });
        */
    });

    /*
    Get selected color
    */
    function getSelectedColor() {
        const dropDown = document.querySelector('#colorPicker');
        let selectedColor = dropDown.options[dropDown.selectedIndex].value;
        switch (selectedColor) {
            case 'red':
                return { r: 255, g: 0, b: 0 }
            case 'blue':
                return { r: 0, g: 0, b: 255 }
            case 'green':
                return { r: 0, g: 255, b: 0 }
            default:
                return { r: 255, g: 255, b: 0 }
        }
    }

    /*
    Firebase update
    */
    function updateMatrixInFirebase(color) {
        firebase.database().ref('color').set(color);
        firebase.database().ref('matrix').set(matrixArray);
    }
}