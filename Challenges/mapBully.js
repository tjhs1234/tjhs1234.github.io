function mapBully(someMap){
  let newMap = new Map();
  if (someMap.get("a") !== undefined){
    someMap.set("b", someMap.get("a"));
    someMap.set("a", "");
  }
  return someMap;
}