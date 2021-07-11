import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import updateDisplay from "./updateDisplay";
import runEquation from "./runEquation";

class App extends React.Component {
  state = {
    result: "",
    lastEquation: "",
  };

  onClick = (button) => {
    const { result, lastEquation } = this.state;
    let nextResult, nextEquation;

    if (button.isDisplayable) {
      nextResult = updateDisplay(result, button.key, lastEquation);
      nextEquation = "";
    } else if (button.key === "=") {
      [nextEquation, nextResult] = runEquation(result, lastEquation);
    } else if (button.key === "AC") {
      nextEquation = "";
      nextResult = "";
    } else if (button.key === "CE") {
      nextResult = result.slice(0, -1);
    }
  
    this.setState({
      result: nextResult,
      lastEquation: nextEquation,
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
