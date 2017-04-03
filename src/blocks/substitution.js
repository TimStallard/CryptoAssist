module.exports =  {
  name: "Substitution",
  inputs: {
    text: {
      name: "Text",
      type: "text",
      required: true,
      inline: false
    },
    mapping: {
      name: "Mapping",
      type: "text",
      required: true,
      inline: true
    }
  },
  output: true,
  execute: function({text, mapping}, elem){
    mapping = mapping.toLowerCase();
    var letterMapping = {};
    for(var i = 0; i < (mapping.length - 1); i = i + 2){
      letterMapping[mapping[i]] = mapping[i+1];
    }

    return text
    .split("")
    .map((char)=>{
      if(char.toLowerCase() in letterMapping){
        return letterMapping[char.toLowerCase()]
      }
      else{
        return char.toLowerCase();
      }
    })
    .join("");
  },
  pageBlock: {
    html: "<center>Enter your Substitution as pairs of characters (eg \"abcd\" = a->b, c->d )</center>",
    js: function(){}
  }
}
