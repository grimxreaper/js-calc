import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import { evaluate, round } from "mathjs";

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
              originalLastNum: this.recordLastNum(
                this.state.result + button.key
              ),
              result: this.state.result + button.key,
            });
          } else {
            this.setState({
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
    let lastNum = results[results.length - 1];
    if (!"-+/*".includes(lastNum[0])) {
      return lastNum;
    }
    this.setState({
      operate: lastNum[0],
    });
    return lastNum.substr(1);
  };

  setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  };

  changeKeys = (result, button) => {
    if ("(".includes(button)) {
      if (result.length > 1) {
        if ("0123456789".includes(result[result.length - 1])) {
          return result + button.replace("(", "*(");
        }
      }
    }
    if (result === "") {
      if ("+-(0123456789".includes(button)) {
        return button;
      }
      if ("/*".includes(button)) {
        return "0" + button;
      }
      if (".".includes(button)) {
        return "0.";
      }
    }
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
    if (result[result.length - 1] === "(") {
      if ("+-(0123456789".includes(button)) {
        return result + button;
      }
      if (".".includes(button)) {
        return result + "0.";
      }
    }
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

    if ("0123456789)".includes(result[result.length - 2])) {
      //checking "digit, ) -> operator"
      if ("/*+-".includes(result[result.length - 1])) {
        if ("+-(0123456789".includes(button)) {
          return result + button;
        }
        if (".".includes(button)) {
          return result + "0.";
        }
        if ("/".includes(button) && result[result.length - 1] === "-") {
          return this.setCharAt(result, result.length - 1, "/");
        }
        if ("/".includes(button) && result[result.length - 1] === "+") {
          return this.setCharAt(result, result.length - 1, "/");
        }
        if ("*".includes(button) && result[result.length - 1] === "-") {
          return this.setCharAt(result, result.length - 1, "*");
        }
        if ("*".includes(button) && result[result.length - 1] === "+") {
          return this.setCharAt(result, result.length - 1, "*");
        }
      }
    }
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
    if ((result[result.length - 1] || "").includes(".")) {
      if ("0123456789".includes(button)) {
        return result + button;
      }
    }

    if ((result || "").includes(".")) {
      if ("+-*/0123456789".includes(button)) {
        return result + button;
      }
    }
    return result;
  };

  closeParens = (result) => {
    var numberOfOpenP = (result.match(/\(/g) || []).length;
    var numberOfCloseP = (result.match(/\)/g) || []).length;

    while (numberOfOpenP > numberOfCloseP) {
      result = result + ")";
      numberOfOpenP--;
    }
    return result;
  };

  getLastChar = (from) => {
    return from.slice(-1);
  };

  roundedResult = (expression) => {
    const digitAfterComma = 13;
    round(evaluate(expression), digitAfterComma);
  };

  addMultiplier = (expression) => {
    const digitAndP = /([0123456789])(\()/g;
    const pAndDigit = /(\))([0123456789])/g;
    // )( -> )*(
    const pAndp = /(\))(\()/g;

    return expression
      .replace(digitAndP, "$1*$2")
      .replace(pAndDigit, "$1*$2")
      .replace(pAndp, "$1*$2");
  };

  calculate = () => {
    const { result, operate, originalLastNum } = this.state;
    let finalResult = 0;
    var tempResult = result;

    if ("-+*/".includes(this.getLastChar(result))) {
      tempResult = result.slice(0, -1);
    }

    tempResult = this.closeParens(tempResult) + "";
    tempResult = this.addMultiplier(tempResult) + "";

    const regex = /-{0,1}[0123456789]*(\.[0123456789]*){0,1}/g;
    const matches = tempResult.match(regex) || [];
    if (matches.length > 1 && matches[0] === tempResult) {
      if ("+-/*".includes(operate) && !isNaN(originalLastNum)) {
        try {
          finalResult =
            this.roundedResult(tempResult + operate + originalLastNum) + "";
        } catch (error) {}
      }
    } else {
      var tempResultString = tempResult;
      const reg = /\(([0123456789/*-+.]*)\)/g;
      var parenthesisToCalculate = tempResultString.match(reg) || [];
      while (parenthesisToCalculate.length > 0) {
        for (var i = 0; i < parenthesisToCalculate.length; i++) {
          let expression = parenthesisToCalculate[i];
          try {
            let tempResult = round(evaluate(expression), 13);
            tempResultString = tempResultString.replace(expression, tempResult);
          } catch (error) {}
        }

        parenthesisToCalculate = tempResultString.match(reg) || [];
      }
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
