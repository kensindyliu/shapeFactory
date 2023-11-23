'user strict'

let shapeArray = [];
class Shape {
    constructor(){
        this._color = '';
        this._shape = '';
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

    createShape(){
        let shapeObj = {
            shape: this._shape,
            color: this._color
        };

        shapeArray.push(shapeObj);
        return shapeArray.length;
    }

    getInfo(num){
        return shapeArray[num - 1];
    }
}

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
let index = 0;

initBoard();
onEvent('click', btnCreate, function(){
    if(index >= 24){
        msg.innerHTML = 'Can not add more shape!';
    }
    if (selColor.value != '' && selShape.value !='' && index < 24){
        const shape = new Shape();
        msg.innerHTML = '';
        shape.color = selColor.value;
        shape.shape = selShape.value;
        index = shape.createShape();
        console.log(index);
        addShape(index , shape);
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

function addShape(id, shapeObj){
    const newShape = create('div');
    const parent = selectById('block' + id);
    const obj = shapeObj.getInfo(id);
    const msg = select('.msg');
    console.log(parent.id);
    newShape.classList.add('block');
    if(obj.shape == 'Circle') {
        newShape.classList.add('circle');
    }
    newShape.style.background = obj.color;
    newShape.id = id;
    parent.append(newShape);
    onEvent('click', newShape, function(){
        const myobj = shapeObj.getInfo(id);
        let color1 = '';
        switch (myobj.color) {
            case "#09f":
                color1 = 'Blue';
                break;
            case "#f90":
                color1 = 'Orange';
                break;
            case "#f09":
                color1 = 'Pink';
                break;
            case "#90f":
                color1 = 'Purple';
                break;
            case "#9f0":
                color1 = 'Green';
                break;
            default:
                color1 =  '';
        }
        msg.innerHTML = `Unit${id}: ${myobj.shape}  ${color1}`;
    });
}




