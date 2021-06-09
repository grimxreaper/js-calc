import closeLeftOpenParens from "./closeLeftOpenParens";
import addMultiplierToParensEquations from "./addMultiplierToParensEquations";

const cleanupEquation = (result, lastEquation) => {
  let nextEquation = result;

  if ("/*+-".includes(result[result.length - 1])) {
    //remove trailing operator
    nextEquation = result.slice(0, -1);
  }

  nextEquation = closeLeftOpenParens(nextEquation);
  nextEquation = addMultiplierToParensEquations(nextEquation);

  return nextEquation;
};
export default cleanupEquation;
