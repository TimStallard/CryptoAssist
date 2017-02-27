module.exports =  {
  name: "Letters to Numbers",
  inputs: {
    letters: "Letters",
    offset: "Offset"
  },
  output: true,
  execute: function({letters, offset}, elem){
    if(!offset){
      offset = 0;
    }
    else{
      offset = parseInt(offset);
    }

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
    .map((num)=>(num + offset))
    .join(",");
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
