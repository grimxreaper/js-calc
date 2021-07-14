import lastCharNumber from "./lastCharNumber";
import pressedAnotherOperator from "./pressedAnotherOperator";

const changeKeys = (result, button) => {
  const lastCharIsNum = "0123456789".includes(result[result.length - 1]);
  const lastCharIsOperator = "/*+-".includes(result[result.length - 1]);

  if (result === "") {
    if ("+-(0123456789".includes(button)) {
      return button;
    }
  }
  if (lastCharIsNum) {
    return ([result, button] = lastCharNumber(result, button));
  }

  if (lastCharIsOperator) {
    return ([result, button] = pressedAnotherOperator(result, button));
  }

  return result;
};
export default changeKeys;
