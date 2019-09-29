let mainField = new Field('field', 568, 680);
let playerOne = new Player('player', 50, 50, 230, 300, 'field');

// id, height, width, top coordinate, left coordinate
let triggerOne = new Trigger("triggerOne", 'player', 100, 100, 540, 295, function () {
    location.href = '1.html';
}.bind(this));

let triggerTwo = new Trigger("triggerTwo", 'player', 50, 50, 80, 300, function () {
    if (this.element.classList.contains('rupee') && this.isPicked == false)
    {
        playerOne.rupeeCounter += 1;
        this.isPicked = true;
        this.element.remove();
    }
});

// id, height, width, top coordinate, left coordinate
let collisionOne = new Collision("collisionOne", 'player', 95, 85, 210, 75);
let collisionTwo = new Collision("collisionTwo", 'player', 95, 85, 100, 75);
let collisionThree = new Collision("collisionThree", 'player', 95, 85, 210, 530);
let collisionFour = new Collision("collisionFour", 'player', 95, 85, 100, 530);
let collisionFive = new Collision("collisionFive", 'player', 285, 80, 155, 435);
let collisionSix = new Collision("collisionSix", 'player', 285, 80, 155, 175);
let collisionEight = new Collision("collisionEight", 'player', 100, 85, 35, 170);
let collisionNine = new Collision("collisionNine", 'player', 100, 85, 35, 430);
let collisionTen = new Collision("collisionTen", 'player', 55, 135, 525, 390);
let collisionEleven = new Collision("collisionEleven", 'player', 55, 135, 525, 160);

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