// Global variables
let currentResult = 0; //to store the calculated result
let calculationDescription = " ";
// to keep track of user inputs for a session
let logEntries = [];

const addError = () => {
  userInput.classList.add("error");
  // warning.innerHTML("This field is required!");
};
const removeError = () => {
  userInput.classList.remove("error");
  // warning.innerHTML("");
};

function success() {
  if (userInput.value === "") {
    addBtn.disabled = true;
    multiplyBtn.disabled = true;
    subtractBtn.disabled = true;
    divideBtn.disabled = true;
    addError();
  } else {
    addBtn.disabled = false;
    multiplyBtn.disabled = false;
    subtractBtn.disabled = false;
    divideBtn.disabled = false;
    warning.innerHTML("");
  }
}

const reset = () => {
  location.reload();
  localStorage.clear();
};
// get user input and parse it to int
const getUserNumberInput = () => parseInt(userInput.value);

// function to make changes in calculation description
// and call outputResult()
const calcDescriptionAndTrackInputs = (
  operator,
  resultBeforeCalculation,
  calculationNumber
) => {
  const calculationDescription = ` ${resultBeforeCalculation} ${operator} ${calculationNumber} `;
  const logEntry = {
    operator: operator,
    prevResult: resultBeforeCalculation,
    operand: calculationNumber,
    result: currentResult,
  };
  logEntries.push(logEntry);
  localStorage.setItem("prevCalculations", JSON.stringify(logEntries));

  // this function is in vendor.js file
  outputResult(currentResult, calculationDescription);
};

const calculationAndType = (operator) => {
  let userInputToInt = getUserNumberInput();
  const prevResult = currentResult;
  if (operator === "+") {
    const prevResult = currentResult;
    currentResult += userInputToInt;
  } else if (operator === "-") {
    const prevResult = currentResult;
    currentResult -= userInputToInt;
  } else if (operator === "*") {
    const prevResult = currentResult;
    currentResult *= userInputToInt;
  } else if (operator === "/") {
    const prevResult = currentResult;
    currentResult /= userInputToInt;
  }
  calcDescriptionAndTrackInputs(operator, prevResult, userInputToInt);
};

// all the functions to perform calculations
const add = () => {
  calculationAndType("+");
};

const subtract = () => {
  calculationAndType("-");
};

const multiply = () => {
  calculationAndType("*");
};

const divide = () => {
  calculationAndType("/");
};

// all the event listeners for the buttons
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
clearBtn.addEventListener("click", reset);