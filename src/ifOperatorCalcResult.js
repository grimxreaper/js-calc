const ifOperatorCalcResult = (button, result) => {
  let keyPressed = button;

  if ("(".includes(keyPressed)) {
    if (result.length > 1) {
      if ("0123456789".includes(result[result.length - 1])) {
        result = result + keyPressed.replace("(", "*(");
      }
    }
  } else if (result === "") {
    if ("+-(0123456789".includes(keyPressed)) {
      result = keyPressed;
    }
    if ("/*".includes(keyPressed)) {
      result = "0" + keyPressed;
    }
    if (".".includes(keyPressed)) {
      result = "0.";
    }
  } else if ("0123456789".includes(result[result.length - 1])) {
    const numberOfOpenP = (result.match(/\(/g) || []).length;
    const numberOfCloseP = (result.match(/\)/g) || []).length;
    if (
      "*/-+0123456789.".includes(keyPressed) ||
      (keyPressed.key === ")" && numberOfOpenP > numberOfCloseP)
    ) {
      result = result + keyPressed;
    }
  } else if (result[result.length - 1] === "(") {
    if ("+-(0123456789".includes(keyPressed)) {
      result = result + keyPressed;
    }
    if (".".includes(keyPressed)) {
      result = result + "0.";
    }
  } else if (result[result.length - 1] === ")") {
    const numberOfOpenP = (result.match(/\(/g) || []).length;
    const numberOfCloseP = (result.match(/\)/g) || []).length;
    if ("/*-+".includes(keyPressed)) {
      result = result + keyPressed;
    }
    if (")".includes(keyPressed) && numberOfOpenP > numberOfCloseP) {
      result = result + keyPressed;
    }
  } else if ("0123456789)".includes(result[result.length - 2])) {
    if ("/*+-".includes(result[result.length - 1])) {
      if ("(0123456789".includes(keyPressed)) {
        result = result + keyPressed;
      }
      if (".".includes(keyPressed)) {
        result = result + "0.";
      }
      if ("+".includes(keyPressed) && result[result.length - 1] === "-") {
        result =
          result.substring(0, result.length - 1) +
          "+" +
          result.substring(result.length - 1 + 1);
      }
      if ("-".includes(keyPressed) && result[result.length - 1] === "+") {
        result =
          result.substring(0, result.length - 1) +
          "-" +
          result.substring(result.length - 1 + 1);
      }
      if ("/".includes(keyPressed) && result[result.length - 1] === "-") {
        result =
          result.substring(0, result.length - 1) +
          "/" +
          result.substring(result.length - 1 + 1);
      }
      if ("/".includes(keyPressed) && result[result.length - 1] === "+") {
        result =
          result.substring(0, result.length - 1) +
          "/" +
          result.substring(result.length - 1 + 1);
      }
      if ("*".includes(keyPressed) && result[result.length - 1] === "-") {
        result =
          result.substring(0, result.length - 1) +
          "*" +
          result.substring(result.length - 1 + 1);
      }
      if ("*".includes(keyPressed) && result[result.length - 1] === "+") {
        result =
          result.substring(0, result.length - 1) +
          "*" +
          result.substring(result.length - 1 + 1);
      }
    }
  } else if ("/*+-(".includes(result[result.length - 2])) {
    if ("-+".includes(result[result.length - 1])) {
      if ("0123456789(".includes(keyPressed)) {
        result = result + keyPressed;
      }
      if (".".includes(keyPressed)) {
        result = result + "0.";
      }
    }
  } else if ((result[result.length - 1] || "").includes(".")) {
    if ("0123456789".includes(keyPressed)) {
      result = result + keyPressed;
    }
  } else if ((result || "").includes(".")) {
    if ("+-*/0123456789".includes(keyPressed)) {
      result = result + keyPressed;
    }
  }
  return [keyPressed, result];
};

export default ifOperatorCalcResult;
