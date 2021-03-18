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

  }

  calculate = () => {
    let currentResult = ""

    if (this.state.result === '--') {
      this.state.result.replace('--', '+')
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