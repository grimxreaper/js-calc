import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import {
  atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs';

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
          result: button.key,
        });
      } else {
        if (button.key === "(" || button.key === ")") {
          this.setState({
            result: this.state.result + button.key,
          });
        } else {
          if (button.key === "." || (this.state.originalLastNum+"").includes('.')) {
            this.setState({
              originalLastNum: this.state.originalLastNum + button.key,
              result: this.state.result + button.key,
            });
          } else {
            this.setState({
              originalLastNum: button.key,
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

  changeKeys = (result, button) => {
    // "" + sign = operator
    if (result === "") {
      if ("+-".includes(button)) {
        return button;
      }
      return "";
    }

    if (
      !isNaN(result[result.length - 1]) ||
      result[result.length - 1] === ")"
    ) {
      //right after a number you can add an operator
      return result + button;
    }

    // number + operator + (+ | -)  = number + operator + (+ | -)
    // number + operator + (/ | *)  = number +  (* | /)
    //Right after a number and an operator, we can have + or -
    //Right after a number and an operator, if the operator is / * we replace
    // 7 + 2 -> number + number =OK
    // 7 "+-/*" (+ 2) -> number "operation" + (signed number) -> ok

    if (result.length >= 2) {
      //
      if (!isNaN(result[result.length - 2])) {
        if ("+-/*(".includes(result[result.length - 1])) {
          if ("+-".includes(button)) {
            // + or - are the sign of the number, not the operation
            return result + button;
          }
          return result.slice(0, -1) + button;
        }
      }
    } else {
      // number + operator = number + operator
      if (!isNaN(result[result.length - 1])) {
        //right after a number you can add an operator
        return result + button;
      } else {
        if ("+-".includes(button)) {
          // If open ( just result result + button
          if ("(".includes(button)) {
            return result + button;
          }
          return result.slice(0, -1) + button;
        } else {
          return "";
        }
      }
    }

    // operator + operator -> replace the first operator
    // "" - - -> is not possible
    return "not yet coded";
  };

  calculate = () => {
    const { result, operate, originalLastNum } = this.state;
    let finalResult = 0;

    // Handling double equal
    // If I only have sign + digit(s) + dot + digit(s)
    const regex = /-{0,1}[0123456789]*(\.[0123456789]*){0,1}/g;
    const matches = result.match(regex) || [];
    if (matches.length > 1 && matches[0] === result) {
      //I need to handle the double equal
      if ("+-/*".includes(operate) && !isNaN(originalLastNum)) {
        finalResult = (evaluate(result + operate + originalLastNum) | "") + "";
      }
    } else {
      /*
    let lastKey = result.split(operate);
    if (lastKey[1]) {
      //check if string is not alone
      if ("123456789".includes(lastKey[lastKey.length - 1])) {
      this.setState({ originalLastNum: lastKey[lastKey.length - 1] })
      }
    }
    console.log(lastKey, this.originalLastNum)
*/
      // Handle paraenthesis
      //= 0 -> run the calculation

      // 1 -> run calculation insde (), replace () with result -> run calculation
      //We need to count the number of (
      // +1 ->
      // 2 differents issues
      // no level -> no ( inside ()) -> (2+5)*(5+6) -> order
      // level(nested) -> ( inside () -> 2(*(2+5))*5 -> 3*((2*5)/5)
      //  Rule: First you calculate the () withtout ( or ) inside

      var tempResultString = result;
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
          let tempResult = evaluate(expression);
          //We need to replace the expression by the calculation
          tempResultString = tempResultString.replace(expression, tempResult);
        }
        parenthesisToCalculate = tempResultString.match(reg) || [];
      }
      //In tempResultString we have the last expression withtout any ()

      finalResult = evaluate(tempResultString);
    }

    this.setState({
      done: true,
      //result: (eval(lastKey[0] + operate + originalLastNum) || "") + "",
      result: (finalResult || "") + "",
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
    console.log(this.state);

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
