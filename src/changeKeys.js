import lastCharNumber from "./lastCharNumber";
import pressedAnotherOperator from "./pressedAnotherOperator";

const changeKeys = (result, button) => {
  const lastCharIsNum = "0123456789".includes(result[result.length - 1]);
  const lastCharIsOperator = "/*+-".includes(result[result.length - 1]);
  const isOperator = "/*+-".includes(button);

  if (result === "") {
    if ("(0123456789".includes(button)) {
      return button;
    }
    if (isOperator) {
      return (result = "0" + button);
    }
  }
  if (lastCharIsNum) {
    return ([result, button] = lastCharNumber(result, button));
  }

  if (lastCharIsOperator) {
    if (".".includes(button)) {
      return result + "0.";
    }

    if (pressedAnotherOperator) {
      result = result.slice(0, -1);
      return [result + button];
    }
  }

  return result;
};
export default changeKeys;
