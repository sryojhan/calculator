


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



const output = document.querySelector('#output');


function write(mssg){

    output.textContent = mssg;
}


let input = {

    first: 0,
    operation: NOTSELECTED,
    second: 0
}




const getNumberButton = (number) => document.querySelector(`#n${number}`)

const numberButtons = Array.from({ length: 9 }, (value, i) => getNumberButton(i + 1));


numberButtons.forEach((elem, idx) => {

    elem.addEventListener('click', ()=>{
        readNumber(idx + 1);
    });
    
})


function readNumber(number){


    if(input.operation === NOTSELECTED){

        input.first = input.first * 10 + number;
        write(input.first);
    }
    else{
        
        input.second = input.second * 10 + number;
        write(input.second);

    }
}



const getOperationButton = (number) => document.querySelector(`#op${number}`)

const operationButtons = Array.from({ length: 5 }, (value, i) => getOperationButton(i));


operationButtons.forEach((elem, idx) => {

    elem.addEventListener('click', ()=>{
        selectOperation(idx);
    });
    
})

function selectOperation(op){


    if(op === EQUALS)
        processOperation();
    else{

        input.operation = op;
        write("");
    }


}


function processOperation(){

    let result = 0;

    switch(input.operation){

        case ADD:{

            result = input.first + input.second;
            break;
        }
        case SUBTRACT:{

            result = input.first - input.second;
            break;
        }
        case MULTIPLY:{

            result = input.first * input.second;
            break;
        }
        case DIVIDE:{

            if(input.second === 0)
                result = ":/";

            else{

                result = input.first / input.second;
            }

            break;
        }

    }

    write(result);

    input.first = result;
    input.operation = NOTSELECTED;
    input.second = 0;

}