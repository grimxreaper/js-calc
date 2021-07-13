import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import { evaluate, round } from "mathjs";
import recordLastNum from "./recordLastNum";
import changeKeys from "./changeKeys";
import cleanupEquation from "./cleanupEquation";
import handleNestedParens from "./handleNestedParens";

class App extends React.Component {
  state = {
    result: "",
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
            var [originalLastNum, operate] = recordLastNum(
              this.state.result + button.key
            );
            this.setState({
              originalLastNum: originalLastNum,
              operate: operate,
              result: this.state.result + button.key,
            });
          } else {
            this.setState({
              //originalLastNum: button.key,
              originalLastNum: recordLastNum(this.state.result + button.key),
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
          result: changeKeys(this.state.result, button.key),
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

  getLastChar = (from) => {
    return from.slice(-1);
  };

  roundedResult = (expression) => {
    const digitAfterComma = 13;
    round(evaluate(expression), digitAfterComma);
  };

  calculate = () => {
    const { result, operate, originalLastNum } = this.state;

    var [tempResult, finalResult] = cleanupEquation(
      result,
      operate,
      originalLastNum
    );

    handleNestedParens(tempResult);

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
