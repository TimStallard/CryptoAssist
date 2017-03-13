module.exports =  {
  name: "Numbers to Elements",
  inputs: {
    numbers: {
      name: "Numbers",
      type: "text",
      required: true,
      inline: false
    }
  },
  output: true,
  execute: function({numbers}, elem){
    return numbers
    .split(",")
    .map((num)=>(parseInt(num)))
    .filter((num)=>(!isNaN(num)))
    .map((num)=>(require("./util/elements.js")[num-1]))
    .join(",");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
