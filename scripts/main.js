let currentInput = ""
let result= document.getElementById("display-area");
let current_operand, current_number1,current_number2;

const inputNum =(digit) =>{
currentInput += digit ;
result.innerText = currentInput;
}

const backspace = () => {
    currentInput = currentInput.slice(0, -1);
    result.innerText = currentInput || 0;
    console.log(currentInput)
}

const clearAll = () => {
    currentInput = "";
    result.innerText = 0;
}

const Add = (num1,num2) => {
    result.innerText = num1+num2
}

const Subtract = (num1,num2) => {
    result.innerText = num1 - num2
}

const Multiply = (num1,num2) => {
    result.innerText = num1 * num2
}

const Divide = (num1,num2) => {
    result.innerText = num1 / num2
}

const inputDecimal = () => {
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
    if (current_number1 !== undefined) {
        current_number2 = parseFloat(currentInput);
        currentInput = "";
        Operate(current_operand, current_number1, current_number2);
        current_number1 = parseFloat(result.innerText);
    }else {
        current_number1 = parseFloat(currentInput);
        currentInput = "";
    }
    current_operand = operator;
     updateDecimalButton();
}

const Operate = (operation, num1, num2) => {
    switch(operation) {
        case '+':
            Add(num1, num2)
            break
        case '-':
            Subtract(num1, num2)
            break
        case '*':
            Multiply(num1, num2)
            break
        case '/':
            Divide(num1, num2)
            break
    }
}

const calculate=() => {
    if (!currentInput || current_number1 === undefined || !current_operand) return;
    if (current_operand && current_number1 !== undefined) {
        current_number2 = parseFloat(currentInput);
        currentInput = "";
        console.log(current_operand, current_number1, current_number2)
        Operate(current_operand, current_number1, current_number2);
        current_number1 = undefined;
        current_operand = undefined;
    }
}
