window.onload = function () {
  let saved = localStorage.getItem("history");
  if (saved) {
    historyDiv.innerText = saved;
  }
};
let display = document.getElementById("display");
let historyDiv = document.getElementById("history");
historyDiv.innerText = localStorage.getItem("history") || "";
function clearHistory() {
  historyDiv.innerText = "";
  localStorage.removeItem("history");
}
function press(value) {
  if (display.innerText === "0") {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function calculate() {
  let value = display.innerText;

  let numbers = value.split(/[\+\-\*\%\/]/);

  let num1 = Number(numbers[0]);
  let num2 = Number(numbers[1]);

  let match = value.match(/[\+\-\*\/]/);

  if (!match) {
    display.innerText = "Error";
    return;
  }

  let operator = match[0];
  let result;

  if (operator === "+") {
    result = num1 + num2;
  } else if (operator === "-") {
    result = num1 - num2;
  } else if (operator === "*") {
    result = num1 * num2;
  } else if (operator === "/") {
    result = num1 / num2;
  }
  historyDiv.innerText += value + " = " + result + "\n";

  localStorage.setItem("history", historyDiv.innerText);
  display.innerText = result;
}

function deleteLast() {
  let value = display.innerText;

  if (value.length <= 1) {
    display.innerText = "0";
  } else {
    display.innerText = value.slice(0, -1);
  }
}
function clearDisplay() {
  display.innerText = "0";
}

document.addEventListener("keydown", function (event) {
  if (!isNaN(event.key)) {
    press(event.key);
  }

  if (event.key === "+") press("+");
  if (event.key === "-") press("-");
  if (event.key === "*") press("*");
  if (event.key === "/") press("/");

  if (event.key === "Enter") {
    calculate();
  }

  if (event.key === "Backspace") {
    deleteLast();
  }

  if (event.key === "Escape") {
    clearDisplay();
  }
});
