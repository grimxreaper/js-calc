import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";

class App extends React.Component {
  state = {
    result: "",
    counter: 0,
    done: false,
    operate: undefined,
    originalLastNum: undefined,
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
          this.setState({
            originalLastNum: button.key,
            result: this.state.result + button.key,
          });
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
    let lastKey = result.split(operate);
    if (lastKey[1]) {
      //check if string is not alone
      if ("123456789".includes(lastKey[lastKey.length - 1])) {
      this.setState({ originalLastNum: lastKey[lastKey.length - 1] })
      }
    }
    console.log(lastKey, this.originalLastNum)

    // Handle paraenthesis
    //= 0 -> run the calculation
    if (!result.includes("(")) {
      this.setState({
        done: true,
        //result: (eval(lastKey[0] + operate + originalLastNum) || "") + "",
        result: (eval(result) || "") + "",
      });
    }

    // 1 -> run calculation insde (), replace () with result -> run calculation
    //We need to count the number of (
    let countParenthesis = (result.match(/\(/g)||[]).length
    
    if (countParenthesis === 1) {
      //We need to run the calculation inside first
      let start = result.indexOf("(");
      console.log("start="+start)
      let end = result.indexOf(")");
      console.log("end="+end)
      let firstCalculation = result.substr(start+1, end-start-1);
      console.log(firstCalculation);
      let firstResult = eval(firstCalculation);
      console.log(firstResult);
      let tempResult = result.substr(0,start) + firstResult + result.substr(end+1);
      console.log(tempResult);
      this.setState({
        done: true,
        //result: (eval(lastKey[0] + operate + originalLastNum) || "") + "",
        result: (eval(tempResult) || "") + "",
      });

    }

    // +1 -> 
 
    this.setState({
      done: true,
      //result: (eval(lastKey[0] + operate + originalLastNum) || "") + "",
      result: (eval(result) || "") + "",
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
