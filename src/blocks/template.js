module.exports =  {
  name: "Example Block",
  inputs: {
    input: "Input"
  },
  output: true,
  execute: function({input}, elem){
    return input;
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
