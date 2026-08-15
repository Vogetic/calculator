const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator__keys");
const screen = document.querySelector(".calculator__screen");

calculator.dataset.firstValue = "";
calculator.dataset.secondValue = "";
calculator.dataset.previousAction = "";

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    let screenContent = screen.textContent;
    const keyValue = key.textContent;
    const previousAction = calculator.dataset.previousAction;

    if (action != "clear") {
      document.querySelector("[data-action='clear']").textContent = "CE";
    }

    if (!action) {
      if (screenContent === "0" || previousAction === "operator") {
        screen.textContent = keyValue;
      } else if (previousAction === "calculate") {
        screen.textContent = keyValue;
        calculator.dataset.firstValue = "";
        calculator.dataset.secondValue = "";
      } else {
        screen.textContent += keyValue;
      }

      calculator.dataset.previousAction = "number";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      if (
        previousAction != "decimal" &&
        previousAction != "operator" &&
        previousAction != "calculate" &&
        previousAction != ""
      ) {
        calculator.dataset.operator = action;

        if (calculator.dataset.firstValue !== "") {
          calculator.dataset.secondValue = screenContent;
          const firstValue = calculator.dataset.firstValue;
          const secondValue = calculator.dataset.secondValue;
          const operator = calculator.dataset.operator;
          screen.textContent = calculate(firstValue, secondValue, operator);
        }
        calculator.dataset.firstValue = screen.textContent;
        calculator.dataset.previousAction = "operator";
      }
    }

    if (action === "decimal") {
      if (!screenContent.includes(".")) {
        screen.textContent += keyValue;
        calculator.dataset.previousAction = "decimal";
      }
      if (previousAction === "operator") {
        screen.textContent = "0.";
        calculator.dataset.previousAction = "decimal";
      } else if (previousAction === "calculate") {
        screen.textContent = "0.";
        calculator.dataset.firstValue = "";
        calculator.dataset.secondValue = "";
      }
    }

    if (action === "clear") {
      screen.textContent = "0";

      if (keyValue === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.secondValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousAction = "";
      } else {
        key.textContent = "AC";
      }
    }

    if (action === "calculate") {
      if (previousAction != "decimal" && calculator.dataset.firstValue != "") {
        const firstValue = calculator.dataset.firstValue;
        let secondValue;
        const operator = calculator.dataset.operator;
        if (previousAction === "calculate") {
          secondValue = calculator.dataset.secondValue;
          screen.textContent = calculate(firstValue, secondValue, operator);
          calculator.dataset.firstValue = screen.textContent;
          calculator.dataset.previousAction = "calculate";
        } else {
          calculator.dataset.secondValue = screenContent;
          secondValue = calculator.dataset.secondValue;

          screen.textContent = calculate(firstValue, secondValue, operator);
          calculator.dataset.firstValue = screen.textContent;
          calculator.dataset.previousAction = "calculate";
        }
      }
    }
  }
});

function calculate(firstValue, secondValue, operator) {
  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);
  if (operator === "add") return firstNumber + secondNumber;

  if (operator === "subtract") return firstNumber - secondNumber;

  if (operator === "multiply") return firstNumber * secondNumber;

  if (operator === "divide") return firstNumber / secondNumber;
}
