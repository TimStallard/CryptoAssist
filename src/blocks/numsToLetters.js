module.exports =  {
  name: "Numbers to Letters",
  inputs: {
    nums: "Numbers",
    offset: "Offset"
  },
  output: true,
  execute: function({nums, offset}, elem){
    if(!offset){
      offset = 0;
    }
    else{
      offset = parseInt(offset);
    }

    return nums
    .split(",")
    .filter((num)=>(num))
    .map((num)=>(parseInt(num)))
    .filter((num)=>(!isNaN(num)))
    .map((num)=>(num - offset))
    .map((num)=>(num%52))
    .map((num)=>{
      if(num < 0){
        return 52 + num;
      }
      else{
        return num;
      }
    })
    .map((num)=>{
      if(num < 26){
        asciiOffset = 97;
      }
      else{
        asciiOffset = 65 - 26;
      }
      return num + asciiOffset;
    })
    .map((asciiVal)=>(String.fromCharCode(asciiVal)))
    .join("")
  },
  pageBlock: {
    html: "",
    js: function(){}
  }
}
