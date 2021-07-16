const pressedAnotherOperator = (result, button) => {
  const divideLastMinus =
    "/".includes(button) && result[result.length - 1] === "-";
  const divideLastAdd =
    "/".includes(button) && result[result.length - 1] === "+";
  const multiplyLastMinus =
    "*".includes(button) && result[result.length - 1] === "-";
  const multiplyLastAdd =
    "*".includes(button) && result[result.length - 1] === "+";
  const addLastMinus =
    "+".includes(button) && result[result.length - 1] === "-";

  if (
    divideLastAdd ||
    divideLastMinus ||
    multiplyLastAdd ||
    multiplyLastMinus ||
    addLastMinus
  ) {
    return true;
  }
  return false;
};
export default pressedAnotherOperator;
