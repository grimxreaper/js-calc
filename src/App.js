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
      this.backspace() //not sure why this is returning "not a function"
    }
    else {
      this.setState({
        result: this.state.result + button //this sets the button to the character it is
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
      // console.log(checkResult)
      this.setState({
        result: (eval(checkResult) || "" ) + "" //why do we need the "+ "" " here?
        // || If expr1 can be converted to true, returns expr1; else, returns expr2.
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
                <h1>Js Calculator</h1>
                <ResultComponent result={this.state.result}/>
                <KeyPadComponent onClick={this.onClick}/>
            </div>
        </div>
    );
}
}


export default App;