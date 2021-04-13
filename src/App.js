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
    if (button.type === "key") {
      if (this.state.done) {
        this.setState({
          done: false,
          originalLastNum: "",
          result: button.key,
        });
      } else {
        this.setState({
          originalLastNum: button.key,
          result: this.state.result + button.key,
        });
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
          // result: this.state.result + button.key,
          result: this.changeKeys(this.state.result, button.key)
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


  
  // number + operator + (+ | -)  = number + operator + (+ | -)
  // number + operator + (/ | *)  = number +  (* | /)
  // operator + operator -> replace the first operator
  changeKeys = (result, button) => {
    
    // "" + operator = operator
    if (result === "") {
      return button
    }

    // number + operator = number + operator
    if (!isNaN(result[result.length - 1])) { //right after a number you can add an operator
      return result + button
    }

    // number + operator + (+ | -)  = number + operator + (+ | -)
    //Right after a number and an operator, we can have + or -
    if (result.length >= 2) {
      // 
      if (!isNaN(result[result.length - 2])) {
        if ("+-/*".includes(result[result.length - 1])) {
          if ("+-".includes(button)) {
            return result + button
          }
          return result.slice(0, -1)
        }

      }
    }
    

    return "not yet coded";
  }



  calculate = () => {
    const { result, operate, originalLastNum } = this.state;
    let lastKey = result.split(operate);
    if (lastKey[1]) { //check if string is not alone
      this.setState({ originalLastNum: lastKey[lastKey.length - 1] });
    }
    this.setState({
      done: true,
      result: (eval(lastKey[0] + operate + originalLastNum) || "") + "",
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
