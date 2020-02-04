function squirrelPlay (temp,isSummer) {
    let upperLimit;
    if (isSummer) upperLimit = 100;    
    else upperLimit = 90;
    if (temp >= 60 && temp <= upperLimit) return true;
    return false;
}