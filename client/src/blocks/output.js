module.exports =  {
  name: "Output",
  inputs: {
    input: "Input"
  },
  output: false,
  execute: function({input}, block){
    $(elem).find("div.output").html(input1);
  },
  pageBlock: {
    html: "<span class='output'></span>",
    js: function(){}
  }
}
