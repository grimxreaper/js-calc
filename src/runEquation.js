import cleanupEquation from "./cleanupEquation";
import repeatLastEquation from "./repeatLastEquation";
import evaluateEquation from "./evaluateEquation";

const runEquation = (result, lastEquation) => {
  var nextEquation = cleanupEquation(result, lastEquation);

  if (lastEquation.length > 0) {
    nextEquation = repeatLastEquation(lastEquation, nextEquation);
  }

  let finalResult = 0;
  [nextEquation, finalResult] = evaluateEquation(nextEquation);

  return [nextEquation, finalResult];
};
export default runEquation;
