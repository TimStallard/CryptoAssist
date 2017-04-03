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

    return plaintext
    .split("")
    .map(require("./util/toNum.js"))
    .map((int, pos, ints)=>{
      if(Number.isInteger(int)){
        var realCharsPosition = ints.slice(0, pos).filter((num)=>(Number.isInteger(num))).length;
        return (int + keyNums[realCharsPosition % key.length]) % 26;
      }
      else{
        return int;
      }
    })
    .filter((a)=>(!Number.isNaN(a)))
    .map(require("./util/toChar.js"))
    .join("");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
