// to find HTML elements and store it into a variable use document.querySelector("class name")
// declare variables
const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset-button");
const gameGrid = document.querySelector(".game-grid");
// document.querySelectorAll grabs all elements specified in parameter acts like an array
const cellDivs = document.querySelectorAll(".game-cell");

let gameIsLive = true;
let xIsNext = true;

//passing by value makes a copy of your data wherefore passing by reference does not

//functions
const fadeInEffect = () => {
    if (gameGrid.classList[0] == "game-grid") 
    {
        gameGrid.classList.remove("game-grid");
        gameGrid.classList.add("fading");
    }
    else if (gameGrid.classList[0] == "fading")
    {
        gameGrid.classList.remove("fading");
        gameGrid.classList.add("game-grid");
    }

    // when the "won" class is added it performs a fade out effect, 
    // but when "won" is removed "game-grid"/"fading" performs the fade in effect
    gameGrid.classList.remove("won");
    return;
}

const varifyWinner = (value) => {
    if (value == "x")
    {  
        statusDiv.innerHTML = `X has won!`;
        gameGrid.classList.add("won");
    }
    else if (value == "o")
    {
        statusDiv.innerHTML = `<span>${value.toUpperCase()} has won!</span>`;
        gameGrid.classList.add("won");
    }
    else 
    {
        statusDiv.innerHTML = value;
    }

    for (cellDiv of cellDivs)
    {
        cellDiv.classList.add("non-active");
    }
    
    gameIsLive = false;
}

const checkGameStaus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    // check winner
    if (topLeft && topLeft == topMiddle && topMiddle == topRight)
    {
        varifyWinner(topLeft);
        // cellDivs[0].classList.add("won");
        // cellDivs[1].classList.add("won");
        // cellDivs[2].classList.add("won");
    }
    else if (middleLeft && middleLeft == middleMiddle && middleMiddle == middleRight)
    {
        varifyWinner(middleLeft);
        // cellDivs[3].classList.add("won");
        // cellDivs[4].classList.add("won");
        // cellDivs[5].classList.add("won");
    }
    else if (bottomLeft && bottomLeft == bottomMiddle && bottomMiddle == bottomRight)
    {
        varifyWinner(bottomLeft);
        // cellDivs[6].classList.add("won");
        // cellDivs[7].classList.add("won");
        // cellDivs[8].classList.add("won");
    }
    else if (topLeft &&  topLeft == middleLeft && middleLeft == bottomLeft)
    {
        varifyWinner(topLeft);
        // cellDivs[0].classList.add("won");
        // cellDivs[3].classList.add("won");
        // cellDivs[6].classList.add("won");
    }
    else if (topMiddle && topMiddle == middleMiddle && middleMiddle == bottomMiddle)
    {
        varifyWinner(topMiddle);
        // cellDivs[1].classList.add("won");
        // cellDivs[4].classList.add("won");
        // cellDivs[7].classList.add("won");
    }
    else if (topRight && topRight == middleRight && middleRight == bottomRight)
    {
        varifyWinner(topRight);
        // cellDivs[2].classList.add("won");
        // cellDivs[5].classList.add("won");
        // cellDivs[8].classList.add("won");
    }
    else if (topLeft && topLeft == middleMiddle && middleMiddle == bottomRight)
    {
        varifyWinner(topLeft);
        // cellDivs[0].classList.add("won");
        // cellDivs[4].classList.add("won");
        // cellDivs[8].classList.add("won");
    }
    else if (topRight && topRight == middleMiddle && middleMiddle == bottomLeft)
    {
        varifyWinner(topRight);
        // cellDivs[2].classList.add("won");
        // cellDivs[4].classList.add("won");
        // cellDivs[6].classList.add("won");
    }
    else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight)
    {
        const tie = `Game tied!`;
        varifyWinner(tie);
    }
    else 
    {
        xIsNext = !xIsNext;
        if (xIsNext)
        {
            statusDiv.innerHTML = `X is next`;
        }
        else
        {
            statusDiv.innerHTML = `<span>O is next</span>`;
        }
    }
}

const handleReset = () => {
    xIsNext = true;
    gameIsLive = true;
    statusDiv.innerHTML = `X is next`;
    // gameGrid.classList.remove("won");
    // gameGrid.classList.remove("game-grid");
    // gameGrid.classList.add("fading");

    fadeInEffect();
    
    for (cellDiv of cellDivs)
    {
        cellDiv.classList.remove("x");
        cellDiv.classList.remove("o");
        cellDiv.classList.remove("non-active");
    }
}

const handleCell = (e) => {
    if (e.target.classList[1] == "x" || e.target.classList[1] == "o" || !gameIsLive)
    {
        return;
    }
    
    if (xIsNext && gameIsLive)
    {
        e.target.classList.add("x");
        checkGameStaus();
    }
    else if (!xIsNext && gameIsLive)
    {
        e.target.classList.add("o");
        checkGameStaus();
    }  
}

resetDiv.addEventListener("click", handleReset);

for (cellDiv of cellDivs)
{
    cellDiv.addEventListener("click", handleCell);
}