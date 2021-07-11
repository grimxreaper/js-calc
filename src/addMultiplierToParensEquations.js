const addMultiplierToParensEquations = (expression) => {
  const digitAndP = /([0123456789])(\()/g;
  const pAndDigit = /(\))([0123456789])/g;
  const pAndp = /(\))(\()/g;

  return expression
    .replace(digitAndP, "$1*$2")
    .replace(pAndDigit, "$1*$2")
    .replace(pAndp, "$1*$2");
};
export default addMultiplierToParensEquations;