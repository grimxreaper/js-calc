import { evaluate, round } from "mathjs";

const runEquation = (expression) => {
  try {
    const digitAfterComma = 13;
    const evalAndRound = (e) => round(evaluate(e), digitAfterComma);
    const lastEquation = runParensCalculation(expression, evalAndRound);
    const result = evalAndRound(lastEquation);
    return [lastEquation, result];
  } catch (error) {}
};

const runParensCalculation = (equation, evalAndRound) => {
  const nonNestedParens = /\(([0123456789/*-+.]*)\)/g;
  var parensEquation = equation.match(nonNestedParens) || [];
  while (parensEquation.length > 0) {
    for (var i = 0; i < parensEquation.length; i++) {
      let expression = parensEquation[i];
      let tempResult = evalAndRound(expression);
      equation = equation.replace(expression, tempResult);
    }
    parensEquation = equation.match(nonNestedParens) || [];
  }
  return equation;
};
export default runEquation;