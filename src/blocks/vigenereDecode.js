module.exports =  {
  name: "Vigenere Decode",
  inputs: {
    cipherText: "Ciphertext",
    key: "Key"
  },
  output: true,
  execute: function({cipherText, key}, elem){
    var keyNums = key.split("").map(require("./util/toNum.js"));

    return cipherText
    .split("")
    .map(require("./util/toNum.js"))
    .map((int, pos, ints)=>{
      if(Number.isInteger(int)){
        var realCharsPosition = ints.slice(0, pos).filter((num)=>(Number.isInteger(num))).length;
        return (int + 26 - keyNums[realCharsPosition%key.length])%26;
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
