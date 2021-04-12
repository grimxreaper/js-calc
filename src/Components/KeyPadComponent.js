import React from "react";

const keypads = ["(", "CE", ")", "AC", "/", "*", "-", "+", 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, "=", "."]
const operationKeys = ["/", "*", "-", "+"];
const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];



class KeyPadComponent extends React.Component {


    render() {
        return (
            <div className="button">
                {keypads.map((keypad) => {
                    return (
                        <button
                        className="keypad"
                        key={keypad}
                        name={keypad}
                        data-testid={keypad}
                        onClick={e => this.props.onClick(e.target.name)}
                        >
                            {keypad}
                        </button>
                    )

                })}

                {/* <button className="keypad" name="(" onClick={e => this.props.onClick(e.target.name)}>(</button>
                <button className="keypad" name="CE" onClick={e => this.props.onClick(e.target.name)}>CE</button>
                <button name=")" onClick={e => this.props.onClick(e.target.name)}>)</button>
                <button  name="AC" onClick={e => this.props.onClick(e.target.name)}>AC</button><br/>


                <button name="1" onClick={e => this.props.onClick(e.target.name)}>1</button>
                <button name="2" onClick={e => this.props.onClick(e.target.name)}>2</button>
                <button name="3" onClick={e => this.props.onClick(e.target.name)}>3</button>
                <button name="+" onClick={e => this.props.onClick(e.target.name)}>+</button><br/>


                <button name="4" onClick={e => this.props.onClick(e.target.name)}>4</button>
                <button name="5" onClick={e => this.props.onClick(e.target.name)}>5</button>
                <button name="6" onClick={e => this.props.onClick(e.target.name)}>6</button>
                <button name="-" onClick={e => this.props.onClick(e.target.name)}>-</button><br/>

                <button name="7" onClick={e => this.props.onClick(e.target.name)}>7</button>
                <button name="8" onClick={e => this.props.onClick(e.target.name)}>8</button>
                <button name="9" onClick={e => this.props.onClick(e.target.name)}>9</button>
                <button name="*" onClick={e => this.props.onClick(e.target.name)}>x</button><br/>


                <button name="." onClick={e => this.props.onClick(e.target.name)}>.</button>
                <button name="0" onClick={e => this.props.onClick(e.target.name)}>0</button>
                <button name="=" onClick={e => this.props.onClick(e.target.name)}>=</button>
                <button name="/" onClick={e => this.props.onClick(e.target.name)}>÷</button><br/> */}
            </div>
        );
    }

}


export default KeyPadComponent;