const changeKeys = (result, button) => {
  const setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  };

  if ("(".includes(button)) {
    if (result.length > 1) {
      //these few lines below, did not work to fix another bug

      if ("0123456789".includes(result[result.length - 1])) {
        //remove the previous number and return the last number
        return result + button.replace("(", "*(");
      }
    }
  }
  if (result === "") {
    if ("+-(0123456789".includes(button)) {
      return button;
    }
    if (".".includes(button)) {
      return "0.";
    }
  }
  if ("0123456789".includes(result[result.length - 1])) {
    const numberOfOpenP = (result.match(/\(/g) || []).length;
    const numberOfCloseP = (result.match(/\)/g) || []).length;
    if (
      "*/-+0123456789.".includes(button) ||
      (button.key === ")" && numberOfOpenP > numberOfCloseP)
    ) {
      return result + button;
    } else {
      return result;
    }
  }
  if (result[result.length - 1] === "(") {
    if ("+-(0123456789".includes(button)) {
      return result + button;
    }
    if (".".includes(button)) {
      return result + "0.";
    }
  }
  if (result[result.length - 1] === ")") {
    const numberOfOpenP = (result.match(/\(/g) || []).length;
    const numberOfCloseP = (result.match(/\)/g) || []).length;
    if ("/*-+".includes(button)) {
      return result + button;
    }
    if (")".includes(button) && numberOfOpenP > numberOfCloseP) {
      return result + button;
    }
  }

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
      if ("/".includes(button) && result[result.length - 1] === "-") {
        return setCharAt(result, result.length - 1, "/");
      }
      if ("/".includes(button) && result[result.length - 1] === "+") {
        return setCharAt(result, result.length - 1, "/");
      }
      if ("*".includes(button) && result[result.length - 1] === "-") {
        return setCharAt(result, result.length - 1, "*");
      }
      if ("*".includes(button) && result[result.length - 1] === "+") {
        return setCharAt(result, result.length - 1, "*");
      }
    }
  }
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
  if ((result[result.length - 1] || "").includes(".")) {
    if ("0123456789".includes(button)) {
      return result + button;
    }
  }

  //🪲 72.2 + doesn't work FIXED
  if ((result || "").includes(".")) {
    if ("+-*/0123456789".includes(button)) {
      return result + button;
    }
  }

  // 🪲 72(7+2 returns "not yet coded"

  // operator + operator -> replace the first operator

  // "" - - -> is not possible
  //return "not yet coded";

  return result;
};
export default changeKeys;
