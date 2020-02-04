function makeOutWord(out,word){
  let firstHalf = out.substring(0, out.length / 2);
  let lastHalf = out.substring(out.length / 2, out.length);
  return firstHalf + word + lastHalf;
}