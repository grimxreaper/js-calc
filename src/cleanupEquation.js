import closeParens from "./closeParens";
import addMultiplier from "./addMultiplier";

const getLastChar = (from) => {
  return from.slice(-1);
};

const cleanupEquation = (result) => {
  var tempResult = result;

  if ("-+*/".includes(getLastChar(result))) {
    tempResult = result.slice(0, -1);
  }

  tempResult = closeParens(tempResult) + "";
  tempResult = addMultiplier(tempResult) + "";

  return tempResult;
};
export default cleanupEquation;
