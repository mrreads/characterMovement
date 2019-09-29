class Collision 
{
    constructor(id, player, height, width, top, left) 
    {
        this.id = id;
        this.player = document.querySelector('#' + player);
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
            if (((parseInt(this.player.style.left) + parseInt(this.player.style.width)) > parseInt(this.element.style.left)) && (parseInt(this.player.style.left) < (parseInt(this.element.style.left) + (parseInt(this.element.style.width) / 2)))) 
            {
                // ограничение действия коллизии по вертикали
                if (((parseInt(this.player.style.top) + parseInt(this.player.style.height) - 5) > parseInt(this.element.style.top)) && (parseInt(this.player.style.top) <= (parseInt(this.element.style.top) + parseInt(this.element.style.height) - 5))) 
                {
                    let temp = (parseInt(this.element.style.left) - parseInt(this.player.style.width));
                    this.player.style.left = temp + 'px';
                }
            }

            // RIGHT COLLISION
            // ЕСЛИ - ЛЕВЫЕ КООРДИНАТЫ ИГРОКА <МЕНЬШЕ< ЛЕВЫЕ КООРДИНАТЫ ОБЬЕКТА + ШИРИНА ОБЬЕКТА (дальше логика на ограничения действия коллизии)
            if (((parseInt(this.player.style.left)) < ((parseInt(this.element.style.left) + parseInt(this.element.style.width)))) && !(parseInt(this.player.style.left) < (parseInt(this.element.style.left) + (parseInt(this.element.style.width) / 2)))) 
            {
                // ограничение действия коллизии по вертикали
                if (((parseInt(this.player.style.top) + parseInt(this.player.style.height) - 5) > parseInt(this.element.style.top)) && (parseInt(this.player.style.top) <= (parseInt(this.element.style.top) + parseInt(this.element.style.height) - 5))) 
                {
                    let temp = (parseInt(this.element.style.left) + parseInt(this.element.style.width));
                    this.player.style.left = temp + 'px';
                }
            }

            // TOP COLLISION
            // ЕСЛИ - КООРДИНАТЫ ВЫСОТЫ ИГРОКА + ВЫСОТА ИГРОКА >БОЛЬШЕ> КООРДИНАТЫ ВЫСОТЫ ОБЬЕКТА (дальше логика на ограничения действия коллизии)
            if (((parseInt(this.player.style.top) + parseInt(this.player.style.height)) > (parseInt(this.element.style.top))) && (parseInt(this.player.style.top) < (parseInt(this.element.style.top) + (parseInt(this.element.style.height) / 2)))) 
            {
                // ограничение действия коллизии по горизонтали
                if (((parseInt(this.player.style.left) + parseInt(this.player.style.width)) > parseInt(this.element.style.left)) && (parseInt(this.player.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) 
                {
                    let temp = (parseInt(this.element.style.top) - parseInt(this.player.style.height));
                    this.player.style.top = temp + 'px';
                }
            }

            // BOTTOM COLLISION
            // ЕСЛИ - КООРДИНАТЫ ВЫСОТЫ ИГРОКА  >МЕНЬШЕ> КООРДИНАТ ВЫСОТЫ ОБЬЕКТА + ВЫСОТА ОБЬЕКТА (дальше логика на ограничения действия коллизии)
            if (((parseInt(this.player.style.top)) > (parseInt(this.element.style.top))) && (parseInt(this.player.style.top) < (parseInt(this.element.style.top) + parseInt(this.element.style.height)))) 
            {
                // ограничение действия коллизии по горизонтали
                if (((parseInt(this.player.style.left) + parseInt(this.player.style.width)) > parseInt(this.element.style.left)) && (parseInt(this.player.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) 
                {
                    let temp = (parseInt(this.element.style.top) + parseInt(this.element.style.height));
                    this.player.style.top = temp + 'px';
                }
            }

        }.bind(this), 5);
    }
}