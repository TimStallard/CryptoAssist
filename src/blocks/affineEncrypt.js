module.exports =  {
  name: "Affine Encrypt",
  inputs: {
    text: "Text",
    a: "a",
    b: "b"
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
      return "";
      console.log(a, 26, "not coprime");
    }

    var lookupTable = [];
    for(var i = 0; i < 26; i++){
      lookupTable[i] = ((a * i) + b)%26;
    }

    return text
    .split("")
    .map(require("./util/toNum.js"))
    .map((num)=>(lookupTable[num]))
    .map(require("./util/toChar.js"))
    .join("");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
