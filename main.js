const gridContainer = document.querySelector("#grid-container");

function generateGrid(size){
    // Set grid containers maximum items per column equal to size parameter
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`; 

    for(let i = 0; i < size * size; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        gridContainer.appendChild(pixel); 
    }  
}

document.onload = generateGrid(16);