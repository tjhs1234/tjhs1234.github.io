function extraEnd(str){
  let lastTwo = str.substring(str.length - 2, str.length);
  let result = "";
  for (let i = 0; i < 3; i++) {
    result = result + lastTwo;
  }
  return result;
}