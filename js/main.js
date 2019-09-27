let valuePosY = document.querySelector("#posY-value");
let buttonPosY = document.querySelector("#posY-button");

let valuePosX = document.querySelector("#posX-value");
let buttonPosX = document.querySelector("#posX-button");

let buttonPosALL= document.querySelector("#posALL-button");

class Field
{
    constructor(id, height, width)
    {
        this.id = id;
        this.height = height;
        this.width = width;
        this.element = document.querySelector('#'+this.id);
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
    }
}

class Player
{
    constructor(id, height, width, color)
    {
        this.id = id;
        this.height = height;
        this.width = width;
        this.color = color;
        this.element = document.querySelector('#'+this.id);
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.backgroundColor = this.color;
        this.element.style.top = '0px';
        this.element.style.left = '0px';
    }

    moveY(value)
    {
        if (!((parseInt(this.element.style.top) + parseInt(value)) > (parseInt(mainField.element.style.height) - parseInt(this.element.style.height))))
        {
            let counter = 0;
            let animate = setInterval(function()
            {
                if (counter == Math.abs(value)) 
                {
                    clearInterval(animate);
                } 
                else 
                {
                    counter++;
                    let temp = (value > 0) ? parseInt(this.element.style.top) + 1 : parseInt(this.element.style.top) - 1;
                    this.element.style.top = temp + "px";
                }
            }.bind(this), 1);
        }
    }
    moveX(value)
    {
        if (!((parseInt(this.element.style.left) + parseInt(value)) > (parseInt(mainField.element.style.width) - parseInt(this.element.style.width))))
        {
            let counter = 0;
            let animate = setInterval(function()
            {
                if (counter == Math.abs(value)) 
                {
                    clearInterval(animate);
                } 
                else 
                {
                    counter++;
                    let temp = (value > 0) ? parseInt(this.element.style.left) + 1 : parseInt(this.element.style.left) - 1;
                    this.element.style.left = temp + "px";
                }
            }.bind(this), 1);
        }
    }
}

let mainField = new Field('field', 600, 600);
let playerOne = new Player('player', 50, 50, 'red');

buttonPosY.addEventListener('click', function()
{
    playerOne.moveY(valuePosY.value);
});

buttonPosX.addEventListener('click', function()
{
    playerOne.moveX(valuePosX.value);
});

buttonPosALL.addEventListener('click', function()
{
    playerOne.moveX(valuePosX.value);
    playerOne.moveY(valuePosY.value);
});