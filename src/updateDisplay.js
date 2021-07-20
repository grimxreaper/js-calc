import pressedAnotherOperator from "./pressedAnotherOperator";

const updateDisplay = (result, button, lastEquation) => {
  const lastCharIsOperator = "/*+-".includes(result[result.length - 1]);
  const pressedDecimal = ".".includes(button);

  const hasLastChar = (chars) => {
    return (result + "").substr(-1) === chars;
  };

  if (button === "-" && hasLastChar("-")) {
    button = ""; //no double negatives allowed
  }

  if (lastEquation !== "" && button !== "=") {
    //start new equation
    result = result + "";
  }

  if ((button === "*" || button === "/") && result === "") {
    result = 0; //insert zero in front of multiply or divide
  }

  if (lastCharIsOperator) {
    if (pressedDecimal) {
      result = result + "0";
    }
  }

  if (pressedAnotherOperator(result, button, hasLastChar)) {
    console.log(result);
    result = result.slice(0, -1);
  }

  return result;
};

export default updateDisplay;
