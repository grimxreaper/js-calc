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

    if (button.isDisplayable) {
      var nextResult = updateDisplay(result, button.key, lastEquation);

      this.setState({
        result: nextResult,
        lastEquation: "",
      });
    }

    if (button.key === "=") {
      var [nextEquation, finalResult] = runEquation(result, lastEquation);

      this.setState({
        result: finalResult + "",
        lastEquation: nextEquation,
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
