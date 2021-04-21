import React from "react";
import "./App.css";
import ResultComponent from "./Components/ResultComponent";
import KeyPadComponent from "./Components/KeyPadComponent";
import { evaluate } from "mathjs";

class App extends React.Component {
  state = {
    result: "",
    counter: 0,
    done: false,
    operate: undefined,
    originalLastNum: "",
  };

  onClick = (button) => {
    if (button.type === "key" || button.key === "(" || button.key === ")") {
      if (this.state.done) {
        this.setState({
          done: false,
          originalLastNum: "",
          result: button.key + "",
        });
      } else {
        if (button.key === "(" || button.key === ")") {
          this.setState({
            result: this.state.result + button.key,
          });
        } else {
          if (
            button.key === "." ||
            (this.state.originalLastNum + "").includes(".")
          ) {
            this.setState({
              //originalLastNum: this.state.originalLastNum + button.key,
              originalLastNum: this.recordLastNum(
                this.state.result + button.key
              ),
              result: this.state.result + button.key,
            });
          } else {
            this.setState({
              //originalLastNum: button.key,
              originalLastNum: this.recordLastNum(
                this.state.result + button.key
              ),
              result: this.state.result + button.key,
            });
          }
        }
      }
    } else {
      if (
        button.key !== "CE" &&
        button.key !== "=" &&
        button.key !== "(" &&
        button.key !== "AC" &&
        button.key !== ")"
      ) {
        this.setState({
          operate: button.key,
          //result: this.state.result + button.key,
          result: this.changeKeys(this.state.result, button.key),
        });
      }
    }
    if (button.key === "=") {
      this.calculate();
    } else if (button.key === "AC") {
      this.reset();
    } else if (button.key === "CE") {
      this.backspace();
    }
  };

  recordLastNum = (result) => {
    const regex = /[-+/*]{0,}[0-9]{1,}[.]{0,1}[0-9]*/g;
    let results = result.match(regex) || [];
    if (results.length === 0) {
      return "";
    }

    //We need to take the last one
    let lastNum = results[results.length - 1];
    // console.log();

    // If there is no operator -> we return the value
    if (!"-+/*".includes(lastNum[0])) {
      return lastNum;
    }
    this.setState({
      operate: lastNum[0],
    });
    return lastNum.substr(1);

    /*
    // If there is one sign, we remove itr
    const operatorsCount = (result.match(/[-+/*]/g) || []).length;
    if (operatorsCount === 1) {
      return lastNum.substr(1)
    }
    // If there are two operator (operator+sign) -> we remove the first and keep the sign
    if (operatorsCount === 2) {
      return lastNum.substr(1)
    }
*/
  };

  changeKeys = (result, button) => {
    if (result === "") {
      if ("+-(0123456789".includes(button)) {
        return button;
      }
      if (".".includes(button)) {
        return "0.";
      }
    }
    // After a digit, you can only have
    // - digit
    // - operator
    // - ), only if there are more ( than )
    // .
    if ("0123456789".includes(result[result.length - 1])) {
      const numberOfOpenP = (result.match(/\(/g) || []).length;
      const numberOfCloseP = (result.match(/\)/g) || []).length;
      if (
        "*/-+0123456789.".includes(button) ||
        (button.key === ")" && numberOfOpenP > numberOfCloseP)
      ) {
        console.log('HEREE')
        return result + button;
      } else {
        return result;
      }
    }
    // After a (, you can only have *same as empty expression
    // - Digit
    // - (
    // - sign
    // - ., but we need to add a zero before

    if (result[result.length - 1] === "(") {
      if ("+-(0123456789".includes(button)) {
        return result + button;
      }
      if (".".includes(button)) {
        return result + "0.";
      }
    }

    // After a ), you can only have
    // - operator
    // - ), only if there are more ( than )

    if (result[result.length - 1] === ")") {
      const numberOfOpenP = (result.match(/\(/g) || []).length;
      const numberOfCloseP = (result.match(/\)/g) || []).length;
      if ("/*-+".includes(button)) {
        console.log('entered this first if')
        return result + button;
      }
      if (")".includes(button) && numberOfOpenP > numberOfCloseP) {
        console.log('entered this condition')
        return result + button;

      }
    }

//     if (result[result.length - 1] === ")") {
// //and what is outside the open parens is a number without an operator
// //then store that number in a variable and then multiply that times
// //the tempResult that is a result of the calculation of what is inside the parens

//     }


    //BUG 🪲-> (7 + 2 isn't working

    //QS: will we run into a problem in differentiating an operator from a sign? */
    //For  + / , how do you know it's an operator, or a sign (7--)
    // You need to watch what is before
    // digit, ) -> operator
    // operator, ( -> sign
    // . -> cannot

    // After an operator, you can only have
    // - Digit
    // - sign
    // - (
    // - ., but we need to add a zero before

    if ("0123456789)".includes(result[result.length - 2])) {
      //checking "digit, ) -> operator"
      if ("/*+-".includes(result[result.length - 1])) {
        if ("+-(0123456789".includes(button)) {
          return result + button;
        }
        if (".".includes(button)) {
          return result + "0.";
        }
      }
    }

    // After a sign, you can only have
    // - digit
    // - (
    // - ., but we need to add a zero before

    if ("/*+-(".includes(result[result.length - 2])) {
      if ("-+".includes(result[result.length - 1])) {
        if ("0123456789(".includes(button)) {
          return result + button;
        }
        if (".".includes(button)) {
          return result + "0.";
        }
      }
    }

    //After a dot, you can only have
    // - digit

    if ((result[result.length - 1] || "").includes(".")) {
      console.log(result[result.length - 1]);
      if ("0123456789".includes(button)) {
        return result + button;
      }
    }

    //ATTN -> added rule below myself outside of our tutoring
    //🪲 72.2 + doesn't work FIXED
    if ((result || "").includes(".")) {
      if ("+-*/0123456789".includes(button)) {
        return result + button;
      }
    }

    // 72(7+2 returns "not yet coded"

    // operator + operator -> replace the first operator

    // "" - - -> is not possible
    //return "not yet coded";
    return result;
  };

  getLastChar = (from) => {
    return from.slice(-1);
  };

  calculate = () => {
    const { result, operate, originalLastNum } = this.state;
    let finalResult = 0;
    var tempResult = result;


    // Special case with expression ending with operator, after CE use
    if ("-+*/".includes(this.getLastChar(result))) {
      tempResult = result.slice(0, -1);
    }

    // Handling double equal
    // If I only have sign + digit(s) + dot + digit(s)
    const regex = /-{0,1}[0123456789]*(\.[0123456789]*){0,1}/g;
    const matches = tempResult.match(regex) || [];
    if (matches.length > 1 && matches[0] === tempResult) {
      //I need to handle the double equal
      if ("+-/*".includes(operate) && !isNaN(originalLastNum)) {
        // finalResult = evaluate(result + operate + originalLastNum) + "";
        try {
          finalResult = evaluate(tempResult + operate + originalLastNum) + "";
        } catch (error) {
          //throw error
        }
      }
    } else {
      var tempResultString = tempResult;
      //We need to detect the non nested parenthesis
      //Open ( and no other ( before the next close
      // '(' 0123456789-+*/.(not (, not ) ) ')'
      // ( + any number of the 15 chars + ) : (7+2) (-3.25478/+6.587)
      const reg = /\(([0123456789/*-+.]*)\)/g;
      var parenthesisToCalculate = tempResultString.match(reg) || [];
      while (parenthesisToCalculate.length > 0) {
        for (var i = 0; i < parenthesisToCalculate.length; i++) {
          //we extract the first expression ex:  (2+5)
          let expression = parenthesisToCalculate[i];
          //We calculate the value ex: 7
      
          let multiplier = tempResultString.toString().replace(expression, ""); //take out expression
          console.log('multiplier:', multiplier)
          try {
            let tempResult = evaluate(expression);

            console.log('tempResultString:', tempResultString)
            console.log('tempResult', tempResult) //8
            console.log('expression', expression) //(4+4)
            console.log('result', result) //2(4+4)

            if (multiplier) {
              console.log('inside of this multiplier if block')
              tempResultString = multiplier * tempResult
              
              this.setState({
                done: true,
                result: tempResultString + ""
              })
            }
         
            
            //commenting out lines below to try solution
            //We need to replace the expression by the calculation
            // tempResultString = tempResultString.replace(expression, tempResult);
            

            //but this is fine, it is only replace (4+4) with 8 which is what we want
            //but it seems to also be affixing the 2 to tempResult, but where is that happening?

            console.log('tempResultString:', tempResultString) //28
          } catch (error) {
            //throw error
          }
        }
        //commenting out lines below to try solution
        // parenthesisToCalculate = tempResultString.match(reg) || [];
        // console.log('parenthesisToCalculate', parenthesisToCalculate)
      }
      //In tempResultString we have the last expression withtout any ()

      try {
        finalResult = evaluate(tempResultString);
      } catch (error) {
        //throw error
      }
    }

    this.setState({
      done: true,
      result: finalResult + "",
    });
  };

  reset = () => {
    this.setState({
      result: "",
      operate: "",
      done: false,
      originalLastNum: "",
    });
  };

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1),
    });
  };

  render() {
    // console.log(this.state);

    return (
      <div className="container">
        <h1>Pocket Js Calculator</h1>
        <div className="calculator-body">
          <ResultComponent result={this.state.result} />
          <KeyPadComponent onClick={this.onClick} />
        </div>
      </div>
    );
  }
}
export default App;
