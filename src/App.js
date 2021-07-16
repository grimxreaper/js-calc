import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import changeKeys from "./changeKeys";
import closeOpenParens from "./closeOpenParens";
import addMultiplier from "./addMultiplier";
import { evaluate, round } from "mathjs";

class App extends React.Component {
  state = {
    result: "",
    lastEquation: "",
  };

  onClick = (button) => {
    const { result, lastEquation } = this.state;

    const pressedEqual = button.key === "=";
    const openParens = button.key === "(";
    const closeParens = button.key === ")";
    const numOrOperator = "+-*/0123456789.".includes(button.key);
    const numOrDecimal = "0123456789.".includes(button.key);
    const pressedAC = button.key === "AC";
    const pressedCE = button.key === "CE";

    const getLastChar = (from) => {
      return from.slice(-1);
    };

    if (numOrDecimal || openParens || closeParens) {
      this.setState({
        result: result + button.key,
      });
    } else if (numOrOperator) {
      this.setState({
        result: changeKeys(result, button.key),
      });
    } else if (pressedEqual) {
      var cleanEquation = result;

      if ("-+*/".includes(getLastChar(result))) {
        cleanEquation = result.slice(0, -1);
      }

      cleanEquation = closeOpenParens(cleanEquation);
      cleanEquation = addMultiplier(cleanEquation);

      let finalResult = 0;
      let nextEquation = cleanEquation;

      if (lastEquation.length > 0) {
        const operatorAndNumRegex = /[-+/*]{0,}[0-9]{1,}[.]{0,1}[0-9]*/g;
        const results = lastEquation.match(operatorAndNumRegex) || [];
        const lastOperatorAndNum = results[results.length - 1];
        const lastOperator = lastOperatorAndNum[0];
        const lastNum = lastOperatorAndNum.substr(1);
        const roundedResult = (expression) => {
          const digitAfterComma = 13;
          return round(evaluate(expression), digitAfterComma);
        };
        if ("+-/*".includes(lastOperator) && !isNaN(lastNum)) {
          try {
            nextEquation = cleanEquation + lastOperator + lastNum;
            finalResult = roundedResult(nextEquation) + "";
          } catch (error) {}
        }
      } else {
        const nonNestedParens = /\(([0123456789/*-+.]*)\)/g;
        var parensEquation = nextEquation.match(nonNestedParens) || [];
        while (parensEquation.length > 0) {
          for (var i = 0; i < parensEquation.length; i++) {
            let expression = parensEquation[i];
            try {
              let tempResult = round(evaluate(expression), 13);
              nextEquation = nextEquation.replace(expression, tempResult);
            } catch (error) {}
          }
          parensEquation = nextEquation.match(nonNestedParens) || [];
        }
        try {
          finalResult = round(evaluate(nextEquation), 13);
        } catch (error) {}
      }

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
