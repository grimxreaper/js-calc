import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import { evaluate, round } from "mathjs";

function someUniqueName(button, result) {
}

class App extends React.Component {
  state = {
    result: "",
    done: false,
    operate: undefined,
    originalLastNum: "",
    lastFormula: "",
  };

  // REFACTORS
  // 1. extract method/function (CHECK FOR HANDLING RETURNS)
  //   - make empty function, silly name
  //   - CUT code
  //   - PASTE into function
  //   - add function call to original location
  // 2. inline method/function (CHECK VARIABLE NAMES UNIQUE)
  // 3. extract variable (CHECK FOR MUTATIONS FROM DESTINATION TO STARTING)
  // 4. inline variable (CHECK FOR MUTATIONS FROM STARTING TO DESTINATION)

  // SUGGESTED REFACTORS
  // 1. Replace state variables "done", "originalLastNum", and "operator" with "lastFormula"
  // 2. Inline all functions inside onClick **QS: do you mean add all functions like changeKeys, reset, etc. inside of
  // 3. Extract variables

  onClick = (button) => {
    const numOrDecimal = button.type === "key";
    const openP = button.key === "(";
    const closedP = button.key === ")"
    const numOrDecimalOrOperator = button.key !== "CE" && button.key !== "=" && button.key !== "(" && button.key !== "AC" && button.key !== ")";
    const pressedAC = button.key === "AC";
    const pressedCE = button.key === "CE";
    const pressedEqual = button.key === "=";

    var newNewResult = "";

    if (numOrDecimal || openP || closedP) {
      if (this.state.done) {
        this.setState({
          done: false,
          originalLastNum: "",
          result: button.key + "",
        });
      } else {
        if (openP || closedP) {
          this.setState({
            result: this.state.result + button.key,
          });
        }
        else {
          const result = this.state.result + button.key
          var originalLastNum
          const regex = /[-+/*]{0,}[0-9]{1,}[.]{0,1}[0-9]*/g;
          let results = result.match(regex) || [];
          if (results.length === 0) {
            originalLastNum = "";
          }
          //We need to take the last one
          let lastNum = results[results.length - 1];
          // If there is no operator -> we originalLastNum the value
          if (!"-+/*".includes(lastNum[0])) {
            originalLastNum = lastNum;
          }
          this.setState({
            operate: lastNum[0],
          });
          originalLastNum = lastNum.substr(1);

          this.setState({
            //originalLastNum: this.state.originalLastNum + button.key,
            originalLastNum: originalLastNum,
            result: this.state.result + button.key,
          });
        }
      }
    } else {
      if (numOrDecimalOrOperator) {
        this.setState({
          operate: button.key,
          //result: this.state.result + button.key,
          result: this.changeKeys(this.state.result, button.key),
        });
      }
    }
    
    if (pressedEqual) {
      this.calculate();
    } else if (pressedAC) {
      this.setState({
        result: "",
        operate: "",
        done: false,
        originalLastNum: "",
      });
    } else if (pressedCE) {
      this.setState({
        result: this.state.result.slice(0, -1),
      });
    }
  };




  recordLastNum = (result) => {
  };

  setCharAt = (str,index,chr) => {
    if(index > str.length - 1) return str;
    return str.substring(0,index) + chr + str.substring(index + 1);
  }

  changeKeys = (result, button) => {
    var newResult = "";

    var numberOfOpenP = (result.match(/\(/g) || []).length;
    var numberOfCloseP = (result.match(/\)/g) || []).length;
    const needsExtraParens = "*/-+0123456789.".includes(button) ||
    (button.key === ")" && numberOfOpenP > numberOfCloseP);
    const isNum = "0123456789".includes(button);
    const isNumberPlusMinusOrOpenParen = "+-(0123456789".includes(button);
    const isNumOrOperator = "+-*/0123456789".includes(button);
    const isNumOrOpenP = "0123456789(".includes(button);
    const lastCharIsNum = "0123456789".includes(result[result.length - 1]);
    const isDot = ".".includes(button);
    const isOpenP = "(".includes(button);
    const isClosedP = ")".includes(button);
    const lastCharIsOpenP = result[result.length - 1] === "(";
    const lastCharIsClosedP = result[result.length - 1] === ")";
    const lastCharIsOperator = "/*+-".includes(result[result.length - 1]);
    const lastCharIsMinus = '-'.includes(result[result.length - 1]);
    const lastCharIsAddition = result[result.length -1] === "+";
    const isMinus = "-".includes(button);
    const isAddition = '+'.includes(button);
    const isMultiply = "*".includes(button);
    const isDivide = "/".includes(button);
    const isOperator = "/*-+".includes(button);
    const lastCharIsAddOrMinus = "-+".includes(result[result.length - 1]);
    const charBfrLastIsOperatorOrOpenP = "/*+-(".includes(result[result.length - 2]);
    const charBfrLastIsNumOrClosedP = "0123456789)".includes(result[result.length - 2]);


    if (isOpenP) {
      if (result.length > 1) {
        //these few lines below, did not work to fix another bug

        if (lastCharIsNum) {
          //remove the previous number and return the last number
          newResult = result + button.replace("(", "*(");
        }
      }
    }
  
    if (result === "") {
      if (isNumberPlusMinusOrOpenParen) {
        newResult = button;
      }
      if (isDot) {
        newResult = "0.";
      }
    }

    if (lastCharIsMinus) {
      if (isMinus) {
        newResult = result
      }
    }



    if (lastCharIsNum) {
      if (needsExtraParens) {
        newResult = result + button;
      } else {
        newResult = result;
      }
    }

    if (lastCharIsOpenP) {
      if (isNumberPlusMinusOrOpenParen) {
        newResult = result + button;
      }
      if (isDot) {
        newResult = result + "0.";
      }
    }
    if (lastCharIsClosedP) {
      if (isOperator) {
        newResult = result + button;
      }
      if (isClosedP && numberOfOpenP > numberOfCloseP) {
        newResult = result + button;
      }
    }

    
    //QS: will we run into a problem in differentiating an operator from a sign? */
    //For  + / , how do you know it's an operator, or a sign (7--)
    // You need to watch what is before
    // digit, ) -> operator
    // operator, ( -> sign
    // . -> cannot

    // After an operator, you can only have
    // - Digit
    // - sign
    // - (
    // - ., but we need to add a zero before



    if (charBfrLastIsNumOrClosedP) {
      //checking "digit, ) -> operator"
      if (lastCharIsOperator) {
        if (isNumberPlusMinusOrOpenParen) {
          newResult = result + button;
        }
        if (lastCharIsMinus && isMinus) {
          newResult = this.setCharAt(result, result.length - 1, '-')
        }
        if (lastCharIsMinus && isAddition) {
          newResult = this.setCharAt(result, result.length - 1, '+')
        }
        if (isDot) {
          newResult = result + "0.";
        }
        if (lastCharIsMinus && isDivide) {
          newResult = this.setCharAt(result, result.length - 1, '/')
        }
        if (lastCharIsAddition && isDivide) {
          newResult = this.setCharAt(result, result.length - 1, '/')
        }
        if (lastCharIsMinus && isMultiply) {
          newResult = this.setCharAt(result, result.length - 1, '*')
        }
        if (lastCharIsAddition && isMultiply) {
          newResult = this.setCharAt(result, result.length - 1, '*')
        }
      }
    }
    if (charBfrLastIsOperatorOrOpenP) {

      if (lastCharIsAddOrMinus) {
        if (isNumOrOpenP) {
          newResult = result + button;
        }
        if (isDot) {
          newResult = result + "0.";
        }
      }
    }
    if ((result[result.length - 1] || "").includes(".")) {
      if (isNum) {
        newResult = result + button;
      }
    }

       //🪲 72.2 + doesn't work FIXED
    if ((result || "").includes('.')) {
      if (isNumOrOperator) {
        newResult = result + button;
      }
    }


    // 🪲 72(7+2 newResult =s "not yet coded"


    // operator + operator -> replace the first operator

    // "" - - -> is not possible
    //newResult = "not yet coded";
  return newResult;
  };

  // closeParens = (result) => {
  //   var numberOfOpenP = (result.match(/\(/g) || []).length;
  //   var numberOfCloseP = (result.match(/\)/g) || []).length;
  //   //this solution works but only if there is one parenthesis missing,
  //   //instead, account for all parens missing

  //   while (numberOfOpenP > numberOfCloseP) {
  //     result = result + ")";
  //     numberOfOpenP--;
  //   }
  //   return result
  // };

  getLastChar = (from) => {
    return from.slice(-1);
  };


  roundedResult = (expression) => {
    const digitAfterComma = 13;
    round(evaluate(expression), digitAfterComma);
  };

  addMultiplier = (expression) => {
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



  calculate = () => {
    const { result, operate, originalLastNum } = this.state;
    let finalResult = 0;
    var tempResult = result;
    const lastCharIsOperator = "/*+-".includes(result[result.length - 1]);
    var numberOfOpenP = (result.match(/\(/g) || []).length;
    var numberOfCloseP = (result.match(/\)/g) || []).length;

    // Special case with expression ending with operator, after CE use
    if (lastCharIsOperator) {
      tempResult = result.slice(0, -1);
    }

    while (numberOfOpenP > numberOfCloseP) {
      tempResult = tempResult + ")";
      numberOfOpenP--;
    }


    // tempResult = this.closeParens(tempResult) + "";
    tempResult = this.addMultiplier(tempResult) + "";


    // Handling double equal
    // If I only have sign + digit(s) + dot + digit(s)
    const regex = /-{0,1}[0123456789]*(\.[0123456789]*){0,1}/g;
    const matches = tempResult.match(regex) || [];
    if (matches.length > 1 && matches[0] === tempResult) {
      //I need to handle the double equal
      if ("+-/*".includes(operate) && !isNaN(originalLastNum)) {
        // finalResult = evaluate(result + operate + originalLastNum) + "";
        try {
          finalResult = this.roundedResult(tempResult + operate + originalLastNum) + "";
        } catch(error) {

          //throw error
        }
      }
    } else {
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
      this.setState({
        done: true,
        result: finalResult + "",
      });
    }
  }

  // reset = () => {
  //   this.setState({
  //     result: "",
  //     operate: "",
  //     done: false,
  //     originalLastNum: "",
  //   });
  // };

  // backspace = () => {
  //   this.setState({
  //     result: this.state.result.slice(0, -1),
  //   });
  // };

  render() {
    return (
      <div className="container">
        <h1>Pocket Js Calculator</h1>
        <div className="calculator-body">
          <ResultComponent result={this.state.result} />
          <KeyPadComponent onClick={this.onClick} />
        </div>
      </div>
    );
  }
}
export default App;
