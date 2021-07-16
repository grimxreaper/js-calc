import { evaluate, round } from "mathjs";

const handleNestedParens = (nextEquation) => {
  let finalResult = 0;

  const nonNestedParens = /\(([0123456789/*-+.]*)\)/g;
  var parensEquation = nextEquation.match(nonNestedParens) || [];
  while (parensEquation.length > 0) {
    for (var i = 0; i < parensEquation.length; i++) {
      let expression = parensEquation[i];
      try {
        let tempResult = round(evaluate(expression), 13);
        nextEquation = nextEquation.replace(expression, tempResult);
      } catch (error) {}
    }
    parensEquation = nextEquation.match(nonNestedParens) || [];
  }
  try {
    finalResult = round(evaluate(nextEquation), 13);
  } catch (error) {}

  return [finalResult, nextEquation];
};
export default handleNestedParens;
