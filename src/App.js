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
          let originalLastNum;
          let lastNumResult = this.state.result + button.key;
          const operatorAndNumRegex = /[-+/*]{0,}[0-9]{1,}[.]{0,1}[0-9]*/g;
          let lastNumMatches = lastNumResult.match(operatorAndNumRegex) || [];

          if (lastNumMatches.length === 0) {
            originalLastNum = "";
          } else {
            let lastNum = lastNumMatches[lastNumMatches.length - 1];
            if (!"-+/*".includes(lastNum[0])) {
              originalLastNum = lastNum;
            } else {
              this.setState({
                operate: lastNum[0],
              });
              originalLastNum = lastNum.substr(1);
            }
          }

          this.setState({
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
        let keyPressed = button.key;
        let result = this.state.result;

        if ("(".includes(keyPressed)) {
          if (result.length > 1) {
            if ("0123456789".includes(result[result.length - 1])) {
              result = result + keyPressed.replace("(", "*(");
            }
          }
        } else if (result === "") {
          if ("+-(0123456789".includes(keyPressed)) {
            result = keyPressed;
          }
          if ("/*".includes(keyPressed)) {
            result = "0" + keyPressed;
          }
          if (".".includes(keyPressed)) {
            result = "0.";
          }
        } else if ("0123456789".includes(result[result.length - 1])) {
          const numberOfOpenP = (result.match(/\(/g) || []).length;
          const numberOfCloseP = (result.match(/\)/g) || []).length;
          if (
            "*/-+0123456789.".includes(keyPressed) ||
            (keyPressed.key === ")" && numberOfOpenP > numberOfCloseP)
          ) {
            result = result + keyPressed;
          }
        } else if (result[result.length - 1] === "(") {
          if ("+-(0123456789".includes(keyPressed)) {
            result = result + keyPressed;
          }
          if (".".includes(keyPressed)) {
            result = result + "0.";
          }
        } else if (result[result.length - 1] === ")") {
          const numberOfOpenP = (result.match(/\(/g) || []).length;
          const numberOfCloseP = (result.match(/\)/g) || []).length;
          if ("/*-+".includes(keyPressed)) {
            result = result + keyPressed;
          }
          if (")".includes(keyPressed) && numberOfOpenP > numberOfCloseP) {
            result = result + keyPressed;
          }
        } else if ("0123456789)".includes(result[result.length - 2])) {
          if ("/*+-".includes(result[result.length - 1])) {
            if ("(0123456789".includes(keyPressed)) {
              result = result + keyPressed;
            }
            if (".".includes(keyPressed)) {
              result = result + "0.";
            }
            if ("+".includes(keyPressed) && result[result.length - 1] === "-") {
              result =
                result.substring(0, result.length - 1) +
                "+" +
                result.substring(result.length - 1 + 1);
            }
            if ("-".includes(keyPressed) && result[result.length - 1] === "+") {
              result =
                result.substring(0, result.length - 1) +
                "-" +
                result.substring(result.length - 1 + 1);
            }
            if ("/".includes(keyPressed) && result[result.length - 1] === "-") {
              result =
                result.substring(0, result.length - 1) +
                "/" +
                result.substring(result.length - 1 + 1);
            }
            if ("/".includes(keyPressed) && result[result.length - 1] === "+") {
              result =
                result.substring(0, result.length - 1) +
                "/" +
                result.substring(result.length - 1 + 1);
            }
            if ("*".includes(keyPressed) && result[result.length - 1] === "-") {
              result =
                result.substring(0, result.length - 1) +
                "*" +
                result.substring(result.length - 1 + 1);
            }
            if ("*".includes(keyPressed) && result[result.length - 1] === "+") {
              result =
                result.substring(0, result.length - 1) +
                "*" +
                result.substring(result.length - 1 + 1);
            }
          }
        } else if ("/*+-(".includes(result[result.length - 2])) {
          if ("-+".includes(result[result.length - 1])) {
            if ("0123456789(".includes(keyPressed)) {
              result = result + keyPressed;
            }
            if (".".includes(keyPressed)) {
              result = result + "0.";
            }
          }
        } else if ((result[result.length - 1] || "").includes(".")) {
          if ("0123456789".includes(keyPressed)) {
            result = result + keyPressed;
          }
        } else if ((result || "").includes(".")) {
          if ("+-*/0123456789".includes(keyPressed)) {
            result = result + keyPressed;
          }
        }

        this.setState({
          operate: button.key,
          result: result,
        });
      }
    }
    if (button.key === "=") {
      const { result, operate, originalLastNum } = this.state;
      let finalResult = 0;
      var tempResult = result;

      if ("-+*/".includes(result.slice(-1))) {
        tempResult = result.slice(0, -1);
      }

      tempResult = this.closeParens(tempResult) + "";

      const digitAndP = /([0123456789])(\()/g;
      const pAndDigit = /(\))([0123456789])/g;
      // )( -> )*(
      const pAndp = /(\))(\()/g;

      tempResult = tempResult
        .replace(digitAndP, "$1*$2")
        .replace(pAndDigit, "$1*$2")
        .replace(pAndp, "$1*$2");

      const regex = /-{0,1}[0123456789]*(\.[0123456789]*){0,1}/g;
      const matches = tempResult.match(regex) || [];
      if (matches.length > 1 && matches[0] === tempResult) {
        if ("+-/*".includes(operate) && !isNaN(originalLastNum)) {
          try {
            finalResult = round(
              evaluate(tempResult + operate + originalLastNum),
              13 + ""
            );
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
              tempResultString = tempResultString.replace(
                expression,
                tempResult
              );
            } catch (error) {}
          }
          parenthesisToCalculate = tempResultString.match(reg) || [];
        }
        try {
          finalResult = round(evaluate(tempResultString), 13);
        } catch (error) {}
      }
      this.setState({
        done: true,
        result: finalResult + "",
      });
    } else if (button.key === "AC") {
      this.setState({
        result: "",
        operate: "",
        done: false,
        originalLastNum: "",
      });
    } else if (button.key === "CE") {
      this.setState({
        result: this.state.result.slice(0, -1),
      });
    }
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

  roundedResult = (expression) => {
    const digitAfterComma = 13;
    round(evaluate(expression), digitAfterComma);
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
