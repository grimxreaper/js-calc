const pressedAnotherOperator = (result, button, hasLastChar) => {
  const divideLastMinus = button === "/" && hasLastChar("-");
  const divideLastAdd = button === "/" && hasLastChar("+");
  const multiplyLastMinus = button === "*" && hasLastChar("-");
  const multiplyLastAdd = button === "*" && hasLastChar("+");
  const addLastMinus = button === "+" && hasLastChar("-");

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
