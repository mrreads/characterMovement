let fieldElement = document.querySelector("#field");
let playerElement = document.querySelector("#player");

let valuePosX = document.querySelector("#posX-value");
let buttonPosX = document.querySelector("#posX-button");

class Player
{
    constructor(element)
    {
        this.element = playerElement;
    }

    moveX(value)
    {
        this.element.style.top = value + "px";
    }
}

let playerOne = new Player;

buttonPosX.addEventListener('click', function()
{
    playerOne.moveX(valuePosX.value);
});