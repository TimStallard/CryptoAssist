module.exports =  {
  name: "ASCII to Hex",
  inputs: {
    text: {
      name: "Text",
      type: "text",
      required: true,
      inline: false
    }
  },
  output: true,
  execute: function({text}, elem){
    return text
    .split("")
    .map((char)=>(char.charCodeAt(0)))
    .map((int)=>(int.toString(16)))
    .join("");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
