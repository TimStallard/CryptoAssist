module.exports =  {
  name: "Elements to Numbers",
  inputs: {
    elements: "Elements"
  },
  output: true,
  execute: function({elements}, elem){
    return elements
    .split(",")
    .map((element)=>(require("./util/elements.js").indexOf(element.toLowerCase()) + 1))
    .filter((num)=>(num > 0))
    .join(",");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
