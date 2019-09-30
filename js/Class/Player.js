class Player 
{
    constructor(id, height, width, top, left, field) 
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
        this.field = document.querySelector('#' + field);
        
        setInterval(function () {
            this.checkIdle();
        }.bind(this), 250);
    }

    moveY(value) 
    {
        if (!((parseInt(this.element.style.top) + parseInt(value)) > (parseInt(this.field.style.height) - parseInt(this.element.style.height)))) 
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
                    if (this.element.querySelector('.message')) { this.element.querySelector('.message').style.transform = 'translate(50%, 0) scaleX(1)'; }
                }
            }.bind(this), 1);
        }
    }

    moveX(value) 
    {
        if (!((parseInt(this.element.style.left) + parseInt(value)) > (parseInt(this.field.style.width) - parseInt(this.element.style.width)))) 
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
                        if (this.element.querySelector('.message')) { this.element.querySelector('.message').style.transform = 'translate(50%, 0) scaleX(-1)'; }
                        this.direction = 'side';
                        this.isMove = true;
                    } 
                    else 
                    {
                        temp = parseInt(this.element.style.left) - 1;
                        this.element.style.backgroundImage = 'url("./img/walkSide.gif")';
                        this.element.style.transform = 'unset';
                        if (this.element.querySelector('.message')) { this.element.querySelector('.message').style.transform = 'translate(50%, 0) scaleX(1)'; }
                        this.direction = 'side';
                        this.isMove = true;
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

    showwMessage(text)
    {
        if (!this.element.querySelector('.message'))
        {
            this.element.innerHTML += '<p class="message">'+text+'</p>';
        }
    }
    hideMessage()
    {
        if (this.element.querySelector('.message'))
        {
            document.querySelector('.message').remove();
        }
    }
}