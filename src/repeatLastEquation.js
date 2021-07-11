const repeatLastEquation = (lastEquation, nextFormula) => {
  const operatorAndNumRegex = /[-+/*]{0,}[0-9]{1,}[.]{0,1}[0-9]*/g;
  const results = lastEquation.match(operatorAndNumRegex) || [];
  const lastNum = results[results.length - 1];
  const lastOperator = lastNum[0];
  const originalLastNum = lastNum.substr(1);

  if ("+-/*".includes(lastOperator) && !isNaN(originalLastNum)) {
    return nextFormula + lastOperator + originalLastNum;
  }

  return nextFormula;
};
export default repeatLastEquation;
