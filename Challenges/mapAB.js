function mapAB(someMap){
  if (someMap.has("a") && someMap.has("b")) {
    someMap.set("ab", someMap.get("a") + someMap.get("b"));
  }
  return someMap;
}