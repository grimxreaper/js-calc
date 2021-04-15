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
    console.log();

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
        "*/-+0123456789.".includes(result) ||
        (button.key === ")" && numberOfOpenP > numberOfCloseP)
      ) {
        return result + button;
      }
    }
    // After a (, you can only have *same as empty expression
    // - Digit
    // - (
    // - sign
    // - ., but we need to add a zero before

    if (result[result.length - 1] === "(") {
      if ("+-(0123456789".includes(button)) {
        return result + button;
      }
      if (".".includes(button)) {
        return result + "0.";
      }
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

    if (result[result.length - 2].includes("0123456789)")) {
      //checking "digit, ) -> operator"
      if (result[result.length - 1].includes("/*+-")) {
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

    if (result[result.length - 2].includes("/*+-(")) {
      if (result[result.length - 1].includes("-+")) {
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

    if (result[result.length - 1].includes(".")) {
      console.log(result[result.length - 1])
      if ("0123456789".includes(button)) {
        return result + button;
      }
    }

    //ATTN -> added rule below myself outside of our tutoring
    if (result.includes('.')) {
      if ("0123456789".includes(button)) {
        return result + button;
      }

    }
    //72.2 + doesn't work


    // operator + operator -> replace the first operator

    
    // "" - - -> is not possible
    return "not yet coded";
  };

  calculate = () => {
    const { result, operate, originalLastNum } = this.state;
    let finalResult = 0;

    // Handling double equal
    // If I only have sign + digit(s) + dot + digit(s)
    const regex = /-{0,1}[0123456789]*(\.[0123456789]*){0,1}/g;
    const matches = result.match(regex) || [];
    if (matches.length > 1 && matches[0] === result) {
      //I need to handle the double equal
      if ("+-/*".includes(operate) && !isNaN(originalLastNum)) {
        finalResult = evaluate(result + operate + originalLastNum) + "";
      }
    } else {
      /*
    let lastKey = result.split(operate);
    if (lastKey[1]) {
      //check if string is not alone
      if ("123456789".includes(lastKey[lastKey.length - 1])) {
      this.setState({ originalLastNum: lastKey[lastKey.length - 1] })
      }
    }
    console.log(lastKey, this.originalLastNum)
*/
      // Handle paraenthesis
      //= 0 -> run the calculation

      // 1 -> run calculation insde (), replace () with result -> run calculation
      //We need to count the number of (
      // +1 ->
      // 2 differents issues
      // no level -> no ( inside ()) -> (2+5)*(5+6) -> order
      // level(nested) -> ( inside () -> 2(*(2+5))*5 -> 3*((2*5)/5)
      //  Rule: First you calculate the () withtout ( or ) inside

      var tempResultString = result;
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
          let tempResult = evaluate(expression);
          //We need to replace the expression by the calculation
          tempResultString = tempResultString.replace(expression, tempResult);
        }
        parenthesisToCalculate = tempResultString.match(reg) || [];
      }
      //In tempResultString we have the last expression withtout any ()

      finalResult = evaluate(tempResultString);
    }

    this.setState({
      done: true,
      result: (finalResult || "") + "",
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
    console.log(this.state);

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
