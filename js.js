const container = document.querySelector('#container');

let size = 256;
// this way the '--size' variable in the css 
// corresponds to the selected grid size:
document.documentElement.style.setProperty("--size", `${100/Math.sqrt(size)}%`);

let population = "";
for (let i = 0; i < size; i++) {
    population += '<div class="square"></div>';
}
container.innerHTML = population;

const squares = document.querySelectorAll('.square');
squares.forEach((square) => {
square.addEventListener('mouseenter', () => {
    square.setAttribute('style', 'background-color: black');
});
});