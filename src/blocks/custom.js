var events = require("../events.js");
var $ = require("jquery");

module.exports =  {
  name: "Custom Code",
  inputs: {
    inp1: {
      name: "1",
      type: "text",
      required: false,
      inline: false
    },
    inp2: {
      name: "2",
      type: "text",
      required: false,
      inline: false
    },
    inp3: {
      name: "3",
      type: "text",
      required: false,
      inline: false
    },
    inp4: {
      name: "4",
      type: "text",
      required: false,
      inline: false
    },
    inp5: {
      name: "5",
      type: "text",
      required: false,
      inline: false
    }
  },
  output: true,
  execute: function(inputs, block){
    var customFunc;
    eval("customFunc = function(inp1, inp2, inp3, inp4, inp5){" + block.properties.code + "}");
    return customFunc(inputs.inp1, inputs.inp2, inputs.inp3, inputs.inp4, inputs.inp5);
  },
  pageBlock: {
    html: "To access inputs, use vars inp1, inp2, etc. Use return to output.<br><textarea name='code'></textarea>",
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
