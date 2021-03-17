import React, { Component } from 'react';
import './App.css';
import ResultComponent from './Components/ResultComponent';
import KeyPadComponent from "./Components/KeyPadComponent";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      result: ""
    }
  }

  onClick = button => {
    if (button === '='){
      this.calculate()
    }
    else if (button === "AC"){
      this.reset()
    }
    else if(button === "CE"){
      this.backspace()
    }
    else {
      this.setState({
        result: this.state.result + button
      })
    }
  }


  calculate = () => {
    let checkResult = ""
    if (this.state.result.includes('--')) {
      checkResult = this.state.result.replace('--', '+')
    }
    else {
      checkResult = this.state.result
    }
    try {
      this.setState({
        result: (eval(checkResult) || "" ) + ""
      })
  } catch (e) {
      this.setState({
        result: "error"
      })

    }
  }

  reset = () => {
    this.setState({
      result : ""
    })
  };


  render() {
    return (
        <div>
            <div className="calculator-body">
                <h1>Simple Calculator</h1>
                <ResultComponent result={this.state.result}/>
                <KeyPadComponent onClick={this.onClick}/>
            </div>
        </div>
    );
}
}


export default App;