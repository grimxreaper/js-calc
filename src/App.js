import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import { evaluate } from "mathjs";

class App extends React.Component {
  state = {
    result: "",
    counter: 0,
    done: false,
    operate: undefined,
    originalLastNum: "",
  };

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
          if (
            button.key === "." ||
            (this.state.originalLastNum + "").includes(".")
          ) {
            this.setState({
              //originalLastNum: this.state.originalLastNum + button.key,
              originalLastNum: this.recordLastNum(
                this.state.result + button.key
              ),
              result: this.state.result + button.key,
            });
          } else {
            this.setState({
              //originalLastNum: button.key,
              originalLastNum: this.recordLastNum(
                this.state.result + button.key
              ),
              result: this.state.result + button.key,
            });
          }
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
    const regex = /[-+/*]{0,}[0-9]{1,}[.]{0,1}[0-9]*/g;
    let results = result.match(regex) || [];
    if (results.length === 0) {
      return "";
    }

    //We need to take the last one
    let lastNum = results[results.length - 1];
    // console.log();

    // If there is no operator -> we return the value
    if (!"-+/*".includes(lastNum[0])) {
      return lastNum;
    }
    this.setState({
      operate: lastNum[0],
    });
    return lastNum.substr(1);

    /*
    // If there is one sign, we remove itr
    const operatorsCount = (result.match(/[-+/*]/g) || []).length;
    if (operatorsCount === 1) {
      return lastNum.substr(1)
    }
    // If there are two operator (operator+sign) -> we remove the first and keep the sign
    if (operatorsCount === 2) {
      return lastNum.substr(1)
    }
*/
  };

  changeKeys = (result, button) => {

    if ("(".includes(button)) {
      if (result.length > 1) {
        //these few lines below, did not work to fix another bug
  
        if ("0123456789".includes(result[result.length - 1])) {
          //remove the previous number and return the last number
          return result + button.replace("(", "*(");
        }
      }
    }
    if (result === "") {
      if ("+-(0123456789".includes(button)) {
        return button;
      }
      if (".".includes(button)) {
        return "0.";
      }
    }

    // After a digit, you can only have
    // - digit
    // - operator
    // - ), only if there are more ( than )
    // .
    if ("0123456789".includes(result[result.length - 1])) {
      const numberOfOpenP = (result.match(/\(/g) || []).length;
      const numberOfCloseP = (result.match(/\)/g) || []).length;
      if (
        "*/-+0123456789.".includes(button) ||
        (button.key === ")" && numberOfOpenP > numberOfCloseP)
      ) {
      
        return result + button;
      } else {
        return result;
      }
    }
    // After a (, you can only have *same as empty expression
    // - Digit
    // - (
    // - sign
    // - ., but we need to add a zero before
    //ex: 59 - (
    if (result[result.length - 1] === "(") {
      if ("+-(0123456789".includes(button)) {
        return result + button;
      }
      if (".".includes(button)) {
        return result + "0.";
      }
    }

    //🪲BUG -> (7 +  isn't working, attempting fix with this if conditional
    if (
      result[result.length - 1] === "(" &&
      "/*+-".includes(button) &&
      result[result.length - 2].includes("0123456789(")
    ) {
      return result + button;
    }

    // After a ), you can only have
    // - operator
    // - ), only if there are more ( than )

    if (result[result.length - 1] === ")") {
      const numberOfOpenP = (result.match(/\(/g) || []).length;
      const numberOfCloseP = (result.match(/\)/g) || []).length;
      if ("/*-+".includes(button)) {
        return result + button;
      }
      if (")".includes(button) && numberOfOpenP > numberOfCloseP) {
        return result + button;
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
        if ("+-(0123456789".includes(button)) {
          return result + button;
        }
        if (".".includes(button)) {
          return result + "0.";
        }
      }
    }

    // After a sign, you can only have
    // - digit
    // - (
    // - ., but we need to add a zero before

    if ("/*+-(".includes(result[result.length - 2])) {
      if ("-+".includes(result[result.length - 1])) {
        if ("0123456789(".includes(button)) {
          return result + button;
        }
        if (".".includes(button)) {
          return result + "0.";
        }
      }
    }

    //After a dot, you can only have
    // - digit


    if ((result[result.length - 1] || "").includes(".")) {
      console.log(result[result.length - 1]);
      if ("0123456789".includes(button)) {
        return result + button;
      }
    }

    //ATTN -> added rule below myself outside of our tutoring

       //🪲 72.2 + doesn't work FIXED
    if ((result || "").includes('.')) {

      if ("+-*/0123456789".includes(button)) {
        return result + button;
      }
    }

    // 🪲 72(7+2 returns "not yet coded"


    // operator + operator -> replace the first operator

    // "" - - -> is not possible
    //return "not yet coded";
    return result;
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

  addMultiplier = (equation) => {

  //1- if there is a digit and an open parens immediately after it...
  //add a * in between them
  //2- if there is a close parens and a number immediately after it...
  //add a * in between them
  //3- if there is a close parens and another open parens immediately after it...
  //insert a * in between them

    const digitAndOpenP = /([0123456789.]*)(\()/g;
    const closeParensAndDigit = /(\))([0123456789.]*)/g;
    const twoGroupsOfParens = /(\))(\()/g;

    equation.replace(digitAndOpenP, "$1*$2").replace(closeParensAndDigit, "$1*$2").replace(twoGroupsOfParens, "$1*$2")
    
    return equation;
  }


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
          finalResult = evaluate(tempResult + operate + originalLastNum) + "";
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
            let tempResult = evaluate(expression);

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
        finalResult = evaluate(tempResultString);
      } catch (error) {
        //throw error
      }
    }

    this.setState({
      done: true,
      result: finalResult + "",
    });
  };

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
    // console.log(this.state);

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
