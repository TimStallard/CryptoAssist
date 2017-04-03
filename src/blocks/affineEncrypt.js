module.exports =  {
  name: "Affine Encrypt",
  inputs: {
    text: {
      name: "Text",
      type: "text",
      required: true,
      inline: false
    },
    a: {
      name: "a",
      type: "text",
      required: true,
      inline: true
    },
    b: {
      name: "b",
      type: "text",
      required: true,
      inline: true
    }
  },
  output: true,
  execute: function({text, a, b}, elem){
    a = parseInt(a);
    b = parseInt(b);

    if(isNaN(a)){
      return "";
    }
    if(isNaN(b)){
      return "";
    }

    if(!require("./util/coPrime.js")(a, 26)){
      throw "a and 26 must be coprime";
      return "";
    }

    var lookupTable = [];
    for(var i = 0; i < 26; i++){
      lookupTable[i] = ((a * i) + b)%26;
    }

    return text
    .split("")
    .map(require("./util/toNum.js"))
    .map((num)=>(Number.isInteger(num) ? lookupTable[num] : num))
    .map(require("./util/toChar.js"))
    .join("");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
