module.exports = function(char){
  var num = char.toLowerCase().charCodeAt(0) - 97;
  if((num >= 0) && (num < 26)){
    return num;
  }
  else{
    return char;
  }
}
