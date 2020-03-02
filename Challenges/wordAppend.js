function wordAppend(wordArray){
  let someMap = new Map();
  let returnString = "";
  for (let i = 0; i < wordArray.length; i++) {
    let cur = wordArray[i];
    if (someMap.has(cur)){
      someMap.set(cur, someMap.get(cur) + 1);
      if (someMap.get(cur) % 2 === 0){
        returnString += cur;
      }
    }
    else {
      someMap.set(cur, 1);
    }
  }
  return returnString;
}