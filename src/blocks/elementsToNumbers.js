module.exports =  {
  name: "Elements to Numbers",
  inputs: {
    elements: {
      name: "Elements",
      type: "text",
      required: true,
      inline: false
    }
  },
  output: true,
  execute: function({elements}, elem){
    return elements
    .split(",")
    .map((element)=>(element.toLowerCase().replace(/[^a-z]/g, "")))
    .map((element)=>(require("./util/elements.js").indexOf(element) + 1))
    .filter((num)=>(num > 0))
    .join(",");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
