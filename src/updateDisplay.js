import pressedAnotherOperator from "./pressedAnotherOperator";

const updateDisplay = (result, key, hasLastChar, lastEquation) => {
  var tempResult = result;
  var currentBtn = key;

  if (pressedAnotherOperator(key, hasLastChar)) {
    tempResult = tempResult.slice(0, -1); //remove last character
  }

  if (key === "-" && hasLastChar("-")) {
    currentBtn = ""; //no double negatives allowed
  }

  if ((key === "*" || key === "/") && result === "") {
    tempResult = 0; //insert zero in front of multiply or divide
  }

  if (lastEquation !== "" && key !== "=") {
    //start new equation
    tempResult = "";
  }

  return [tempResult, currentBtn];
};
export default updateDisplay;
