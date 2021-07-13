import { evaluate, round } from "mathjs";

const handleNestedParens = (tempResult) => {
  let finalResult = 0;
  var tempResultString = tempResult;
  //We need to detect the non nested parenthesis
  //Open ( and no other ( before the next close
  // '(' 0123456789-+*/.(not (, not ) ) ')'
  // ( + any number of the 15 chars + ) : (7+2) (-3.25478/+6.587)
  const reg = /\(([0123456789/*-+.]*)\)/g;
  var parenthesisToCalculate = tempResultString.match(reg) || [];
  while (parenthesisToCalculate.length > 0) {
    for (var i = 0; i < parenthesisToCalculate.length; i++) {
      //we extract the first expression ex:  (2+5)
      let expression = parenthesisToCalculate[i];
      //We calculate the value ex: 7

      try {
        let tempResult = round(evaluate(expression), 13);

        //We need to replace the expression by the calculation
        tempResultString = tempResultString.replace(expression, tempResult);
      } catch (error) {
        //throw error
      }
    }

    parenthesisToCalculate = tempResultString.match(reg) || [];
  }
  //In tempResultString we have the last expression withtout any ()

  try {
    finalResult = round(evaluate(tempResultString), 13);
  } catch (error) {
    //throw error
  }

  return finalResult;
};
export default handleNestedParens;
