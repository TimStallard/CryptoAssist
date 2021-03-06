module.exports =  {
  name: "Numbers to Letters",
  inputs: {
    nums: {
      name: "Numbers",
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
  execute: function({nums, offset}, elem){
    return nums
    .split(",")
    .filter((num)=>(num))
    .map((num)=>(parseInt(num)))
    .filter((num)=>(!isNaN(num)))
    .map((num)=>(num - parseInt(offset)))
    .map((num)=>((num%52)+52)%52)
    .map((num)=>{
      if(num < 26){
        var asciiOffset = 97;
      }
      else{
        var asciiOffset = 65 - 26;
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
