module.exports =  {
  name: "Vigenere Encode",
  inputs: {
    plaintext: {
      name: "Plaintext",
      type: "text",
      required: true,
      inline: false
    },
    key: {
      name: "Key",
      type: "text",
      required: true,
      inline: true
    }
  },
  output: true,
  execute: function({plaintext, key}, elem){
    var keyNums = key.split("").map(require("./util/toNum.js"));
    var i = 0;
    return plaintext
    .split("")
    .map(require("./util/toNum.js"))
    .map((int, pos, ints)=>{
      if(Number.isInteger(int)){
        i++;
        return (int + keyNums[i % key.length]) % 26;
      }
      else{
        return int;
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
