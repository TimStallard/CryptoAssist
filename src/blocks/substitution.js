module.exports =  {
  name: "Substitution",
  inputs: {
    text: "Text",
    mapping: "Mapping"
  },
  output: true,
  execute: function({text, mapping}, elem){
    mapping = mapping.toLowerCase();
    var letterMapping = {};
    for(var i = 0; i < (mapping.length - 1); i++){
      letterMapping[mapping[i]] = mapping[i+1];
    }

    return text
    .split("")
    .map((char)=>{
      if(char.toLowerCase() in letterMapping){
        if(char.toLowerCase() == char){
          return letterMapping[char];
        }
        else{
          return letterMapping[char.toLowerCase()].toUpperCase();
        }
      }
      else{
        return char;
      }
    })
    .join("");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
