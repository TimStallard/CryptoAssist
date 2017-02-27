module.exports =  {
  name: "Reverse",
  inputs: {
    input: "Input"
  },
  output: true,
  execute: function({input}, elem){
    return input
    .split("")
    .reverse()
    .join("");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
