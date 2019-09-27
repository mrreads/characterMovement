let valuePosY = document.querySelector("#posY-value");
let buttonPosY = document.querySelector("#posY-button");

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
    constructor(id, height, width)
    {
        this.id = id;
        this.height = height;
        this.width = width;
        this.element = document.querySelector('#'+this.id);
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = '0px';
        this.element.style.left = '0px';
        this.direction = 'idle';
        this.isMove = false;

        setInterval(function () {
            this.checkIdle();
        }.bind(this), 250);
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
                    let temp;
                    counter++;
                    if (value > 0)
                    {
                        temp = parseInt(this.element.style.top) + 1;
                        this.element.style.backgroundImage = 'url("./img/walkForward.gif")';
                        this.element.style.transform = 'unset';
                        this.direction = 'forward';
                        this.isMove = true;
                    }
                    else
                    {
                        temp = parseInt(this.element.style.top) - 1;
                        this.element.style.backgroundImage = 'url("./img/walkBack.gif")';
                        this.element.style.transform = 'unset';
                        this.direction = 'backward';
                        this.isMove = true;
                    }

                    if (temp >= 0)
                    {
                        this.element.style.top = temp + "px";
                    }
                }
            }.bind(this), 1);
        }
    }
    moveX(value)
    {
        if (!((parseInt(this.element.style.left) + parseInt(value)) > (parseInt(mainField.element.style.width) - parseInt(this.element.style.width))))
        {
            let counter = 0;
            let direction;
            let animate = setInterval(function()
            {
                if (counter == Math.abs(value)) 
                {
                    clearInterval(animate);
                } 
                else 
                {
                    let temp;
                    counter++;

                    if (value >= 0)
                    {
                        temp = parseInt(this.element.style.left) + 1;
                        this.element.style.backgroundImage = 'url("./img/walkSide.gif")';
                        this.element.style.transform = 'scaleX(-1)';
                        this.direction = 'side';
                    }
                    else
                    {
                        temp =parseInt(this.element.style.left) - 1;
                        this.element.style.backgroundImage = 'url("./img/walkSide.gif")';
                        this.element.style.transform = 'unset';
                        this.direction = 'side';
                    }

                    if (temp > 0)
                    {
                        this.element.style.left = temp + "px";
                    }
                }
            }.bind(this), 1);
        }
    }

    checkIdle()
    {
        // если спустя некоторое время координаты персонажа не изменились, значит он стоит, и состояние isMoving меняется на FALSE;
        this.tempOldOne = this.element.style.top;
        this.tempOldTwo = this.element.style.left;
        
        setTimeout(function(){
            this.tempNewOne = this.element.style.top;
            this.tempNewTwo = this.element.style.left;
        }.bind(this), 100);

        if ((this.tempOldOne == this.tempNewOne) && (this.tempOldTwo == this.tempNewTwo))
        {
            this.isMove = false;
        }

        if (this.direction == 'forward' && this.isMove == false)
        {
            this.element.style.backgroundImage = 'url("./img/idleForward.png")';
        }
        if (this.direction == 'backward' && this.isMove == false)
        {
            this.element.style.backgroundImage = 'url("./img/idlebackward.png")';
        }
        if (this.direction == 'side' && this.isMove == false)
        {
            this.element.style.backgroundImage = 'url("./img/idleSidewalk.png")';
        }
    }
}

let mainField = new Field('field', 400, 640);
let playerOne = new Player('player', 50, 50);

buttonPosY.addEventListener('click', function()
{
    playerOne.moveY(valuePosY.value);
});

buttonPosX.addEventListener('click', function()
{
    playerOne.moveX(valuePosX.value);
});

// управление клвиатурой
document.addEventListener('keypress', function(event)
{
    if (event.code == 'KeyW')
    {
        playerOne.moveY(-10);
    }
    if (event.code == 'KeyS')
    {
        playerOne.moveY(10);
    }
    if (event.code == 'KeyA')
    {
        playerOne.moveX(-10);
    }
    if (event.code == 'KeyD')
    {
        playerOne.moveX(10);
    }
});


// скрытие открытие информационной панели
document.querySelector("#hideButton").addEventListener('click', function()
{
    if (document.querySelector("#information").classList.contains('hide'))
    {
        document.querySelector("#information").classList.remove('hide');
    }
    else
    {
        document.querySelector("#information").classList.add('hide');
    }
});


// панель дебага
document.querySelector(".debug p:nth-child(1)").textContent = 'Высота поля: '+mainField.element.style.height;
document.querySelector(".debug p:nth-child(2)").textContent = 'Ширина поля: '+mainField.element.style.width;
setInterval(function()
{
    document.querySelector(".debug p:nth-child(3)").textContent = 'Координаты игрока по Y: '+ parseInt(playerOne.element.style.top)+' : '+(parseInt(playerOne.element.style.top)+parseInt(playerOne.element.style.height));
    document.querySelector(".debug p:nth-child(4)").textContent = 'Координаты игрока по X: '+ parseInt(playerOne.element.style.left)+' : '+(parseInt(playerOne.element.style.left)+parseInt(playerOne.element.style.width));
    document.querySelector(".debug p:nth-child(5)").textContent = 'isMove: ' + playerOne.isMove;
    document.querySelector(".debug p:nth-child(6)").textContent = 'direction: ' + playerOne.direction;
}.bind(this), 100);