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
    if (button === '='){
      this.calculate()
    }
    else if (button === 'AC'){
      this.reset()
    }
    else if (button === 'CE'){
      this.backspace()
    }
    else {
      this.setState({
        result: this.state.result + button
      })
    }
  }

  calculate = () => {
    let currentResult = ""

    if (this.state.result === '--') {
      currentResult = this.state.result.replace('--', '+')
    }
    else {
      currentResult = this.state.result
    }
    try {
      this.setState({
        result: (eval(currentResult) || "") + ""
      })
    }
    catch (e){
      this.setState({
        result: "error"
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

  render(){
    return (
      <div >
        <h1>Pocket Js Calculator</h1>
        <div className="calculator-body">
          <ResultComponent result = {this.state.result}/>
          <KeyPadComponent onClick = {this.onClick}/>
        </div>
      </div>
    )
  }

}
export default App;