var events = require("../events.js");

module.exports =  {
  name: "Custom Code",
  inputs: {
    inp1: "1",
    inp2: "2",
    inp3: "3",
    inp4: "4",
    inp5: "5"
  },
  output: true,
  execute: function(inputs, block){
    eval("customFunc = function(inp1, inp2, inp3, inp4, inp5){" + block.properties.code + "}");
    return customFunc(inputs.inp1, inputs.inp2, inputs.inp3, inputs.inp4, inputs.inp5);
  },
  pageBlock: {
    html: "To access inputs, use vars inp1, inp2, etc<br><textarea name='code'></textarea>",
    js: function(block){
      if(block.properties.code){
        block.elem.find("textarea").val(block.properties.code);
      }
      $(block.elem).find("textarea").keyup(function(){
        block.properties.code = block.elem.find("textarea").val();
        events.emit("inputChanged");
      });
    }
  }
}
