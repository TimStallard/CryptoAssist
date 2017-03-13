module.exports =  {
  name: "Example Block",
  inputs: {
    input: {
      name: "Input",
      type: "text",
      required: true,
      inline: false
    }
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
