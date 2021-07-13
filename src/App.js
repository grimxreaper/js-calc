import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
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
    const pressedEqual = button.key === "=";
    const openParens = button.key === "(";
    const closeParens = button.key === ")";
    const pressedDecimal = button.key === ".";
    const numOrOperator = "+-*/0123456789.".includes(button.key);
    const numOrDecimal = "0123456789.".includes(button.key);
    const pressedAC = button.key === "AC";
    const pressedCE = button.key === "CE";

    if (numOrDecimal || openParens || closeParens) {
      if (this.state.done) {
        this.setState({
          done: false,
          originalLastNum: "",
          result: button.key + "",
        });
      } else {
        if (openParens || closeParens) {
          this.setState({
            result: this.state.result + button.key,
          });
        } else {
          if (
            pressedDecimal ||
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
      if (numOrOperator) {
        this.setState({
          operate: button.key,
          //result: this.state.result + button.key,
          result: changeKeys(this.state.result, button.key),
        });
      }
    }
    if (pressedEqual) {
      this.calculate();
    } else if (pressedAC) {
      this.reset();
    } else if (pressedCE) {
      this.backspace();
    }
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
