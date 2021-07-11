const closeLeftOpenParens = (newTempResult) => {
  var numberOfOpenP = (newTempResult.match(/\(/g) || []).length;
  var numberOfCloseP = (newTempResult.match(/\)/g) || []).length;

  while (numberOfOpenP > numberOfCloseP) {
    newTempResult = newTempResult + ")";
    numberOfOpenP--;
  }
  return newTempResult;
};
export default closeLeftOpenParens;