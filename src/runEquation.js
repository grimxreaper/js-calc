import cleanupEquation from "./cleanupEquation";
import repeatLastEquation from "./repeatLastEquation";
import evaluateEquation from "./evaluateEquation";

const runEquation = (result, lastEquation) => {
  var nextEquation = cleanupEquation(result, lastEquation);

  if (lastEquation.length > 0) {
    nextEquation = repeatLastEquation(lastEquation, nextEquation);
  }

  let nextResult = 0;
  [nextEquation, nextResult] = evaluateEquation(nextEquation);

  return [nextEquation, nextResult + ""];
};
export default runEquation;
