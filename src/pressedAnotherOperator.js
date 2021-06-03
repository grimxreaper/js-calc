const pressedAnotherOperator = (button, hasLastChar) => {
  const isMultLastAdd = button === "*" && hasLastChar("+");
  const isMultLastSub = button === "*" && hasLastChar("-");
  const isDivLastAdd = button === "/" && hasLastChar("+");
  const isDivLastSub = button === "/" && hasLastChar("-");
  const isMinusLastAdd = button === "+" && hasLastChar("-");

  if (
    isMultLastAdd ||
    isMultLastSub ||
    isDivLastAdd ||
    isDivLastSub ||
    isMinusLastAdd
  ) {
    return true;
  }
  return false;
};
export default pressedAnotherOperator;
