let result = 0;

function add(a, b) {
  return Number(a) + Number(b);
};

function subtract(a, b) {
  return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  return a / b;
};

function operate(a, operator, b) {
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
  }
  return result;
}

const digits = document.querySelectorAll("button.digits");
const display = document.querySelector("div#display");
const operators = document.querySelectorAll("button.operators");
const clear = document.querySelector("button#clear");
const equal = document.querySelector("button#equal");
let storedValue = ""

digits.forEach(element => element.addEventListener('click', displayonedigit));

function displayonedigit(e) {
  display.textContent = e.target.textContent;
  digits.forEach(element => element.addEventListener('click', joindigits));
  digits.forEach(element => element.removeEventListener('click', displayonedigit));
};

function joindigits(e) {
  display.textContent += e.target.textContent;
};

operators.forEach(operator => operator.addEventListener('click', (e) => {
  display.textContent = operate(storedValue, e.target.textContent, display.textContent);
  storedValue = display.textContent;
  digits.forEach(digit => digit.removeEventListener('click', joindigits));
  digits.forEach(digit => digit.addEventListener('click', displayonedigit));
}));

clear.addEventListener('click', () => {
  display.textContent = 0;
  digits.forEach(digit => digit.removeEventListener('click', joindigits));
  digits.forEach(digit => digit.addEventListener('click', displayonedigit));
});

equal.addEventListener('click', () => {
  digits.forEach(digit => digit.removeEventListener('click', joindigits));
  digits.forEach(digit => digit.addEventListener('click', displayonedigit));
});