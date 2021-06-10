import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import pressedAnotherOperator from "./pressedAnotherOperator";
import runEquation from "./runEquation";
import isDisplayable from "./isDisplayable";
import cleanupEquation from "./cleanupEquation";
import repeatLastEquation from "./repeatLastEquation";

class App extends React.Component {
  state = {
    result: "",
    lastEquation: "",
  };

  onClick = (button) => {
    const { result, lastEquation } = this.state;

    if (button.key !== "=") {
      this.setState({
        lastEquation: "",
      });
    }

    const hasLastChar = (char) => {
      return result.substr(-1) === char;
    };

    if (isDisplayable(button.key)) {
      var tempResult = result;
      var currentBtn = button.key;

      if (pressedAnotherOperator(button.key, hasLastChar)) {
        tempResult = tempResult.slice(0, -1); //remove last character
      }

      if (button.key === "-" && hasLastChar("-")) {
        currentBtn = ""; //no double negatives allowed
      }

      if ((button.key === "*" || button.key === "/") && result === "") {
        tempResult = 0; //insert zero in front of multiply or divide
      }

      this.setState({
        result: tempResult + currentBtn,
      });
    }

    if (lastEquation !== "" && button.key !== "=") {
      //start new equation
      this.setState({ result: "" + button.key });
    }

    if (button.key === "=") {
      var nextEquation = cleanupEquation(result, lastEquation);

      if (lastEquation.length > 0) {
        nextEquation = repeatLastEquation(lastEquation, nextEquation);
      }

      let finalResult = 0;
      [nextEquation, finalResult] = runEquation(nextEquation);

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
