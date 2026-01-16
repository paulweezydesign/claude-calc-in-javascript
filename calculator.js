// State management
let currentNumber = '0';
let previousNumber = '';
let operation = null;
let shouldResetScreen = false;

// DOM elements
const currentDisplayElement = document.getElementById('current');
const previousDisplayElement = document.getElementById('previous');

// Update display
const updateDisplay = () => {
    currentDisplayElement.textContent = currentNumber;
    previousDisplayElement.textContent = previousNumber;
};

// Append number
const appendNumber = (number) => {
    if (currentNumber === '0' || shouldResetScreen) {
        currentNumber = number;
        shouldResetScreen = false;
    } else if (currentNumber.length < 12) {
        currentNumber += number;
    }
    updateDisplay();
};

// Append operator
const appendOperator = (operator) => {
    if (operation !== null) calculate();
    previousNumber = currentNumber + ' ' + operator;
    operation = operator;
    shouldResetScreen = true;
    updateDisplay();
};

// Calculate result
const calculate = () => {
    if (operation === null || shouldResetScreen) return;
    
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    let result;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        case '%':
            result = (prev * current) / 100;
            break;
        default:
            return;
    }

    currentNumber = result.toString().slice(0, 12);
    operation = null;
    previousNumber = '';
    updateDisplay();
};

// Clear all
const clearAll = () => {
    currentNumber = '0';
    previousNumber = '';
    operation = null;
    updateDisplay();
};

// Delete number
const deleteNumber = () => {
    currentNumber = currentNumber.slice(0, -1);
    if (currentNumber === '') currentNumber = '0';
    updateDisplay();
};

// Keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        appendNumber(event.key);
    }
    if (event.key === '+' || event.key === '-') {
        appendOperator(event.key);
    }
    if (event.key === '*') appendOperator('×');
    if (event.key === '/') {
        event.preventDefault();
        appendOperator('÷');
    }
    if (event.key === 'Enter' || event.key === '=') calculate();
    if (event.key === 'Escape') clearAll();
    if (event.key === 'Backspace') deleteNumber();
});

// Initialize display
updateDisplay();