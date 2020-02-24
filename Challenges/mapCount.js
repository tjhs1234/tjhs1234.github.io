function mapCount(someMap){
  let value = 0;
  if (someMap.has("a")) {
      value++;
  }
  if (someMap.has("b")) {
      value++;
  }
  if (someMap.has("c")) {
      value++;
  }
  return value;
}