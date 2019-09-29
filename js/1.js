class Field 
{
    constructor(id, height, width) 
    {
        this.id = id;
        this.height = height;
        this.width = width;
        this.element = document.querySelector('#' + this.id);
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
    }
}

class Player 
{
    constructor(id, height, width, top, left) 
    {
        this.id = id;
        this.height = height;
        this.width = width;
        this.element = document.querySelector('#' + this.id);
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
        this.direction = 'idle';
        this.isMove = false;
        this.rupeeCounter = 0;

        setInterval(function () {
            this.checkIdle();
        }.bind(this), 250);
    }

    moveY(value) 
    {
        if (!((parseInt(this.element.style.top) + parseInt(value)) > (parseInt(mainField.element.style.height) - parseInt(this.element.style.height)))) 
        {
            let counter = 0;
            let animate = setInterval(function () 
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
            let animate = setInterval(function () 
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
                        temp = parseInt(this.element.style.left) - 1;
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

        setTimeout(function () {
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

class Trigger 
{
    constructor(id, height, width, top, left, func) 
    {
        this.id = id;
        this.height = height;
        this.width = width;
        this.element = document.querySelector('#' + this.id);
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
        this.inTrigger = false;
        this.func = func;
        this.isPicked = false;

        // Проверяет, находится ли игрок в триггере.
        setInterval(function () 
        {
            if (((parseInt(playerOne.element.style.left) + parseInt(playerOne.element.style.width)) > parseInt(this.element.style.left)) && (parseInt(playerOne.element.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) 
            {
                if (((parseInt(playerOne.element.style.top) + parseInt(playerOne.element.style.height)) > parseInt(this.element.style.top)) && (parseInt(playerOne.element.style.top) < (parseInt(this.element.style.top) + parseInt(this.element.style.height)))) 
                {
                    this.inTrigger = true;
                    this.func();
                } 
                else 
                {
                    this.inTrigger = false;
                }
            } 
            else 
            {
                this.inTrigger = false;
            }
        }.bind(this), 50);
    }
}

class Collision 
{
    constructor(id, height, width, top, left) 
    {
        this.id = id;
        this.height = height;
        this.width = width;
        this.element = document.querySelector('#' + this.id);
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';

        // Каждые **ms проверяется, входит ли игрок в коллизию. Если входит - отталкивает обратно.
        setInterval(function () 
        {
            // LEFT COLLISION
            // ЕСЛИ - ЛЕВЫЕ КООРДИНАТЫ ИГРОКА + ШИРИНА ИГРОКА >БОЛЬШЕ> ЛЕВЫЕ КООРДИНАТЫ ОБЬЕКТА (дальше логика на ограничения действия коллизии)
            if (((parseInt(playerOne.element.style.left) + parseInt(playerOne.element.style.width)) > parseInt(this.element.style.left)) && (parseInt(playerOne.element.style.left) < (parseInt(this.element.style.left) + (parseInt(this.element.style.width) / 2)))) 
            {
                // ограничение действия коллизии по вертикали
                if (((parseInt(playerOne.element.style.top) + parseInt(playerOne.element.style.height) - 5) > parseInt(this.element.style.top)) && (parseInt(playerOne.element.style.top) <= (parseInt(this.element.style.top) + parseInt(this.element.style.height) - 5))) 
                {
                    let temp = (parseInt(this.element.style.left) - parseInt(playerOne.element.style.width));
                    playerOne.element.style.left = temp + 'px';
                }
            }

            // RIGHT COLLISION
            // ЕСЛИ - ЛЕВЫЕ КООРДИНАТЫ ИГРОКА <МЕНЬШЕ< ЛЕВЫЕ КООРДИНАТЫ ОБЬЕКТА + ШИРИНА ОБЬЕКТА (дальше логика на ограничения действия коллизии)
            if (((parseInt(playerOne.element.style.left)) < ((parseInt(this.element.style.left) + parseInt(this.element.style.width)))) && !(parseInt(playerOne.element.style.left) < (parseInt(this.element.style.left) + (parseInt(this.element.style.width) / 2)))) 
            {
                // ограничение действия коллизии по вертикали
                if (((parseInt(playerOne.element.style.top) + parseInt(playerOne.element.style.height) - 5) > parseInt(this.element.style.top)) && (parseInt(playerOne.element.style.top) <= (parseInt(this.element.style.top) + parseInt(this.element.style.height) - 5))) 
                {
                    let temp = (parseInt(this.element.style.left) + parseInt(this.element.style.width));
                    playerOne.element.style.left = temp + 'px';
                }
            }

            // TOP COLLISION
            // ЕСЛИ - КООРДИНАТЫ ВЫСОТЫ ИГРОКА + ВЫСОТА ИГРОКА >БОЛЬШЕ> КООРДИНАТЫ ВЫСОТЫ ОБЬЕКТА (дальше логика на ограничения действия коллизии)
            if (((parseInt(playerOne.element.style.top) + parseInt(playerOne.element.style.height)) > (parseInt(this.element.style.top))) && (parseInt(playerOne.element.style.top) < (parseInt(this.element.style.top) + (parseInt(this.element.style.height) / 2)))) 
            {
                // ограничение действия коллизии по горизонтали
                if (((parseInt(playerOne.element.style.left) + parseInt(playerOne.element.style.width)) > parseInt(this.element.style.left)) && (parseInt(playerOne.element.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) 
                {
                    let temp = (parseInt(this.element.style.top) - parseInt(playerOne.element.style.height));
                    playerOne.element.style.top = temp + 'px';
                }
            }

            // BOTTOM COLLISION
            // ЕСЛИ - КООРДИНАТЫ ВЫСОТЫ ИГРОКА  >МЕНЬШЕ> КООРДИНАТ ВЫСОТЫ ОБЬЕКТА + ВЫСОТА ОБЬЕКТА (дальше логика на ограничения действия коллизии)
            if (((parseInt(playerOne.element.style.top)) > (parseInt(this.element.style.top))) && (parseInt(playerOne.element.style.top) < (parseInt(this.element.style.top) + parseInt(this.element.style.height)))) 
            {
                // ограничение действия коллизии по горизонтали
                if (((parseInt(playerOne.element.style.left) + parseInt(playerOne.element.style.width)) > parseInt(this.element.style.left)) && (parseInt(playerOne.element.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) 
                {
                    let temp = (parseInt(this.element.style.top) + parseInt(this.element.style.height));
                    playerOne.element.style.top = temp + 'px';
                }
            }

        }.bind(this), 5);
    }
}

let mainField = new Field('field', 400, 640);
let playerOne = new Player('player', 50, 50, 0, 0);

// id, height, width, top coordinate, left coordinate
let triggerOne = new Trigger("triggerOne", 100, 100, 50, 450, function () {
    // код, когда в триггере
}.bind(this));

let triggerTwo = new Trigger("triggerTwo", 20, 160, 380, 240, function () {
    location.href = '2.html';
}.bind(this));


let triggerThree = new Trigger("triggerThree", 50, 50, 280, 200, function () {
    if (this.element.classList.contains('rupee') && this.isPicked == false)
    {
        playerOne.rupeeCounter += 1;
        this.isPicked = true;
        this.element.remove();
    }
});

// id, height, width, top coordinate, left coordinate
let collisionOne = new Collision("collisionOne", 125, 125, 200, 50);

let valuePosY = document.querySelector("#posY-value");
let buttonPosY = document.querySelector("#posY-button");
buttonPosY.addEventListener('click', function () {
    playerOne.moveY(valuePosY.value);
});

let valuePosX = document.querySelector("#posX-value");
let buttonPosX = document.querySelector("#posX-button");
buttonPosX.addEventListener('click', function () {
    playerOne.moveX(valuePosX.value);
});

// управление клвиатурой
document.addEventListener('keypress', function (event) {
    if (event.code == 'KeyW') {
        playerOne.moveY(-10);
    }
    if (event.code == 'KeyS') {
        playerOne.moveY(10);
    }
    if (event.code == 'KeyA') {
        playerOne.moveX(-10);
    }
    if (event.code == 'KeyD') {
        playerOne.moveX(10);
    }
});


// скрытие открытие информационной панели
document.querySelector("#hideButton").addEventListener('click', function () 
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
document.querySelector(".debug p:nth-child(1)").textContent = 'Высота поля: ' + mainField.element.style.height;
document.querySelector(".debug p:nth-child(2)").textContent = 'Ширина поля: ' + mainField.element.style.width;
setInterval(function () {
    document.querySelector(".debug p:nth-child(3)").textContent = 'Координаты игрока по Y: ' + parseInt(playerOne.element.style.top) + ' : ' + (parseInt(playerOne.element.style.top) + parseInt(playerOne.element.style.height));
    document.querySelector(".debug p:nth-child(4)").textContent = 'Координаты игрока по X: ' + parseInt(playerOne.element.style.left) + ' : ' + (parseInt(playerOne.element.style.left) + parseInt(playerOne.element.style.width));
    document.querySelector(".debug p:nth-child(5)").textContent = 'isMove: ' + playerOne.isMove;
    document.querySelector(".debug p:nth-child(6)").textContent = 'direction: ' + playerOne.direction;
    document.querySelector(".debug p:nth-child(7)").textContent = 'inTrigger: ' + triggerOne.inTrigger;
    document.querySelector(".debug p:nth-child(8)").textContent = 'rupeeCounter: ' + playerOne.rupeeCounter;
}.bind(this), 100);