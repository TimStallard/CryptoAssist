module.exports =  {
  name: "Concat",
  inputs: {
    str1: "String 1",
    str2: "String 2"
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
