let currentInput = ""
let result= document.getElementById("display-area");
let current_operand, current_number1,current_number2;
let isError = false;
let awaitingSecond = false; 
let justEvaluated  = false;

const expressionEl = document.getElementById("expression");

const updateExpression = (text) => {
    expressionEl.textContent = text;
};


document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (/\d/.test(key)) {

        inputNum(key); 
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault(); 
        calculate();
    } else if (key === 'Backspace') {
        e.preventDefault();
        backspace();
    } else if (key === 'Escape') {
        clearAll();
    }
});


const inputNum = (digit) => {

    if (isError) return;

    if (justEvaluated) {
        currentInput = "";
        justEvaluated = false;
    }

    awaitingSecond = false;

    if (currentInput === "0" && digit === "0") return;

    if (currentInput === "0" && digit !== ".") {
        currentInput = digit;
    } else {
        currentInput += digit;
    }

    result.innerText = currentInput;
}

const backspace = () => {

    if (isError) return;

    currentInput = currentInput.slice(0, -1);
    result.innerText = currentInput || 0;
    console.log(currentInput)
    updateDecimalButton();
}

const clearAll = () => {
    currentInput = "";
    result.innerText = 0;
    current_number1 = undefined;
    current_number2 = undefined;
    current_operand = undefined;
    isError = false;
    awaitingSecond = false;
    justEvaluated  = false;
    updateDecimalButton();

    updateExpression("");
}

const add      = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide   = (a, b) => a / b;

const formatResult = (value) => parseFloat(value.toPrecision(10));

const inputDecimal = () => {

    if (isError) return;

    if (currentInput.includes(".")) return;
    currentInput += currentInput === "" ? "0." : ".";
    result.innerText = currentInput;
    updateDecimalButton();
}

const updateDecimalButton = () => {
    const decimalBtn = document.getElementById("decimal-btn");
    decimalBtn.disabled = currentInput.includes(".");
}
const setOperator = (operator) => {

    if (isError) return;

    if (currentInput === "" && current_number1 !== undefined) {
        current_operand = operator;
        updateExpression(`${current_number1} ${operator}`);
        return;
    }

    if (current_number1 !== undefined) {
        current_number2 = parseFloat(currentInput);
        currentInput = "";
        operate(current_operand, current_number1, current_number2);
        current_number1 = parseFloat(result.innerText);
    }else {
        current_number1 = parseFloat(currentInput);
        currentInput = "";
    }
    current_operand = operator;
    awaitingSecond = true;  
    justEvaluated  = false; 
    updateDecimalButton();

    updateExpression(`${current_number1} ${operator}`);
}

const operate = (operation, num1, num2) => {

    if (operation === '/' && num2 === 0) {
        result.innerText = "plz dont";
        isError = true;
        return;
    }

    let value;
    switch (operation) {
        case '+': 
            value = add(num1, num2);      
        break;
        case '-': 
            value = subtract(num1, num2); 
        break;
        case '*': 
            value = multiply(num1, num2); 
        break;
        case '/': 
            value = divide(num1, num2);   
        break;
    }

    result.innerText = formatResult(value);
}

const calculate=() => {
    if (!currentInput || current_number1 === undefined || !current_operand) return;
    if (current_operand && current_number1 !== undefined) {
        current_number2 = parseFloat(currentInput);

        updateExpression(`${current_number1} ${current_operand} ${current_number2} =`);

        operate(current_operand, current_number1, current_number2);
        currentInput = String(parseFloat(result.innerText));
        
        current_number1 = undefined;
        current_operand = undefined;
        awaitingSecond = false; 
        justEvaluated  = true;
        updateDecimalButton();
    }
}
