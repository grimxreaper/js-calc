import React from 'react';
import './App.css';
import ResultComponent from './Components/ResultComponent';
import KeyPadComponent from "./Components/KeyPadComponent";

const operationKeys = ["/", "*", "-", "+"];
const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      result : "",
      counter : 0,
      operation : undefined,
      originalLastNum : undefined,
    }
  }


  
  
  onClick = (button) => {
    if (button === '='){
      this.setState ({
        counter: this.state.counter + 1
        //originalLastNum: this.state.result 4 + 4
        //4 + 4 
        //slice to take out any keypads that are not an operation take what's left and set it as operation
        //4 + 44 + 4444
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
        result: this.state.result + button,
        originalLastNum: button
      })

      console.log('here is the originalLastNum:', this.state.originalLastNum)
    }
  }

  calculate = () => {
    let currentResult = "";
    let product = "";

    if (this.state.result === '--') {
      currentResult = this.state.result.replace('--', '+')
    }
    else {
      currentResult = this.state.result
    }

    try {
      // if (this.state.counter === 0) {
        product = (eval(currentResult) || "") + ""
        this.setState({
          result: product
        })
    

      // else {
      //   product = this.state.result + this.state.operation + originalLastEqNum
      //1.find a way to store all three of those
      //   this.setState({
      //     result: product
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