module.exports =  {
  name: "Affine Decrypt",
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
      console.log(a, 26, "not coprime");
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
