import runEquation from "./runEquation";
import updateDisplay from "./updateDisplay";
import closeOpenParens from "./closeOpenParens";
import addMultiplier from "./addMultiplier";

const handleButtonPress = (result, button, lastEquation) => {
  const pressedEqual = button.key === "=";
  const pressedAC = button.key === "AC";
  const pressedCE = button.key === "CE";
  let nextResult, nextEquation;
  var cleanEquation = result;

  if (button.isDisplayable) {
    nextResult = updateDisplay(result, button.key, lastEquation);
    nextEquation = "";
  } else if (pressedEqual) {
    const getLastChar = (from) => {
      return (from + "").slice(-1);
    };
    if ("-+*/".includes(getLastChar(result))) {
      cleanEquation = (result + "").slice(0, -1);
    }

    cleanEquation = closeOpenParens(cleanEquation);
    cleanEquation = addMultiplier(cleanEquation);

    [nextResult, nextEquation] = runEquation(lastEquation, cleanEquation);
  } else if (pressedAC) {
    nextResult = "";
    nextEquation = "";
  } else if (pressedCE) {
    nextResult = (result + "").slice(0, -1);
  }

  return [nextResult, nextEquation];
};
export default handleButtonPress;
