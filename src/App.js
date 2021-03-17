import React, { Component } from 'react';
import './App.css';
import ResultComponent from './Components/ResultComponent';
import KeyPadComponent from "./Components/KeyPadComponent";

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      result : ""
    }
  }

  onClick = (button) => {
    if (button === '=') {
      this.calculate()
    }
    else if (button === 'AC'){
      this.reset()
    }
    else if (button === 'CE'){
      this.backspace()
    }
  }


  calculate = () => {
    let currentResult = this.state.result;
    if (this.state.result === '--'){
      this.state.result.replace('--', '+')
    }
    else {
      currentResult = this.state.result
    }
    try {
      this.setState({
        result : (eval(currentResult) || "") + ""
      })
    }
    catch (e) {
      this.setState({
        result: 'error'
      })
    }
  }

  reset = () => {
    this.setState({
      result: ""
    })
  }

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1)
    })
  }

  render() {
    return (
      <div className="calculator-body">
        <h1>JS CALC</h1>
        <KeyPadComponent result={this.state.result}/>
        <ResultComponent onClick={this.onClick}/>

      </div>
    )
  }
}
export default App;