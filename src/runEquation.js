import handleDoubleEquals from "./handleDoubleEquals";
import handleNestedParens from "./handleNestedParens";

const runEquation = (lastEquation, cleanEquation) => {
  let finalResult = 0;
  let nextEquation = cleanEquation;

  if (lastEquation.length > 0) {
    [finalResult, nextEquation] = handleDoubleEquals(
      lastEquation,
      cleanEquation
    );
  } else {
    [finalResult, nextEquation] = handleNestedParens(nextEquation);
  }
  return [finalResult, nextEquation];
};
export default runEquation;
