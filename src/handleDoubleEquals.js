import { evaluate, round } from "mathjs";

const handleDoubleEquals = (lastEquation, cleanEquation) => {
  let finalResult;
  let nextEquation = cleanEquation;

  const operatorAndNumRegex = /[-+/*]{0,}[0-9]{1,}[.]{0,1}[0-9]*/g;
  const results = lastEquation.match(operatorAndNumRegex) || [];
  const lastOperatorAndNum = results[results.length - 1];
  const lastOperator = lastOperatorAndNum[0];
  const lastNum = lastOperatorAndNum.substr(1);
  const roundedResult = (expression) => {
    const digitAfterComma = 13;
    return round(evaluate(expression), digitAfterComma);
  };
  if ("+-/*".includes(lastOperator) && !isNaN(lastNum)) {
    try {
      nextEquation = cleanEquation + lastOperator + lastNum;
      finalResult = roundedResult(nextEquation) + "";
    } catch (error) {}
  }

  return [finalResult, nextEquation];
};
export default handleDoubleEquals;
