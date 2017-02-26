module.exports = function(){
  var diagram = require("./index.js");
  return JSON.stringify(diagram, function(key, value){
    if(key == "elem"){
      return undefined;
    }
    return value;
  });
}
