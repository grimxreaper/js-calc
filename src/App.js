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
      this.state.result.replace('--', '+')
    }
    else {
      currentResult = this.state.result
    }
    try {
      this.setState({
        result: (eval(currentResult) || "") + ""
      })
    }
    catch {
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
      <div>
        <div className="calculator-body">
          <KeyPadComponent {onClick = this.onClick}/>
          <ResultComponent {result = this.result}/>
        </div>
      </div>
    )
  }

}