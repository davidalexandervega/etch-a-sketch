// setting defaults:
let size = 100;
let mode = 'free';
let ink = 'ON';
let inkColor = 'black';
let grid = '1px solid black';
document.documentElement.style.setProperty("--grid", grid);
populate(100);

function populate(size) {
    // this way the '--size' variable in the css corresponds to the
    // selected grid size and wraps the squares properly.
    document.documentElement.style.setProperty("--size", `${100/Math.sqrt(size)}%`);

    // so that the main container is populated with the selected
    // number of squares:
    const container = document.querySelector('#container');
    let population = "";
    for (let i = 0; i < size; i++) {
        population += '<div class="square"></div>';
    }
    container.innerHTML = population;

    // the main sketch() function runs after both populate() and setMode()
    // because it contains the conditionals that decide whether
    // or not a square will be filled.
    sketch(mode);
}

function setMode() {
    // so that one toggle button can be used:
    const modeButton = document.querySelector('#modeButton');
    if (mode === 'free') {
        modeButton.innerHTML = 'mode: toggle';
        mode = 'toggle';
        ink = 'OFF';
    }
    else if (mode === 'toggle') {
        modeButton.innerHTML = 'mode: free';
        mode = 'free';
        ink = 'ON';
    }

    // see above.
    sketch(mode);
}

function setColor() {
    const colorButton = document.querySelector('#colorButton')
    if (inkColor === 'black') {
        colorButton.innerHTML = 'ink: color'
        inkColor = 'color';
    }
    else if (inkColor === 'color') {
        colorButton.innerHTML = 'ink: black'
        inkColor = 'black';
    }
}

function pastel() {
    let hue = Math.floor(Math.random() * (359 + 1));
    let pastelColor = `hsl(${hue}, 100%, 85%)`;
    return pastelColor;
}

function setGrid() {
    const gridButton = document.querySelector('#gridButton')
    if (grid === '1px solid black') {
        gridButton.innerHTML = 'grid: off'
        grid = 'none';
    }
    else if (grid === 'none') {
        gridButton.innerHTML = 'grid: on'
        grid = '1px solid black';
    }
    document.documentElement.style.setProperty("--grid", grid);
}

// using a named function allows us to add or remove the click
// listener depending upon the current mode. otherwise the
// 'add' and 'remove' do not refer to each other.
function inkSwitch () {
    if (ink === 'ON') {
        ink = 'OFF';
    }
    else if (ink === 'OFF') {
        ink = 'ON';
    }
}

function sketch(mode) {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('mouseenter', () => {
            if (ink === 'ON') {
                if (inkColor === 'black') {
                    square.setAttribute('style', 'background-color: black');
                }
                else if (inkColor === 'color') {
                    square.setAttribute('style', `background-color: ${pastel()}`)
                }
            }
        });     
    });

    if (mode === 'toggle') {
        squares.forEach((square) => {
            square.addEventListener('click', inkSwitch);
        });
    }
    else {
        squares.forEach((square) => {
            square.removeEventListener('click', inkSwitch);
        });
    }
}

function clearSketch() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.setAttribute('style', 'background-color: white');
    });
    return 'cleared.';
}