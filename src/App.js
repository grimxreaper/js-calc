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
    counter: 0,
    done: false,
    operate: undefined,
    originalLastNum: "",
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
  // 2. Inline all functions inside onClick
  // 3. Extract variables

  onClick = (button) => {

    if (button.type === "key" || button.key === "(" || button.key === ")") {
      if (this.state.done) {
        this.setState({
          done: false,
          originalLastNum: "",
          result: button.key + "",
        });
      } else {
        if (button.key === "(" || button.key === ")") {
          this.setState({
            result: this.state.result + button.key,
          });
        } else {
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
      if (
        button.key !== "CE" &&
        button.key !== "=" &&
        button.key !== "(" &&
        button.key !== "AC" &&
        button.key !== ")"
      ) {
        this.setState({
          operate: button.key,
          //result: this.state.result + button.key,
          result: this.changeKeys(this.state.result, button.key),
        });
      }
    }
    if (button.key === "=") {
      this.calculate();
    } else if (button.key === "AC") {
      this.reset();
    } else if (button.key === "CE") {
      this.backspace();
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

    const numberOfOpenP = (result.match(/\(/g) || []).length;
    const numberOfCloseP = (result.match(/\)/g) || []).length;
    const needsExtraParens = "*/-+0123456789.".includes(button) ||
    (button.key === ")" && numberOfOpenP > numberOfCloseP);
    const isNumberPlusMinusOrLeftParen = "+-(0123456789".includes(button)
    const isDot = ".".includes(button)


    if ("(".includes(button)) {
      if (result.length > 1) {
        //these few lines below, did not work to fix another bug

        if ("0123456789".includes(result[result.length - 1])) {
          //remove the previous number and return the last number
          newResult = result + button.replace("(", "*(");
        }
      }
    }
  
    if (result === "") {
      if (isNumberPlusMinusOrLeftParen) {
        console.log('HERE11')
        newResult = button;
      }
      if (isDot) {
        newResult = "0.";
      }
    }

    if ('-'.includes(result[result.length - 1])) {
      if ('-'.includes(button)) {
        newResult = result
      }
    }



    if ("0123456789".includes(result[result.length - 1])) {
      if (needsExtraParens) {
        newResult = result + button;
      } else {
        newResult = result;
      }
    }

    if (result[result.length - 1] === "(") {
      if ("+-(0123456789".includes(button)) {
        newResult = result + button;
      }
      if (".".includes(button)) {
        newResult = result + "0.";
      }
    }
    if (result[result.length - 1] === ")") {
      const numberOfOpenP = (result.match(/\(/g) || []).length;
      const numberOfCloseP = (result.match(/\)/g) || []).length;
      if ("/*-+".includes(button)) {
        newResult = result + button;
      }
      if (")".includes(button) && numberOfOpenP > numberOfCloseP) {
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



    if ("0123456789)".includes(result[result.length - 2])) {
      //checking "digit, ) -> operator"
      if ("/*+-".includes(result[result.length - 1])) {
        console.log('H')
        if ("+-(0123456789".includes(button)) {
          newResult = result + button;
        }
        if ('-'.includes(result[result.length - 1]) && "-".includes(button)) {
          newResult = this.setCharAt(result, result.length - 1, '-')
        }
        if ('-'.includes(result[result.length - 1]) && '+'.includes(button)) {
          newResult = this.setCharAt(result, result.length - 1, '+')
        }
        if (".".includes(button)) {
          newResult = result + "0.";
        }
        if ("/".includes(button) && result[result.length -1] === "-") {
          newResult = this.setCharAt(result, result.length - 1, '/')
        }
        if ("/".includes(button) && result[result.length -1] === "+") {
          newResult = this.setCharAt(result, result.length - 1, '/')
        }
        if ("*".includes(button) && result[result.length -1] === "-") {
          newResult = this.setCharAt(result, result.length - 1, '*')
        }
        if ("*".includes(button) && result[result.length -1] === "+") {
          newResult = this.setCharAt(result, result.length - 1, '*')
        }
      }
    }
    if ("/*+-(".includes(result[result.length - 2])) {

      if ("-+".includes(result[result.length - 1])) {
        console.log('HERE22')
        if ("0123456789(".includes(button)) {
          newResult = result + button;
        }
        if (".".includes(button)) {
          newResult = result + "0.";
        }
      }
    }
    if ((result[result.length - 1] || "").includes(".")) {
      console.log('HERE 2.5')
      if ("0123456789".includes(button)) {
        newResult = result + button;
      }
    }

       //🪲 72.2 + doesn't work FIXED
    if ((result || "").includes('.')) {
      console.log('HERE33')
      if ("+-*/0123456789".includes(button)) {
        newResult = result + button;
      }
    }

    // 🪲 72(7+2 newResult =s "not yet coded"


    // operator + operator -> replace the first operator

    // "" - - -> is not possible
    //newResult = "not yet coded";
return newResult;
  };

  closeParens = (result) => {
    var numberOfOpenP = (result.match(/\(/g) || []).length;
    var numberOfCloseP = (result.match(/\)/g) || []).length;
    //this solution works but only if there is one parenthesis missing,
    //instead, account for all parens missing

    while (numberOfOpenP > numberOfCloseP) {
      result = result + ")";
      numberOfOpenP--;
    }
    return result
  };

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

    // Special case with expression ending with operator, after CE use
    if ("-+*/".includes(this.getLastChar(result))) {
      tempResult = result.slice(0, -1);
    }


    tempResult = this.closeParens(tempResult) + "";
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

  reset = () => {
    this.setState({
      result: "",
      operate: "",
      done: false,
      originalLastNum: "",
    });
  };

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1),
    });
  };

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
