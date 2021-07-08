import cleanupEquation from "./cleanupEquation";
import repeatLastEquation from "./repeatLastEquation";
import runEquation from "./runEquation";

const finalizeEquation = (result, lastEquation) => {
  var nextEquation = cleanupEquation(result, lastEquation);

  if (lastEquation.length > 0) {
    nextEquation = repeatLastEquation(lastEquation, nextEquation);
  }

  let finalResult = 0;
  [nextEquation, finalResult] = runEquation(nextEquation);

  return [nextEquation, finalResult];
};
export default finalizeEquation;
