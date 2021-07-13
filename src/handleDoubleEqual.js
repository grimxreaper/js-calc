import { evaluate, round } from "mathjs";

const roundedResult = (expression) => {
  const digitAfterComma = 13;
  round(evaluate(expression), digitAfterComma);
};

const handleDoubleEqual = (result, operate, originalLastNum) => {
  let finalResult = 0;
  var tempResult = result;
  // Handling double equal
  // If I only have sign + digit(s) + dot + digit(s)
  const regex = /-{0,1}[0123456789]*(\.[0123456789]*){0,1}/g;
  const matches = tempResult.match(regex) || [];
  if (matches.length > 1 && matches[0] === tempResult) {
    //I need to handle the double equal
    if ("+-/*".includes(operate) && !isNaN(originalLastNum)) {
      // finalResult = evaluate(result + operate + originalLastNum) + "";
      try {
        finalResult =
          roundedResult(tempResult + operate + originalLastNum) + "";
      } catch (error) {
        //throw error
      }
    }
  }
  return finalResult;
};
export default handleDoubleEqual;
