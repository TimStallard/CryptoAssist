module.exports = function(num){
  if(Number.isInteger(num)){
    return String.fromCharCode(num + 97);
  }
  else{
    return num;
  }
}
