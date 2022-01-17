const gridContainer = document.querySelector("#grid-container");
let gridPixels;
let drawState = false;

/*
 * Keeps track of whether left click is being held down, allows
 * user to keep drawing without clicking individual pixels
*/
function initialiseMouseClickDetection(){
    window.addEventListener('mousedown', (e) => {
        if (e.button === 0){
            drawState = true;
        }
    })

    window.addEventListener('mouseup', (e) => {
        if (e.button === 0){
            drawState = false;
        }
    });
}

function generateGrid(size){
    // Set grid containers maximum items per column equal to size parameter
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`; 

    for(let i = 0; i < size * size; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        gridContainer.appendChild(pixel); 
        
        AddMouseoverAndMousedownEvent(pixel);
        disableDragDropFunctionality(pixel);
    }  
}

function AddMouseoverAndMousedownEvent(pixel){
    pixel.addEventListener('mousedown', (e) => {
        if (e.button === 0){
            colorPixel(e);
        }
    });

    pixel.addEventListener('mouseover', (e) => {
        if (drawState){
            colorPixel(e);
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

function colorPixel(pixel){
    pixel.currentTarget.classList.add('painted');
    pixel.currentTarget.style.backgroundColor = "black";
}

function initialiseButtonOptions(){
    clearGrid();
}

function clearGrid(){
    let clear = document.querySelector("#clear");
    clear.addEventListener('click', () => {
        let paintedPixels = document.querySelectorAll('.painted');

        paintedPixels.forEach(pixel => {
            pixel.removeAttribute('style');
            pixel.classList.remove('painted');
        });
    });
}

generateGrid(16);
initialiseMouseClickDetection();
initialiseButtonOptions();