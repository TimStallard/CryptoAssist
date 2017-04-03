module.exports =  {
  name: "Letters to Numbers",
  inputs: {
    letters: {
      name: "Letters",
      type: "text",
      required: true,
      inline: false
    },
    offset: {
      name: "Offset",
      type: "text",
      required: false,
      inline: true,
      default: "0"
    }
  },
  output: true,
  execute: function({letters, offset}, elem){
    return letters
    .split("")
    .map((char)=>(char.charCodeAt(0)))
    .filter((asciiVal)=>(((asciiVal >= 65) && (asciiVal <= 90)) || ((asciiVal >= 97) && (asciiVal <= 122))))
    .map((asciiVal)=>{
      if(asciiVal <= 90){
        return asciiVal - 65;
      }
      else{
        return asciiVal - 97;
      }
    })
    .map((num)=>(num + parseInt(offset)))
    .map((num)=>(((num%26)+26)%26))
    .join(",");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
