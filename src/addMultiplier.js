const addMultiplier = (expression) => {
  //Find all pattern Digit + (
  //expression ="1(2+6)+23(6+9)+(2+3)9"

  const digitAndP = /([0123456789])(\()/g;
  const pAndDigit = /(\))([0123456789])/g;
  // )( -> )*(
  const pAndp = /(\))(\()/g;

  //return the value
  return expression
    .replace(digitAndP, "$1*$2")
    .replace(pAndDigit, "$1*$2")
    .replace(pAndp, "$1*$2");
};
export default addMultiplier;
