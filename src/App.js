import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import addMultiplierToParensEquations from "./addMultiplierToParensEquations";
import closeLeftOpenParens from "./closeLeftOpenParens";
import pressedAnotherOperator from "./pressedAnotherOperator";
import { evaluate, round } from "mathjs";

class App extends React.Component {
  state = {
    result: "",
    lastFormula: "",
  };

  onClick = (button) => {
    const { result, lastFormula } = this.state;

    const numOrDecimal = button.type === "key";
    const openP = button.key === "(";
    const closedP = button.key === ")";
    const pressedAC = button.key === "AC";
    const pressedCE = button.key === "CE";
    const pressedEqual = button.key === "=";
    const isOperator = "/*-+".includes(button.key);

    if (button.key !== "=") {
      this.setState({
        lastFormula: "",
      });
    }

    const hasLastChar = (char) => {
      return result.substr(-1) === char;
    };

    if (openP || closedP || numOrDecimal || isOperator) {
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

    if (lastFormula !== "" && button.key !== "=") {
      //start new equation
      this.setState({ result: button.key });
    }

    if (pressedEqual) {
      var newTempResult = result;

      if ("/*+-".includes(result[result.length - 1])) {
        //remove trailing operator
        newTempResult = result.slice(0, -1);
      }

      newTempResult = closeLeftOpenParens(newTempResult);
      newTempResult = addMultiplierToParensEquations(newTempResult);

      let finalResult = 0;
      var tempResultString = newTempResult;

      if (lastFormula.length > 0) {
        const operatorAndNumRegex = /[-+/*]{0,}[0-9]{1,}[.]{0,1}[0-9]*/g;
        const results = lastFormula.match(operatorAndNumRegex) || [];
        const lastOperatorAndNum = results[results.length - 1];
        const lastOperator = lastOperatorAndNum[0];
        const lastNum = lastOperatorAndNum.substr(1);
        const roundedResult = (expression) => {
          const digitAfterComma = 13;
          return round(evaluate(expression), digitAfterComma);
        };

        if ("+-/*".includes(lastOperator) && !isNaN(lastNum)) {
          try {
            tempResultString = newTempResult + lastOperator + lastNum;
            finalResult = roundedResult(tempResultString) + "";
          } catch (error) {}
        }
      } else {
        const nonNestedParens = /\(([0123456789/*-+.]*)\)/g;
        var parensEquation = tempResultString.match(nonNestedParens) || [];
        while (parensEquation.length > 0) {
          for (var i = 0; i < parensEquation.length; i++) {
            let expression = parensEquation[i];
            try {
              let tempResult = round(evaluate(expression), 13);
              tempResultString = tempResultString.replace(
                expression,
                tempResult
              );
            } catch (error) {}
          }
          parensEquation = tempResultString.match(nonNestedParens) || [];
        }
        try {
          finalResult = round(evaluate(tempResultString), 13);
        } catch (error) {}
      }
      this.setState({
        result: finalResult + "",
        lastFormula: tempResultString,
      });
    } else if (pressedAC) {
      this.setState({
        result: "",
        lastFormula: "",
      });
    } else if (pressedCE) {
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
