var events = require("../events.js");

module.exports =  {
  name: "Input",
  inputs: {
  },
  output: true,
  execute: function({}, block){
    return block.elem.find("input[name='input']").val();
  },
  pageBlock: {
    html: "<input type='text' name='input'></input>",
    js: function(block){
      $(block.elem).find("input[name='input']").keyup(function(){
        events.emit("inputChanged");
      });
    }
  }
}
