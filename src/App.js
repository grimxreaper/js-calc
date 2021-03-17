import React from "react";
import "./index.css";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ["/", "*", "-", "+", "="];
const ids = {
  7: 'seven', 
  8: 'eight', 
  9: 'nine', 
  4: 'four', 
  5: 'five', 
  6: 'six', 
  1: 'one', 
  2: 'two', 
  3: 'three', 
  0: 'zero',
  '/': 'divide', 
  '*': 'multiply', 
  '-': 'subtract', 
  '+': 'add'
}

class App extends React.Component {
  state = {
    lastPressed: undefined,
    currentNumber: "0",
    calc: undefined,
    operation: undefined
  }

  handleClick = (e) => {
    const { calc, currentNumber } = this.state;
    const { innerText } = e.target; // we get the target which is the button, and the innerText gets what's inside the button!

    switch(innerText) {
      case 'AC' : {
        this.setState({
          currentNumber : '0',
          calc: undefined,
        });
        break;
      }
      case '=': {
        const evaluated = eval(calc);
        this.setState({
          currentNumber: evaluated,
          calc: evaluated
        })
        break;
      }
      default: {
        const e = currentNumber === '0' ? innerText : currentNumber + innerText
        
        if(operations.includes(lastPressed) && operations.includes(innerText)) {
          this.setState({
          calc: calc.slice(0, -1) + innerText,
          lastPressed: innerText,
          currentNumber: currentNumber + innerText,
        })
        }
      }
    }
  }


  render(){
    const { currentNumber, calc, operation } = this.state;
dsfsd
    return (
      <div className="calculator">
       <p style={{position: 'absolute', top: 0}}> {JSON.stringify(this.state)}</p>
        <div id="display" className="display">
          <small>{calc} {operation}</small>
          {currentNumber}
        </div>
        <div className="nums-container">
          <button className="big-h light-grey ac" onClick={this.handleClick} id="clear">
            AC
          </button>
          {nums.map((num) => {
            return (
              <button
                className={`dark-grey ${num === 0 && "big-h"}`}
                onClick={this.handleClick}
                key={num}
                id={ids[num]}
              >
                {num}
              </button>
            );
          })}
          <button className="light-grey" onClick={this.handleClick} id="decimal">
            .
          </button>
        </div>
        <div className="operations-container">
          {operations.map((operation) => {
            return (
              <button
                className="orange"
                key={operation}
                onClick={this.handleClick}
                id={ids[operation]}
              >
                {operation}
              </button>
            );
          })}
        </div>
      </div>
    )
  }
}

export default App;
