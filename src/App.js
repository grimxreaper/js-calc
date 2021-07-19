import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import closeOpenParens from "./closeOpenParens";
import addMultiplier from "./addMultiplier";
import runEquation from "./runEquation";
import updateDisplay from "./updateDisplay";

class App extends React.Component {
  state = {
    result: "",
    lastEquation: "",
  };

  onClick = (button) => {
    const { result, lastEquation } = this.state;

    const pressedEqual = button.key === "=";
    const pressedAC = button.key === "AC";
    const pressedCE = button.key === "CE";

    const getLastChar = (from) => {
      return from.slice(-1);
    };

    if (button.isDisplayable) {
      const nextResult = updateDisplay(result, button.key, lastEquation);
      this.setState({
        result: nextResult + button.key,
      });
    } else if (pressedEqual) {
      var cleanEquation = result;

      if ("-+*/".includes(getLastChar(result))) {
        cleanEquation = result.slice(0, -1);
      }

      cleanEquation = closeOpenParens(cleanEquation);
      cleanEquation = addMultiplier(cleanEquation);

      let [finalResult, nextEquation] = runEquation(
        lastEquation,
        cleanEquation
      );

      this.setState({
        result: finalResult + "",
        lastEquation: nextEquation,
      });
    } else if (pressedAC) {
      this.reset();
    } else if (pressedCE) {
      this.backspace();
    }
  };

  reset = () => {
    this.setState({
      result: "",
      lastEquation: "",
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
