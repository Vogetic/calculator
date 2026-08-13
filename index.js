const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator__keys");
const screen = document.querySelector(".calculator__screen");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    let screenContent = screen.textContent;
    const keyValue = key.textContent;
    const previousAction = calculator.dataset.previousAction;

    if (!action) {
      if (screenContent === "0" || previousAction === "operator") {
        screen.textContent = keyValue;
        calculator.dataset.previousAction = "number";
      } else {
        screen.textContent += keyValue;
        calculator.dataset.previousAction = "number";
      }
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      if (previousAction != "decimal") {
        calculator.dataset.firstValue = screenContent;
        calculator.dataset.operator = action;
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
      }
    }

    if (action === "clear") {
      screen.textContent = "0";
      calculator.dataset.firstValue = screen.textContent;
      calculator.dataset.secondValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousAction = "";
    }

    if (action === "calculate") {
      if (previousAction != "decimal") {
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
  if (operator === "add") {
    return Number(firstValue) + Number(secondValue);
  } else if (operator === "subtract") {
    return Number(firstValue) - Number(secondValue);
  } else if (operator === "multiply") {
    return Number(firstValue) * Number(secondValue);
  } else if (operator === "divide") {
    return Number(firstValue) / Number(secondValue);
  }
}
