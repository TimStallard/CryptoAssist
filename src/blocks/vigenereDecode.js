module.exports =  {
  name: "Vigenere Decode",
  inputs: {
    cipherText: {
      name: "Ciphertext",
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
  execute: function({cipherText, key}, elem){
    var keyNums = key.split("").map(require("./util/toNum.js"));

    return cipherText
    .split("")
    .map(require("./util/toNum.js"))
    .map(function(int, pos, ints){
      if(Number.isInteger(int)){
        this.i++;
        return (int + 26 - keyNums[this.i%key.length])%26;
      }
      else{
        return int;
      }
    }, {i: -1})
    .map(require("./util/toChar.js"))
    .join("");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
