const gridBtn = document.querySelector("#grid-button");
const container = document.querySelector("#container");
const clearBtn = document.querySelector("#clear-button");
const randBtn = document.querySelector("#random-color-button");
const greyBtn = document.querySelector("#greyscale-button");
let childNodes; // Var containing every square in grid
let chosenColor = 0; // 0 is black, 1 is random, 2 is greyscale

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

greyBtn.addEventListener("click", () => {
    childNodes = Array.from(container.childNodes);
    removeGridEvent(childNodes, chosenColor);
    if (chosenColor == 0 || chosenColor == 1) {
        chosenColor = 2;
        childNodes.forEach(function (child) {
            child.addEventListener("mouseover", setSelfGreyscale);
        });
        greyBtn.style.backgroundColor = "grey";
        randBtn.style.backgroundColor = "#5555ff";
    } else if (chosenColor == 2) {
        chosenColor = 0;
        childNodes.forEach(function (child) {
            child.addEventListener("mouseover", setSelfBlack);
        });
        greyBtn.style.backgroundColor = "#cfcfcf";
    } else {
        return;
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
    removeGridEvent(childNodes, chosenColor);
    if (chosenColor == 0 || chosenColor == 2) {
        chosenColor = 1;
        childNodes.forEach(function (child) {
            child.addEventListener("mouseover", setSelfRandom);
        });
        randBtn.style.backgroundColor = "blue";
        greyBtn.style.backgroundColor = "#cfcfcf";
    } else if (chosenColor == 1) {
        chosenColor = 0;
        childNodes.forEach(function (child) {
            child.addEventListener("mouseover", setSelfBlack);
        });
        randBtn.style.backgroundColor = "#5555ff";
    } else {
        return;
    }
});

var randomColor;
function setSelfRandom() {
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.style.backgroundColor = "#" + randomColor;
}

function setSelfBlack() {
    this.style.backgroundColor = "rgb(0, 0, 0)";
}

var greyColor;
function setSelfGreyscale() {
    greyColor = this.style.backgroundColor;
    switch (greyColor) {
        case "rgb(210, 210, 210)":
            this.style.backgroundColor = "rgb(189, 189, 189)";
            break;
        case "rgb(189, 189, 189)":
            this.style.backgroundColor = "rgb(168, 168, 168)";
            break;
        case "rgb(168, 168, 168)":
            this.style.backgroundColor = "rgb(147, 147, 147)";
            break;
        case "rgb(147, 147, 147)":
            this.style.backgroundColor = "rgb(126, 126, 126)";
            break;
        case "rgb(126, 126, 126)":
            this.style.backgroundColor = "rgb(105, 105, 105)";
            break;
        case "rgb(105, 105, 105)":
            this.style.backgroundColor = "rgb(84, 84, 84)";
            break;
        case "rgb(84, 84, 84)":
            this.style.backgroundColor = "rgb(63, 63, 63)";
            break;
        case "rgb(63, 63, 63)":
            this.style.backgroundColor = "rgb(42, 42, 42)";
            break;
        case "rgb(42, 42, 42)":
            this.style.backgroundColor = "rgb(21, 21, 21)";
            break;
        case "rgb(21, 21, 21)":
            this.style.backgroundColor = "rgb(0, 0, 0)";
            break;
        case "rgb(0, 0, 0)":
            break;
        default:
            this.style.backgroundColor = "rgb(210, 210, 210)";
    }
}

function penColor(chosenColor) {
    if (chosenColor == 0) {
        return setSelfBlack;
    } else if (chosenColor == 1) {
        return setSelfRandom;
    } else if (chosenColor == 2) {
        return setSelfGreyscale;
    } else {
        return;
    }
}

function removeGridEvent(childNodes, chosenColor) {
    if (chosenColor == 0) {
        childNodes.forEach(function (child) {
            child.removeEventListener("mouseover", setSelfBlack);
        });
    } else if (chosenColor == 1) {
        childNodes.forEach(function (child) {
            child.removeEventListener("mouseover", setSelfRandom);
        });
    } else if (chosenColor == 2) {
        childNodes.forEach(function (child) {
            child.removeEventListener("mouseover", setSelfGreyscale);
        });
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
