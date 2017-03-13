module.exports =  {
  name: "Reverse",
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
