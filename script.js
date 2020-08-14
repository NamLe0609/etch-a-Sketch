const gridBtn = document.querySelector("#grid-button");
const container = document.querySelector("#container");
const clearBtn = document.querySelector("#clear-button");
const randBtn = document.querySelector("#random-color-button");
let childNodes;
let chosenColor = 0;

gridBtn.addEventListener("click", () => {
    gridSize = Number(
        prompt("Enter a grid size: \n(Grid size should not exceed 100)")
    );
    if (gridSize == NaN || gridSize > 100 || gridSize == 0) {
        return;
    } else {
        createGrid(gridSize);
    }
});

clearBtn.addEventListener("click", () => {
    childNodes = Array.from(container.childNodes);
    childNodes.forEach(function (child) {
        child.style.backgroundColor = "white";
    });
});

randBtn.addEventListener("click", () => {
    childNodes = Array.from(container.childNodes);
    if (chosenColor == 0) {
        childNodes.forEach(function (child) {
            child.removeEventListener("mouseover", setSelfBlack);
            child.addEventListener("mouseover", setSelfRandom);
        });
        chosenColor = 1;
        randBtn.style.backgroundColor = "#0000ff";
    } else if (chosenColor == 1) {
        childNodes.forEach(function (child) {
            child.removeEventListener("mouseover", setSelfRandom);
            child.addEventListener("mouseover", setSelfBlack);
        });
        randBtn.style.backgroundColor = "#5555ff";
        chosenColor = 0;
    }
});

var randomColor;
function setSelfRandom() {
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.style.backgroundColor = "#" + randomColor;
}

function setSelfBlack() {
    this.style.backgroundColor = "black";
}

function penColor(chosenColor) {
    if (chosenColor == 0) {
        return setSelfBlack;
    } else if (chosenColor == 1) {
        return setSelfRandom;
    }
}

function createGrid(gridSize) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    lengthSize = 600 / gridSize;
    gridSize *= gridSize;
    for (let i = 0; i < gridSize; i++) {
        div = document.createElement("div");
        div.setAttribute(
            "style",
            `flex: 1 1 ${lengthSize - 2}px; border: solid black 0.5px`
        );
        div.addEventListener("mouseover", penColor(chosenColor));
        container.appendChild(div);
    }
}
