const closeOpenParens = (result) => {
  var numberOfOpenP = (result.match(/\(/g) || []).length;
  var numberOfCloseP = (result.match(/\)/g) || []).length;
  //this solution works but only if there is one parenthesis missing,
  //instead, account for all parens missing

  while (numberOfOpenP > numberOfCloseP) {
    result = result + ")";
    numberOfOpenP--;
  }
  return result;
};
export default closeOpenParens;
