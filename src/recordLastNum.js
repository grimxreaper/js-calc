const recordLastNum = (result) => {
  const regex = /[-+/*]{0,}[0-9]{1,}[.]{0,1}[0-9]*/g;
  let results = result.match(regex) || [];
  if (results.length === 0) {
    return "";
  }
  //We need to take the last one
  let lastNum = results[results.length - 1];
  // If there is no operator -> we return the value
  if (!"-+/*".includes(lastNum[0])) {
    return lastNum;
  }
  let originalLastNum = lastNum.substr(1);
  let operate = lastNum[0];

  return [originalLastNum, operate];
};
export default recordLastNum;
