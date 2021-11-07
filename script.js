let result = 0;

function add(a, b) {
  return Math.round((Number(a) + Number(b)) * 1000000) / 1000000;
};

function subtract(a, b) {
  return Math.round((a - b) * 1000000) / 1000000;
};

function multiply(a, b) {
  return Math.round((a * b) * 1000000) / 1000000;
};

function divide(a, b) {
  return Math.round((a / b) * 1000000) / 1000000;
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
const calculation = document.querySelector("div#calculation");
const operators = document.querySelectorAll("button.operators");
const clear = document.querySelector("button#clear");
const equal = document.querySelector("button#equal");

let valueA
let valueB
let valueOperator
display.textContent = 0;

digits.forEach(element => element.addEventListener('click', displayonedigit));
digits.forEach(element => element.addEventListener('click', () => {
  operators.forEach(operator => operator.addEventListener('click', firstclick));
}));

function displayonedigit(e) {
  display.textContent = e.target.textContent;
  digits.forEach(element => element.addEventListener('click', joindigits));
  operators.forEach(operator => operator.removeEventListener('click', subsequentclicks));
  equal.addEventListener('click', tallyonetime, { once: true });
  digits.forEach(element => element.removeEventListener('click', displayonedigit));

};

function joindigits(e) {
  display.textContent += e.target.textContent;
};

function firstclick(e) {
  valueB = display.textContent;
  if (valueB == "0" && valueOperator == "/") {
    display.textContent = "Error. You can't do that :(";
    display.style.fontSize = '32px';
    calculation.textContent = valueA + " / 0"
    digits.forEach(digit => digit.removeEventListener('click', joindigits));
    digits.forEach(digit => digit.removeEventListener('click', displayonedigit));
    operators.forEach(operator => operator.removeEventListener('click', subsequentclicks));
    equal.removeEventListener('click', tallyonetime, { once: true });
    operators.forEach(operator => operator.removeEventListener('click', firstclick));
    return;
  };
  if (valueB == "Error. You can't do that :(") return;
  if (valueA || valueOperator) {
    display.textContent = operate(valueA, valueOperator, valueB);
    valueA = display.textContent;
    calculation.textContent = valueA + " " + e.target.textContent;
    valueOperator = e.target.textContent;
  } else if (!valueA || !valueOperator) {
    valueA = display.textContent;
    valueOperator = e.target.textContent;
    calculation.textContent = valueA + " " + e.target.textContent;
  };
  digits.forEach(digit => digit.removeEventListener('click', joindigits));
  digits.forEach(digit => digit.addEventListener('click', displayonedigit));
  operators.forEach(operator => operator.addEventListener('click', subsequentclicks));
  operators.forEach(operator => operator.removeEventListener('click', firstclick));
};

operators.forEach(operator => operator.addEventListener('click', firstclick));


function subsequentclicks(e) {
  valueOperator = e.target.textContent;
  calculation.textContent = valueA + " " + e.target.textContent;
}
clear.addEventListener('click', () => {
  display.textContent = 0;
  calculation.textContent = ""
  valueA = false;
  valueB = false;
  valueOperator = false;
  digits.forEach(digit => digit.removeEventListener('click', joindigits));
  digits.forEach(digit => digit.addEventListener('click', displayonedigit));
  operators.forEach(operator => operator.removeEventListener('click', subsequentclicks));
  operators.forEach(operator => operator.addEventListener('click', firstclick));

});

equal.addEventListener('click', tallyonetime, { once: true });

function tallyonetime() {
  valueB = display.textContent;
  if (valueB == "0" && valueOperator == "/") {
    display.textContent = "Error. You can't do that :(";
    display.style.fontSize = '32px';
    calculation.textContent = valueA + " / 0"
    digits.forEach(digit => digit.removeEventListener('click', joindigits));
    digits.forEach(digit => digit.removeEventListener('click', displayonedigit));
    operators.forEach(operator => operator.removeEventListener('click', subsequentclicks));
    equal.removeEventListener('click', tallyonetime, { once: true });
    operators.forEach(operator => operator.removeEventListener('click', firstclick));
    return;
  };
  calculation.textContent = calculation.textContent + " " + valueB + " " + "="
  display.textContent = operate(valueA, valueOperator, valueB);
  valueA = display.textContent;
  digits.forEach(digit => digit.removeEventListener('click', joindigits));
  digits.forEach(digit => digit.addEventListener('click', displayonedigit));
  operators.forEach(operator => operator.removeEventListener('click', firstclick));
  operators.forEach(operator => operator.addEventListener('click', subsequentclicks));
};