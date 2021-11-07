let result = 0;

function add(a, b) {
  return a + b;
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
const operators = document.querySelectorAll("button.operators")

digits.forEach(addListener);
function addListener(element) {
element.addEventListener('click', displayonedigit)
};
function displayonedigit(e) {
  display.textContent = e.target.textContent;
  digits.forEach(element => element.addEventListener('click', joindigits));
  digits.forEach(element => element.removeEventListener('click', displayonedigit));
  
};

function joindigits(e) {
  display.textContent += e.target.textContent;
};

