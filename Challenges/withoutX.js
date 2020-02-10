function withoutX(str){
  if (str === "x") return "";
  else if (str.startsWith("x") && str.endsWith("x")) return str.substring(1, str.length - 1);
  else if (str.startsWith("x") && !str.endsWith("x")) return str.substring(1, str.length);
  else if (!str.startsWith("x") && str.endsWith("x")) return str.substring(0, str.length - 1);
  return str;
}