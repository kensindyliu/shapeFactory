'user strict'

function onEvent(event, selector, callback){
    return selector.addEventListener(event, callback);
}

function select(selector){
    return document.querySelector(selector);
}

function selectById(selector){
    return document.getElementById(selector);
}

function create(element){
    return document.createElement(element);
}



const btnCreate = selectById('btnCreate');
const selColor = selectById('color');
const selShape = selectById('shape');
const msg = select('.msg');

initBoard();
let shapeArray = [];
onEvent('click', btnCreate, function(){
    if(shapeArray.length >= 24){
        msg.innerHTML = 'Can not add more shape!';
    }
    if (selColor.value != '' && selShape.value !='' && shapeArray.length < 24){
        const shape = new Shape(selColor.value, selShape.value);
        msg.innerHTML = '';
        shapeArray.push(shape);
        createShape(shape);
    }
})

function initBoard() {
    const eleRow = new Array();
    const eleColum = Array.from(new Array(4),() => new Array(6));
    const factory = select('.factory');
    for(let i = 0; i < 4; i++){
        eleRow[i] = create('div');
        eleRow[i].classList.add('row');
        factory.append(eleRow[i]);
        for(let j = 0; j < 6; j++){
            eleColum[i][j] = create('div');
            eleColum[i][j].classList.add('column');
            eleColum[i][j].id = `block${(3 - i) * 6 + j + 1}`;
            eleRow[i].append(eleColum[i][j]);      
        }
    }
}


class Shape{
    constructor(color, shape){
        this._color = color;
        this._shape = shape;
    }

    set color(color){
        this._color = color;
    }

    get color(){
        return this._color;
    }

    set shape(shape){
        this._shape = shape;
    }

    get shape(){
        return this._shape;
    }

    getInfo(){
        const info = {
            shape: this._shape,
            color: this._color,
            colorOfName: this.getColorName(this._color)
        };
        return info;
    }
    
    getColorName(color) {
        switch (color) {
            case "#09f":
                color = 'Blue';
                break;
            case "#f90":
                color = 'Orange';
                break;
            case "#f09":
                color = 'Pink';
                break;
            case "#90f":
                color = 'Purple';
                break;
            case "#9f0":
                color = 'Green';
                break;
        }
        return color;
    }
}




function createShape(shape1){
    const newShape = create('div');
    let id = shapeArray.length;
    const parent = selectById('block' + id);
    const info = shape1.getInfo(id);
    newShape.classList.add('block');
    if(info.shape == 'Circle') {
        newShape.classList.add('circle');
    }
    newShape.style.background = info.color;
    newShape.id = id;
    parent.append(newShape);
    onEvent('click', newShape, function(){
        const myobj = shapeArray[id];
        msg.innerHTML = `Unit${id}: ${info.shape}  ${info.colorOfName}`;
    });
}