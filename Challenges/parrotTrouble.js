function parrotTrouble(talking,hour){
  if (talking && hour < 7) {
    return true;
  }
  else if (talking && hour > 20){
    return true;
  }
  else{
    return false;
  }
}