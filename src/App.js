import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import isDisplayable from "./isDisplayable";
import updateDisplay from "./updateDisplay";
import runEquation from "./runEquation";

class App extends React.Component {
  state = {
    result: "",
    lastEquation: "",
  };

  onClick = (button) => {
    const { result, lastEquation } = this.state;

    const hasLastChar = (char) => {
      return result.substr(-1) === char;
    };

    if (isDisplayable(button.key)) {
      var [tempResult, currentBtn] = updateDisplay(
        result,
        button.key,
        hasLastChar,
        lastEquation
      );

      this.setState({
        result: tempResult + currentBtn,
        lastEquation: "",
      });
    }

    if (button.key === "=") {
      var finalValues = runEquation(result, lastEquation);

      this.setState({
        result: finalValues[1] + "",
        lastEquation: finalValues[0],
      });
    } else if (button.key === "AC") {
      this.setState({
        result: "",
        lastEquation: "",
      });
    } else if (button.key === "CE") {
      this.setState({
        result: result.slice(0, -1),
      });
    }
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
