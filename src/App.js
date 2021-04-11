import React from 'react';
import './App.css';
import ResultComponent from './Components/ResultComponent';
import KeyPadComponent from "./Components/KeyPadComponent";

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      result : "",
      counter : 0,
      operation: "",
    }
  }
  
  onClick = (button) => {
    if (button === '='){
      this.setState ({
        counter: this.state.counter + 1
      })
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
    let currentResult = "";
    let product = "";
    let originalLastEqNum = "";

    if (this.state.result === '--') {
      currentResult = this.state.result.replace('--', '+')
    }
    else {
      currentResult = this.state.result
    }

    try {
      if (this.state.counter === 0) {
        product = (eval(currentResult) || "") + ""
        this.setState({
          result: product
        })
      }

      else {
        product = this.state.result + this.state.operation + originalLastEqNum
        this.setState({
          result: product
        })
      }
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
      <div className="container" >
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