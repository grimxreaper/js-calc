import runEquation from "./runEquation";
import updateDisplay from "./updateDisplay";

const handleButtonPress = (button, result, lastEquation) => {
  let nextResult, nextEquation;

  if (button.isDisplayable) {
    nextResult = updateDisplay(result, button.key, lastEquation);
    nextEquation = "";
  } else if (button.key === "=") {
    [nextEquation, nextResult] = runEquation(result, lastEquation);
  } else if (button.key === "AC") {
    nextEquation = "";
    nextResult = "";
  } else if (button.key === "CE") {
    nextResult = result.slice(0, -1);
  }

  return [nextResult, nextEquation];
};
export default handleButtonPress;
