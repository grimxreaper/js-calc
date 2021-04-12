import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";

const operationKeys = ["/", "*", "-", "+"];
const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

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
      this.setState({ originalLastNum: button.key });
    } else {
      if (
        button.key !== "CE" &&
        button.key !== "=" &&
        button.key !== "(" &&
        button.key !== "AC" &&
        button.key !== ")"
      ) {
        this.setState({ operate: button.key });
      }
    }
    if (button.key === "=") {
      this.calculate();
    } else if (button.key === "AC") {
      this.reset();
    } else if (button.key === "CE") {
      this.backspace();
    } else {
      // this.setState({
      //   result: this.state.result + button.key,
      //   originalLastNum: button.key,
      // });
    }
  };

  calculate = () => {
    const { result, done, operate, originalLastNum } = this.state;
    let lastKey = result.split(operate);
    if (lastKey[1]) { //check if string is not alone
    this.setState({ originalLastNum: lastKey[lastKey.length -1] });
    }
    // console.log("🚀 ~ file: App.js ~ line 55 ~ App ~ originalLastNum", originalLastNum)
    // console.log("🚀 ~ file: App.js ~ line 55 ~ App ~ result", result)
    // console.log("🚀 ~ file: App.js ~ line 55 ~ App ~ operate", operate)
    // if (done) {
    //   let resultPrev = result + operate + originalLastNum;
    //   let checkResult = (eval(resultPrev) || "") + "";
    //   this.setState({ result: checkResult });
    // } else {
      // let currentResult = "";
      // if (result === "--") {
      //   console.log("🚀 ~ file: App.js ~ line 62 ~ App ~ result", result)
      //   currentResult = result.replace("--", "+");
      // } else {
      //   currentResult = result;
      // }
      this.setState({
        // done: true,
        result: (eval(result + operate + originalLastNum) || "") + "",
      });
    // }
  };

  reset = () => {
    this.setState({
      result: "",
      done: false,
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
