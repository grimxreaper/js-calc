const pressedAnotherOperator = (key, hasLastChar) => {
  const isMultLastAdd = key === "*" && hasLastChar("+");
  const isMultLastSub = key === "*" && hasLastChar("-");
  const isDivLastAdd = key === "/" && hasLastChar("+");
  const isDivLastSub = key === "/" && hasLastChar("-");
  const isMinusLastAdd = key === "+" && hasLastChar("-");

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
