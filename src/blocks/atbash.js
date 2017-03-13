module.exports =  {
  name: "Atbash",
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
    .map(require("./util/toNum.js"))
    .map((num)=>{
      if(Number.isInteger(num)){
        return 25 - num;
      }
      else{
        return num;
      }
    })
    .map(require("./util/toChar.js"))
    .join("")
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
