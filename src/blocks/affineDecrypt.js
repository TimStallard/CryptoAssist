module.exports =  {
  name: "Affine Decrypt",
  inputs: {
    text: {
      name: "Text",
      type: "text",
      required: true,
      inline: false
    },
    a: {
      name: "a",
      type: "number",
      required: true,
      inline: true
    },
    b: {
      name: "b",
      type: "number",
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

    var reverseLookupTable = [];
    for(var i = 0; i < 26; i++){
      reverseLookupTable[((a * i) + b)%26] = i;
    }

    return text
    .split("")
    .map(require("./util/toNum.js"))
    .map((num)=>(reverseLookupTable[num]))
    .map(require("./util/toChar.js"))
    .join("");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
