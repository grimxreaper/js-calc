const closeOpenParens = (result) => {
  var numberOfOpenP = ((result + "").match(/\(/g) || []).length;
  var numberOfCloseP = ((result + "").match(/\)/g) || []).length;

  while (numberOfOpenP > numberOfCloseP) {
    result = result + ")";
    numberOfOpenP--;
  }
  return result;
};
export default closeOpenParens;
