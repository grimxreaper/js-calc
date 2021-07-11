import pressedAnotherOperator from "./pressedAnotherOperator";

const updateDisplay = (result, key, lastEquation) => {
  const hasLastChar = (char) => {
    return result.substr(-1) === char;
  };

  if (pressedAnotherOperator(key, hasLastChar)) {
    result = result.slice(0, -1); //remove last character
  }

  if (key === "-" && hasLastChar("-")) {
    key = ""; //no double negatives allowed
  }

  if ((key === "*" || key === "/") && result === "") {
    result = 0; //insert zero in front of multiply or divide
  }

  if (lastEquation !== "" && key !== "=") {
    //start new equation
    result = "";
  }

  return result + key;
};
export default updateDisplay;
