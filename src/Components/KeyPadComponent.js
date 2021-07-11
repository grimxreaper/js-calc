import React from "react";
import keypads from "./keypads";

class KeyPadComponent extends React.Component {
  render() {
    return (
      <div className="button">
        {keypads.map((keypad) => {
          return (
            <button
              className="keypad"
              key={keypad.key}
              name={keypad.key}
              data-testid={keypad.key}
              onClick={(e) => this.props.onClick(keypad)}
            >
              {keypad.key}
            </button>
          );
        })}
      </div>
    );
  }
}

export default KeyPadComponent;
