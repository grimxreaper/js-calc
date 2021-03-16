import React from "react";
import "./index.css";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ["/", "*", "-", "+", "="];

class App extends React.Component {
  state = {
    currentNumber: "0",
    calc: undefined,
    operation: undefined
  };

  handleClick = (e) => {
    const { currentNumber, calc, operation } = this.state;
    const { innerText } = e.target; // we get the target which is the button, and the innerText gets what's inside the button!

    if (!Number.isNaN(Number(innerText))) {
      if (currentNumber === "0") {
        this.setState({
          currentNumber: innerText,
        });
      } else {
        this.setState({
          currentNumber: currentNumber + innerText,
        });
      }
      return;
    }
    switch(innerText) {
      case 'AC' : {
        this.setState({
          currentNumber : '0',
          calc: undefined,
          operation: undefined
        });
        break;
      }
      case '.' : {
        if (!currentNumber.includes('.'))
          this.setState({
            currentNumber: currentNumber + innerText
          });
          break;
      }
      default: {
        if (!operation) {
          this.setState({
            operation: innerText,
            calc: currentNumber,
            currentNumber: '0'
          });
        }
        else if  (innerText === '=') {
          const evaluated = eval(`${calc} ${operation} ${currentNumber}`)
          this.setState({
            operation: innerText,
            calc: evaluated,
            currentNumber: evaluated
          });
        }
        else {
          this.setState({
            operation: innerText
          }) 
        }
      }
    }
  }



  render() {
    const { currentNumber, calc } = this.state;

    return (
      <div className="calculator">
       <p style={{position: 'absolute', top: 0}}> {JSON.stringify(this.state)}</p>
        <div id="display" className="display">
          <small>{calc}</small>
          {currentNumber}
        </div>
        <div className="nums-container">
          <button className="big-h light-grey ac" onClick={this.handleClick}>
            AC
          </button>
          {nums.map((num) => {
            return (
              <button
                className={`dark-grey ${num === 0 && "big-h"}`}
                onClick={this.handleClick}
                key={num}
              >
                {num}
              </button>
            );
          })}
          <button className="light-grey" onClick={this.handleClick}>
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
