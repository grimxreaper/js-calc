import closeParens from "./closeParens";
import addMultiplier from "./addMultiplier";
import handleNestedParens from "./handleNestedParens";
import handleDoubleEqual from "./handleDoubleEqual";

const getLastChar = (from) => {
  return from.slice(-1);
};

const cleanupEquation = (result, operate, originalLastNum) => {
  let finalResult = 0;
  var tempResult = result;

  if ("-+*/".includes(getLastChar(result))) {
    tempResult = result.slice(0, -1);
  }

  tempResult = closeParens(tempResult) + "";
  tempResult = addMultiplier(tempResult) + "";
  finalResult = handleDoubleEqual(result, operate, originalLastNum) + "";
  finalResult = handleNestedParens(tempResult) + "";

  return [tempResult, finalResult];
};
export default cleanupEquation;
