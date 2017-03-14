module.exports =  {
  name: "Caesar",
  inputs: {
    text: {
      name: "Text",
      type: "text",
      required: true,
      inline: false
    },
    shift: {
      name: "Shift",
      type: "number",
      required: true,
      inline: true,
      default: "0"
    }
  },
  output: true,
  execute: function({text, shift}, elem){
    if(!isNaN(parseInt(shift))){
      shift = parseInt(shift);
    }
    else{
      shift = 0;
    }

    return text
    .split("")
    .map(require("./util/toNum.js"))
    .map((num)=>{
      if(Number.isInteger(num)){
        return ((num + shift)%26 + 26)%26;
      }
      else{
        return num;
      }
    })
    .map(require("./util/toChar.js"))
    .join("");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
