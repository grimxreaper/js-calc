import React from 'react';
import './App.css';
import ResultComponent from './Components/ResultComponent';
import KeyPadComponent from "./Components/KeyPadComponent";

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      result : "",
      counter : 0
    }
  }
  onClick = (button) => {
    if (button === '='){
      this.setState ({
        counter: this.state.counter + 1
      })
      console.log(this.state.counter)
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
    let product = ""

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

      // else {
      //   const newEquation = currentResult

      //   this.setState({
      //     result: (eval)
      //   })
      // }

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