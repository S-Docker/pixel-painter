const Tools = Object.freeze({
    PAINT: Symbol("paint"),
    ERASE: Symbol("erase")
});

const gridContainer = document.querySelector("#grid-container");
let paintColor = '#000000';
let backgroundColor = '#ffffff';
let toolState = Tools.PAINT;
let mouseDown = false;
let gridShown = true;

/*
 * Keeps track of whether left click is being held down, allows
 * user to keep drawing without clicking individual pixels
*/
function initialiseMouseClickDetection(){
    window.addEventListener('mousedown', (e) => {
        if (e.button === 0){
            mouseDown = true;
        }
    })

    window.addEventListener('mouseup', (e) => {
        if (e.button === 0){
            mouseDown = false;
        }
    });
}

function generateGrid(size){
    // Set grid containers maximum items per column equal to size parameter
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`; 

    for(let i = 1; i <= size * size; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        gridContainer.appendChild(pixel); 
        
        AddMouseoverAndMousedownEvent(pixel);
        disableDragDropFunctionality(pixel);

        // stop double border being created on last pixel in the column
        if (i % size !== 0){
            pixel.style.borderRightStyle = "solid";
        }

        // stop double border being created on last row in the grid
        if (i <= ((size * size) - size)){
            pixel.style.borderBottomStyle = "solid";
        }
    }  
}

function AddMouseoverAndMousedownEvent(pixel){
    pixel.addEventListener('mousedown', (e) => {
        if (e.button === 0){
            performToolAction(e);
        }
    });

    pixel.addEventListener('mouseover', (e) => {
        if (mouseDown){
            performToolAction(e);
        }
    });
}

function disableDragDropFunctionality(pixel){
    ['dragstart', 'drop'].forEach(e => {
        pixel.addEventListener(e, (e) => {
            e.preventDefault();
        });
    });
}

function paintPixel(pixel){
    pixel.currentTarget.classList.add('painted');
    pixel.currentTarget.style.backgroundColor = paintColor;
}

function erasePixel(pixel){
    pixel.currentTarget.classList.remove('painted');
    pixel.currentTarget.style.removeProperty('background-color');
}

function initialiseButtonOptions(){
    clearGrid();
    toggleGridLines();
    SelectPaintTool();
    SelectEraserTool();
}

function clearGrid(){
    let clear = document.querySelector("#clear");
    clear.addEventListener('click', () => {
        let paintedPixels = document.querySelectorAll('.painted');

        paintedPixels.forEach(pixel => {
            pixel.style.removeProperty('background-color');
            pixel.classList.remove('painted');
        });
    });
}

function toggleGridLines(){
    let toggleGridButton = document.querySelector('#toggle-grid-lines');
    let gridContainer = document.querySelector('#grid-container');

    toggleGridButton.addEventListener('click', () => {
        let borderColor = gridShown ? 'transparent' : '#c9c9c9';
        let pixels = document.querySelectorAll('.pixel');

        pixels.forEach(pixel => {
            pixel.style.borderColor = borderColor;
        });

        gridShown = !gridShown;

        // makes pixels appear to touch edge of grid by matching border color to wrapper border color
        gridContainer.style.borderColor = gridShown ? "#c9c9c9" : "#161f6d";
    });
}

function setPaintColor(value){
    paintColor = value;
}

function setBackgroundColor(value){
    document.querySelector('#grid-container').style.backgroundColor = value;
}

function SelectPaintTool(){
    let paintButton = document.querySelector('#paint-tool-selector'); 

    paintButton.addEventListener('click', () => {
        toolState = Tools.PAINT;
    });
}

function SelectEraserTool(){
    let paintButton = document.querySelector('#erase-tool-selector'); 

    paintButton.addEventListener('click', () => {
        toolState = Tools.ERASE;
    });
}

function performToolAction(pixel){
    switch(toolState) {
        case Tools.PAINT:
            paintPixel(pixel);
            break;
        case Tools.ERASE:
            erasePixel(pixel);
    }
}

generateGrid(16);
initialiseMouseClickDetection();
initialiseButtonOptions();
setBackgroundColor(backgroundColor);