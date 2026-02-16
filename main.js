let numbers = {
    num1: '',
    num2: ''
}
const calculator = {
    '/': divide,
    'x': multiply,
    '+': add,
    '-': subtract,
    '%': remainder
}

let selectedOperation;
let currentTarget = 'num1';
let hasPerformedCalculations = false;
let hasDecimal = false;

let reader = document.getElementById('reader');
document.getElementById('calculator-buttons-container').addEventListener('click',processInput);


// math functions
function add(a, b){return a + b;}
function subtract(a,b){return a - b;}
function divide(a,b){return a / b;}
function multiply(a,b){return a * b;}
function remainder(a,b){return a % b;}
s

function processInput(e){
    const button = e.target;

    if(e.target.classList.contains('number')){
        handleNumbers(button);
    } else if(e.target.classList.contains('operator')){
        handleOperators(button);
    } else if(e.target.matches('#equals-btn')){
        handleEquals(button);
    } else if(e.target.matches('#clear-btn')){
        clear();
    } else if(e.target.matches('#decimal-btn')){
        handleDecimal(button);
    }

    console.log('num1: ' + numbers.num1 + ' num1: ' + numbers.num2 + ' current target: ' + currentTarget);
    console.log(hasDecimal);
}

function performCalculations(){
    if(numbers.num1.length > 0 && numbers.num2.length > 0){
        reader.textContent = selectedOperation(parseFloat(numbers.num1), parseFloat(numbers.num2)).toFixed(1);
        numbers.num1 = reader.textContent;
        // clear values
        numbers.num2 = '';
        currentTarget= 'num2'
        selectedOperation = null;
        hasPerformedCalculations = true;
        hasDecimal = false;
    }
}

function clear(){
    numbers.num1 = '';
    numbers.num2 = '';
    selectedOperation = '';
    reader.textContent = "";
    currentTarget = 'num1'
    console.log('clear values')
    hasDecimal = false;
}

function handleNumbers(button){
    if(hasPerformedCalculations){
        clear();
        console.log("clear");
    } 
    hasPerformedCalculations = false;
    numbers[currentTarget] += button.textContent;
    reader.textContent += button.textContent;          
}



function handleOperators(button){     
    // if it has input for both numbers and an operator already it will perform calculation
    if (selectedOperation && numbers.num1.length > 0 && numbers.num2.length > 0) {
        performCalculations();
        // call itself again for edge case where user presses operator after ee
        // having finished a calculation
        handleOperators(button);
    } else if(numbers.num1.length > 0){
        if(selectedOperation){
            // update operation if one is already chosen and update display
            selectedOperation = calculator[button.textContent];
            reader.textContent = reader.textContent.slice(0,-1) + button.textContent;
        } else {
            selectedOperation = calculator[button.textContent];
            reader.textContent += button.textContent;
            currentTarget = 'num2';
            hasPerformedCalculations = false;
        }
    }
}

function handleEquals(button){
        performCalculations();
}

function handleDecimal(button){
    // if theres a dot already don't let the user put another one
    if(!reader.textContent.endsWith(button.textContent) && !hasDecimal){
        reader.textContent += button.textContent;
        numbers[currentTarget] += button.textContent;
        hasDecimal = true;
    }
}