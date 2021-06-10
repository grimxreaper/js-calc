const isDisplayable = (key) => {
  const numOrDecimal = "0123456789.".includes(key);
  const openP = key === "(";
  const closedP = key === ")";
  const isOperator = "/*-+".includes(key);
  if (openP || closedP || numOrDecimal || isOperator) {
    return true;
  }
  return false;
};
export default isDisplayable;
