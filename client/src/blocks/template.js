module.exports =  {
  name: "Example Block",
  inputs: {
    input1: "Input 1"
  },
  output: true,
  execute: function({input1}, elem){
    $(elem).find("div.input1").html(input1);
    return (output = parseInt(input1) + 1).toString();
  },
  pageBlock: {
    html: "<div class='input1'></div>",
    js: function(){}
  }
}
