let playerElement = document.querySelector("#player");

let valuePosX = document.querySelector("#posX-value");
let buttonPosX = document.querySelector("#posX-button");

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

    moveX(value)
    {
        console.log(parseInt(this.element.style.top) + parseInt(value));
        console.log(parseInt(mainField.element.style.height) - parseInt(this.element.style.height));
        
        if ((parseInt(this.element.style.top) + parseInt(value)) > (parseInt(mainField.element.style.height) - parseInt(this.element.style.height)))
        {
            console.log('ээ');
        }
        else
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
            }.bind(this), 5);
        }
    }
}

let mainField = new Field('field', 600, 600);
let playerOne = new Player('player', 50, 50, 'red');

buttonPosX.addEventListener('click', function()
{
    playerOne.moveX(valuePosX.value);
});