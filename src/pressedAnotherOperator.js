const setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  };

  const pressedAnotherOperator = (result, button) => {
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
};
export default pressedAnotherOperator;
