var data = require("fs").readFileSync("data.txt").toString();

console.log(
  JSON.stringify(
    data
    .replace(/\r/g, "")
    .split("\n")
    .filter((a)=>(a))
    .map((line)=>(
      line
      .split("\t")
      .filter((a)=>(a))
    ))
    .map((sections)=>([sections[0], parseFloat(sections[4])]))
    .reduce((freqs, freq)=>{
      freqs[freq[0]] = freq[1];
      return freqs;
    }, {})
  )
)
