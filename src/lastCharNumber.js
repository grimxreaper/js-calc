const lastCharNumber = (result, button) => {
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
export default lastCharNumber;