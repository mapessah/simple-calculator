const displayElement = document.getElementById('display');
const buttonsContainer = document.querySelector('.buttons');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// Function to update the display with both previous and current operands
function updateDisplay() {
    let displayText = '';

    if (previousOperand !== '') {
        displayText += `<div class="previous-operand">${previousOperand} ${operation || ''}</div>`;
    } else {
        // Create an empty div to maintain consistent height even when previousOperand is empty
        displayText += `<div class="previous-operand"></div>`;
    }

    displayText += `<div class="current-operand">${currentOperand === '' ? '0' : currentOperand}</div>`;
    displayElement.innerHTML = displayText;
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(selectedOperation) {
    if (currentOperand === '') return; // Cannot choose operation if no current number

    if (previousOperand !== '') {
        // If there's a previous operand and operation, calculate first
        calculate();
    }

    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = ''; // Clear current operand for new input
    updateDisplay(); // Update to show previous operand and the chosen operator
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clear(); // Clear calculator on division by zero error
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// Event Listener for button clicks (Event Delegation)
buttonsContainer.addEventListener('click', e => {
    const target = e.target;
    if (!target.classList.contains('button')) return; // Only process clicks on buttons

    const action = target.dataset.action;
    const buttonText = target.textContent;

    switch (action) {
        case 'number':
            appendNumber(buttonText);
            break;
        case 'decimal':
            appendNumber('.');
            break;
        case 'clear':
            clear();
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            chooseOperation(buttonText); // Use buttonText (+, -, *, /) as the operator
            break;
        case 'calculate':
            calculate();
            break;
        default:
            break;
    }
});

// Initialize display
clear(); // Call clear initially to set up the display
