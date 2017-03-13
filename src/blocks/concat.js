module.exports =  {
  name: "Concat",
  inputs: {
    str1: {
      name: "String 1",
      type: "text",
      required: true,
      inline: false
    },
    str2: {
      name: "String 2",
      type: "text",
      required: true,
      inline: false
    }
  },
  output: true,
  execute: function({str1, str2}, block){
    return str1 + str2;
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
