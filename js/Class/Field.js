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
