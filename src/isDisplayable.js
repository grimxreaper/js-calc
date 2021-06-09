const isDisplayable = (button) => {
  const numOrDecimal = button.type === "key";
  const openP = button.key === "(";
  const closedP = button.key === ")";
  const isOperator = "/*-+".includes(button.key);
  if (openP || closedP || numOrDecimal || isOperator) {
    return true;
  }
  return false;
};
export default isDisplayable;
