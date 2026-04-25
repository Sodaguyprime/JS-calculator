let currentInput = ""
let result= document.getElementById("display-area");
let current_operand, current_number1,current_number2;


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


const inputNum =(digit) =>{
currentInput += digit ;
result.innerText = currentInput;
}

const backspace = () => {
    currentInput = currentInput.slice(0, -1);
    result.innerText = currentInput || 0;
    console.log(currentInput)
    updateDecimalButton();
}

const clearAll = () => {
    currentInput = "";
    result.innerText = 0;
    updateDecimalButton();
}

const Add = (num1,num2) => {
    result.innerText = (num1+num2).toFixed(7)
}

const Subtract = (num1,num2) => {
    result.innerText = (num1 - num2).toFixed(7)
}

const Multiply = (num1,num2) => {
    result.innerText = (num1 * num2).toFixed(7)
}

const Divide = (num1,num2) => {
    result.innerText = (num1 / num2).toFixed(7)
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
        Operate(current_operand, current_number1, current_number2);
        currentInput = String(parseFloat(result.innerText));
        
        current_number1 = undefined;
        current_operand = undefined;
        updateDecimalButton();
    }
}
