module.exports =  {
  name: "Output",
  inputs: {
    input: {
      name: "Input"
    }
  },
  output: false,
  execute: function({input}, block){
    $(block.elem).find("span.output").html(input);
  },
  pageBlock: {
    html: "<span class='output'></span>",
    js: function(){}
  }
}
