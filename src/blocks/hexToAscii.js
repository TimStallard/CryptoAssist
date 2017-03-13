module.exports =  {
  name: "Hex to ASCII",
  inputs: {
    hex: {
      name: "Hex String",
      type: "text",
      required: true,
      inline: false
    }
  },
  output: true,
  execute: function({hex}, elem){
    return hex
    .split("")
    .filter((digit)=>(!isNaN(parseInt(digit, 16))))
    .reduce((pairs, digit)=>{
      if(pairs[pairs.length - 1].length < 2){
        pairs[pairs.length - 1] += digit
      }
      else{
        pairs.push([digit]);
      }
      return pairs;
    }, [""])
    .filter((pair)=>(pair.length == 2))
    .map((pair)=>(parseInt(pair, 16)))
    .map((int)=>(String.fromCharCode(int)))
    .join("")
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
