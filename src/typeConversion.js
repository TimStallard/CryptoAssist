module.exports = {
  text: function(input){
    if(typeof input != "string"){
      throw "Invalid input type - should be a string.";
    }
    return input;
  },
  number: function(input){
    if(isNaN(parseInt(input))){
      throw "Invalid input type - should be a string.";
    }
    return parseInt(input);
  }
}
