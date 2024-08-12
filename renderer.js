document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                window.location.href = 'calculator.html';
            } else {
                alert('Please enter valid credentials');
            }
        });
    }

    // Calculator functionality
    const result = document.getElementById('result');
    if (result) {
        const buttons = document.querySelectorAll('.buttons button');
        let currentInput = '';
        let previousInput = '';
        let operator = '';
        let lastResult = '';

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const value = this.textContent.trim();

                if (!isNaN(value) || value === '.') {
                    currentInput += value;
                    result.value = currentInput;
                } else if (value === 'AC') {
                    clearAll();
                } else if (value === 'Ans') {
                    currentInput = lastResult;
                    result.value = currentInput;
                } else if (value === '=') {
                    if (operator && currentInput) {
                        calculate();
                    }
                } else if (['+', '-', '×', '÷', 'xʸ'].includes(value)) {
                    if (currentInput === '' && value === '-') {
                        currentInput = '-';
                        result.value = currentInput;
                    } else {
                        setOperator(value);
                    }
                } else if (['√', 'sin', 'cos', 'tan', 'log', 'ln', 'π', 'e'].includes(value)) {
                    calculateSingleOperation(value);
                } else if (value === '%') {
                    if (currentInput) {
                        currentInput = (parseFloat(currentInput) / 100).toString();
                        result.value = currentInput;
                    }
                } else if (value === 'EXP') {
                    currentInput += 'e';
                    result.value = currentInput;
                }
            });
        });

        function clearAll() {
            currentInput = '';
            previousInput = '';
            operator = '';
            result.value = '0';
        }

        function setOperator(op) {
            if (currentInput) {
                operator = op;
                previousInput = currentInput;
                currentInput = '';
            }
        }

        function calculate() {
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            let computation;

            switch (operator) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '×':
                    computation = prev * current;
                    break;
                case '÷':
                    if (current !== 0) {
                        computation = prev / current;
                    } else {
                        computation = 'Error';
                    }
                    break;
                case 'xʸ':
                    computation = Math.pow(prev, current);
                    break;
                default:
                    return;
            }

            lastResult = computation;
            result.value = computation;
            previousInput = '';
            currentInput = computation.toString();
            operator = '';
        }

        function calculateSingleOperation(op) {
            let computation;
            const current = parseFloat(currentInput);

            switch (op) {
                case '√':
                    computation = Math.sqrt(current);
                    break;
                case 'sin':
                    computation = Math.sin(toRadians(current));
                    break;
                case 'cos':
                    computation = Math.cos(toRadians(current));
                    break;
                case 'tan':
                    computation = Math.tan(toRadians(current));
                    break;
                case 'log':
                    computation = current > 0 ? Math.log10(current) : 'Error';
                    break;
                case 'ln':
                    computation = current > 0 ? Math.log(current) : 'Error';
                    break;
                case 'π':
                    computation = Math.PI;
                    break;
                case 'e':
                    computation = Math.E;
                    break;
                default:
                    return;
            }

            lastResult = computation;
            currentInput = computation.toString();
            result.value = currentInput;
        }

        function toRadians(degrees) {
            return degrees * (Math.PI / 180);
        }
    }
});
