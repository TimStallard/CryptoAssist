var $ = require("jquery");

module.exports =  {
  name: "Output",
  inputs: {
    input: {
      name: "Input",
      type: "text"
    }
  },
  output: false,
  execute: function({input}, block){
    $(block.elem).find("textarea.output").html(input);
  },
  pageBlock: {
    html: "<textarea class='output' style='width: 190px; height: 135px;'></textarea>",
    js: function(){}
  }
}
