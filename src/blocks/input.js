var events = require("../events.js");
var $ = require("jquery");

module.exports =  {
  name: "Input",
  inputs: {
  },
  output: true,
  execute: function({}, block){
    return block.properties.value;
  },
  pageBlock: {
    html: "<input type='text' name='input'></input>",
    js: function(block){
      if(block.properties.value){
        block.elem.find("input[name='input']").val(block.properties.value);
      }
      $(block.elem).find("input[name='input']").keyup(function(){
        block.properties.value = block.elem.find("input[name='input']").val();
        events.emit("inputChanged");
      });
    }
  }
}
