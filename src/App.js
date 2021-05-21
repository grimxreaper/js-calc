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
    // If there is no operator -> we return the value
    if (!"-+/*".includes(lastNum[0])) {
      return lastNum;
    }
    this.setState({
      operate: lastNum[0],
    });
    return lastNum.substr(1);
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

  getLastChar = (from) => {
    return from.slice(-1);
  };

  roundedResult = (expression) => {
    const digitAfterComma = 13;
    round(evaluate(expression), digitAfterComma);
  };

  calculate = () => {
    const { result, operate, originalLastNum } = this.state;
    let finalResult = 0;
    var tempResult = result;
    // Special case with expression ending with operator, after CE use
    if ("-+*/".includes(this.getLastChar(result))) {
      tempResult = result.slice(0, -1);
    }
      // Handling double equal
      // If I only have sign + digit(s) + dot + digit(s)
      const regex = /-{0,1}[0123456789]*(\.[0123456789]*){0,1}/g;
      const matches = tempResult.match(regex) || [];
      if (matches.length > 1 && matches[0] === tempResult) {
        //I need to handle the double equal
        if ("+-/*".includes(operate) && !isNaN(originalLastNum)) {
          // finalResult = evaluate(result + operate + originalLastNum) + "";
          try {
            finalResult =
              this.roundedResult(tempResult + operate + originalLastNum) + "";
          } catch (error) {
            //throw error
          }
        }
      } else {
        // Handle paraenthesis
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
              console.log(expression)
              let tempResult = round(evaluate(expression), 13);

              //We need to replace the expression by the calculation
              tempResultString = tempResultString.replace(
                expression,
                tempResult
              );
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
      }
      this.setState({
        done: true,
        result: finalResult + "",
      });
      console.log('final', finalResult, 'result', result)
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
