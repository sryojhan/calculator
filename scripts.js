


/*

    Orden de ejecucion:


    Primero seleccionar un numero

    Segundo seleccionar una operacion

    Tercero seleccionar otro numero



    Casos especiales:
    -Si se selecciona una operacion sin haber seleccionado numeros no hace nada
    -Si se seleccionan varias operaciones seguidas no hace nada, se selecciona la ultima
    -Se pueden concatenar operaciones seguidas, realizando cada vez la operacion anterior y continuando como si nada

*/


const NOTSELECTED = -1;
const ADD = 0;
const SUBTRACT = 1;
const MULTIPLY = 2;
const DIVIDE = 3;
const EQUALS = 4;
const CLEAR = 5;
const OPPOSITE = 6;
const DECIMAL = 7;



const output = document.querySelector('#output');

const getHistoryElement = (number) => document.querySelector(`#history-${number}`)
const history = Array.from({ length: 4 }, (value, i) => getHistoryElement(i));



function write(mssg, updateHistory = true) {

    if(updateHistory && output.textContent !== ""){

        history[3].textContent = history[2].textContent;
        history[2].textContent = history[1].textContent;
        history[1].textContent = history[0].textContent;
        history[0].textContent = output.textContent;
    }

    output.textContent = mssg;

}

function clearHistory(){

    history[0].textContent = "";
    history[1].textContent = "";
    history[2].textContent = "";
    history[3].textContent = "";

    output.textContent = "";
}


let input = null;

ClearInput();

function ClearInput() {

    input = {

        first: 0,
        operation: NOTSELECTED,
        second: 0,

        usingDecimal: false,

        firstDecimal: {

            length: 0,
            value: 0
        },
        secondDecimal: {

            length: 0,
            value: 0
        },

        phantomText: false, //When showing the result with equals, dont be able to add new numbers to the result


        calculateFirst: () => { return input.first + input.firstDecimal.value / Math.pow(10, input.firstDecimal.length) },
        calculateSecond: () => { return input.second + input.secondDecimal.value / Math.pow(10, input.secondDecimal.length) }
    }

}




const getNumberButton = (number) => document.querySelector(`#n${number}`)

const numberButtons = Array.from({ length: 10 }, (value, i) => getNumberButton(i));


numberButtons.forEach((elem, idx) => {

    elem.addEventListener('click', () => {
        readNumber(idx);
    });

})


function readNumber(number) {

    if (input.phantomText) {
        ClearInput();
    }

    if (input.operation === NOTSELECTED) {


        if (!input.usingDecimal) {
            input.first = input.first * 10 + number;
        } else {

            input.firstDecimal.length++;
            input.firstDecimal.value = input.firstDecimal.value * 10 + number;
        }

        write(input.calculateFirst(), false);

    }
    else {


        if (!input.usingDecimal) {
            input.second = input.second * 10 + number;
        } else {

            input.secondDecimal.length++;
            input.secondDecimal.value = input.secondDecimal.value * 10 + number;
        }


        write(input.calculateSecond(), false);

    }

}



const getOperationButton = (number) => document.querySelector(`#op${number}`)

const operationButtons = Array.from({ length: 8 }, (value, i) => getOperationButton(i));


operationButtons.forEach((elem, idx) => {

    elem.addEventListener('click', () => {
        selectOperation(idx);
    });

})

function selectOperation(op) {


    if (op === EQUALS)
        processOperation();

    else if (op === CLEAR) {

        ClearInput();
        clearHistory();
        write("");
    }

    else if (op === OPPOSITE) {

        if (input.operation === NOTSELECTED) {

            input.first *= -1;
            write(input.first);
        }
        else {

            input.second *= -1;
            write(input.second);
        }
    }

    else if (op === DECIMAL) {

        if (!input.usingDecimal) {

            input.usingDecimal = true;

            if (input.operation === NOTSELECTED) {

                if (input.first === 0)
                    write("0.");
                else write(input.calculateFirst() + ".");
            }
            else {

                if (input.second === 0)
                    write("0.");
                else write(input.calculateSecond() + ".");
            }
        }

    }

    else {

        input.operation = op;
        input.phantomText = false;
        input.usingDecimal = false;

        write("");
    }

}


function processOperation() {

    if (input.operation === NOTSELECTED) {
        return;
    }

    let result = 0;

    let error = false;

    switch (input.operation) {

        case ADD: {

            result = input.calculateFirst() + input.calculateSecond();
            break;
        }
        case SUBTRACT: {

            result = input.calculateFirst() - input.calculateSecond();
            break;
        }
        case MULTIPLY: {

            result = input.calculateFirst() * input.calculateSecond();
            break;
        }
        case DIVIDE: {

            if (input.calculateSecond() === 0) {
                result = "not today...";
                error = true;
            }

            else {

                result = input.calculateFirst() / input.calculateSecond();
            }

            break;
        }

    }



    write(result);

    if (!error) {

        ClearInput();

        input.first = result;
        input.phantomText = true;
    }
    else ClearInput();
}



addEventListener('keydown', (event) => {



    if (!isNaN(event.key)) {

        let number = parseInt(event.key);
        readNumber(number);
    }


    switch (event.key) {

        case '+': {

            selectOperation(ADD);
            break;
        }

        case 'Enter': {

            selectOperation(EQUALS)
            break;
        }


        case '-': {

            selectOperation(SUBTRACT)
            break;
        }


        case '*': {

            selectOperation(MULTIPLY)
            break;
        }



        case '/': {

            selectOperation(DIVIDE)
            break;
        }


        case 'Escape': {

            selectOperation(CLEAR)
            break;
        }


        case '.': {

            selectOperation(DECIMAL)
            break;
        }


        case ',': {

            selectOperation(DECIMAL)
            break;
        }



        default: {

            if(event.code === "ShiftLeft")
                selectOperation(OPPOSITE);

            break;
        }
    }


});



