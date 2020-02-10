function without2(str){
  if (str.substring(0,2) === str.substring(str.length - 2, str.length) && str.length !== 1) {
    return str.substring(2, str.length);
  }
  return str;
}