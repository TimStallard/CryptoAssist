module.exports =  {
  name: "Transposition Reverse",
  inputs: {
    text: {
      name: "Text",
      type: "text",
      required: true,
      inline: false
    },
    n: {
      name: "n",
      type: "text",
      required: true,
      inline: true
    }
  },
  output: true,
  execute: function({text, n}, elem){
    var n = parseInt(n);

    text = text.replace(/[ ,.]/g, "");

    var output = [];
    x = 0;
    var z = 0;
    for(var i = 0; i < n; i++){
      for(var y = i; y < text.length; y += n){
        output[y] = text[z];
        z++;
      }
    }

    return output.join("");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
