module.exports =  {
  name: "Transposition",
  inputs: {
    text: "Text",
    n: "n"
  },
  output: true,
  execute: function({text, n}, elem){
    var n = parseInt(n);

    text = text.replace(/[ ,.]/g, "");

    var output = "";
    x = 0;
    for(var i = 0; i < n; i++){
      for(var y = i; y < text.length; y += n){
        output += text[y];
      }
    }

    return output;
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
