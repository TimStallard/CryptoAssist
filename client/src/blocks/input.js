module.exports =  {
  name: "Input",
  inputs: {
  },
  output: true,
  execute: function({}, block){
    return block.find("input[name='input']").val();
  },
  pageBlock: {
    html: "<input type='text' name='input'></input>",
    js: function(){}
  }
}
