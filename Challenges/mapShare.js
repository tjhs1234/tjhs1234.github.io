function mapShare(someMap){
  if (someMap.get("a") !== undefined) {
        someMap.set("b", someMap.get("a"));
  }
  someMap.delete("c");
  return someMap;
}