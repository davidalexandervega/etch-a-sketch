// setting defaults:
let size = 625;
let mode = 'free';
let ink = 'ON';
let inkColor = 'black';
let grid = '1px solid black';
let backgroundColor = 'white';
document.documentElement.style.setProperty("--grid", grid);
document.documentElement.style.setProperty("--backgroundColor", backgroundColor);
populate(625);

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
    clearSketch();
}

function setMode() {
    // so that one toggle button can be used:
    const modeButton = document.querySelector('#modeButton');
    const infoText = document.querySelector('#infoText');
    if (mode === 'free') {
        modeButton.innerHTML = 'mode: toggle';
        mode = 'toggle';
        ink = 'OFF';
        infoText.innerHTML = `in <i><b>toggle sketch</b></i> mode, you can click over the sketch area to toggle ink on and off. the ink is currently <i><b>${ink}</b></i>.`
    }
    else if (mode === 'toggle') {
        modeButton.innerHTML = 'mode: free';
        mode = 'free';
        ink = 'ON';
        infoText.innerHTML = 'in <i><b>free sketch</b></i> mode, your cursor will paint squares as it passes through the sketch area.'
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
        colorButton.innerHTML = 'ink: white'
        inkColor = 'white';
    }
    else if (inkColor === 'white') {
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
    if (grid === '1px solid black' || grid === '1px solid white') {
        gridButton.innerHTML = 'grid: off'
        grid = 'none';
    }
    else if (grid === 'none') {
        gridButton.innerHTML = 'grid: on'
        if (backgroundColor === 'white') {
            grid = '1px solid black';
        }
        else if (backgroundColor === 'black') {
            grid = '1px solid white';
        }
    }
    document.documentElement.style.setProperty("--grid", grid);
}

function setBackground() {
    const backgroundButton = document.querySelector('#backgroundButton')
    if (backgroundColor === 'white') {
        backgroundButton.innerHTML = 'background: black'
        backgroundColor = 'black';
        if (grid === '1px solid black') {
            grid = '1px solid white';
        }
    }
    else if (backgroundColor === 'black') {
        backgroundButton.innerHTML = 'background: white'
        backgroundColor = 'white';
        if (grid === '1px solid white') {
            grid = '1px solid black';
        }
    }
    paintBackground();
    document.documentElement.style.setProperty("--grid", grid);
}

function paintBackground() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        // this way, if any of the squares are currently neither black nor white, they retain their color
        // when the background color is changed:
            let currentColor = window.getComputedStyle(square).getPropertyValue('background-color');
            console.log(currentColor)
            if (currentColor === 'rgb(0, 0, 0)' || currentColor === 'rgb(255, 255, 255)') {
                square.setAttribute('style', `background-color: ${backgroundColor}`);
            }
    });
}

function clearSketch() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.setAttribute('style', `background-color: ${backgroundColor}`);
    });
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
    const infoText = document.querySelector('#infoText');
    infoText.innerHTML = `in <i><b>toggle sketch</b></i> mode, you can click over the sketch area to toggle ink on and off. the ink is currently <i><b>${ink}</b></i>.`
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
                else if (inkColor === 'white') {
                    square.setAttribute('style', 'background-color: white');
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