const add = function(a =0,b=0) {
	return a+b;
};

const subtract = function(a=0,b=0) {
	return a-b;
};

const multiply = function(a,b){
    return a*b;
};

const divide = function(a,b){
    if(b ===0){
    alert("Cant divide by zero");
    return ;
    }
    return a/b;
}

const container = document.getElementById("calc");
const screen = document.getElementById('screen');
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");

function createButtonGrid() {
    const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', '=', '+'];
  
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-group'); // Container for all buttons
  
    for (let i = 0; i < buttons.length; i++) {
      const button = document.createElement('button');
      button.classList.add('opButtons');
      button.textContent = buttons[i];
      button.addEventListener('click',() => handleButtonClick(buttons[i]));
      buttonContainer.appendChild(button);

      if (buttons[i] === '.') {
        button.id = 'decimalButton';
      }
    }
  
    container.appendChild(buttonContainer);
  }
  
createButtonGrid();

let firstNum = '';
let secondNum = '';
let currOperator = '';
let resetScreen = false;

screen.textContent = '0';

function handleButtonClick(value){
    if (!isNaN(value) || value === '.') {
        appendNumber(value);
        if (value === '.') 
            document.getElementById('decimalButton').disabled = true;
    }else if (value === '=') {
        calculate();
    } else if (value === '-' && screen.textContent === '0') {
        screen.textContent = '-';
    } else {
        console.log("handling operator");
        handleOperator(value);
        const arr = screen.textContent.split(` ${currOperator} `);
        if (!arr[1] || !arr[1].includes('.')) {
            document.getElementById('decimalButton').disabled = false;
    
        }
    }
}

function appendNumber(num){
    if (screen.textContent === '0' && num === '.') {
        console.log("first condition satisfied (screen has 0 and entered val is .")
        screen.textContent = '0.';
        return;
    }
    if((screen.textContent === '0' && screen.textContent !== '0.' )|| resetScreen){
        console.log("second cond satisfied, screen has 0 ")
        screen.textContent = '';
        resetScreen = false;
    }
    console.log('value being appended to screen');
    screen.textContent += num;
}

function resetScreenfunc(){
    screen.textContent = '';
    resetScreen = false;
}

function updateScreen(){
    screen.textContent = screen.textContent || '0';
}

function handleOperator(op){
    if(currOperator !== '' && !resetScreen ){
        console.log("first condition satisfied");
        secondNum = screen.textContent.split(` ${currOperator} `)[1];;
        screen.textContent = operate(currOperator,firstNum,secondNum);
        firstNum = screen.textContent;
        screen.textContent += ` ${op} `;
        
    }
    else{
        console.log("not satisfied (correct block being executed)");
        firstNum = screen.textContent;
        screen.textContent += ` ${op} `;
        
    }
    currOperator = op;
    resetScreen = false;
    
    
}

function calculate(){
    if(currOperator === '' || resetScreen) return;
    secondNum = screen.textContent.split(`${currOperator}`)[1];
    screen.textContent = operate(currOperator, firstNum, secondNum);
    firstNum = screen.textContent;
    currOperator = '';
    resetScreen = true;
}


function clearScreen() {
    screen.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    shouldResetScreen = false;
}

function deleteLast() {
    if (screen.textContent !== '0') {
        screen.textContent = screen.textContent.toString().slice(0, -1);
        if (screen.textContent === '') screen.textContent = '0';
    }
}

clearButton.addEventListener('click', clearScreen);
deleteButton.addEventListener('click', deleteLast);

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            return null;
    }
    if(result - Math.floor(result) == 0)
        return result;
    return result.toFixed(2);
}



