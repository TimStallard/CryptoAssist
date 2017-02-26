var data = require("fs").readFileSync("data.txt").toString();

console.log(
  JSON.stringify(
    data
    .replace(/\r/g, "")
    .split("\n")
    .filter((line)=>(line != "|-"))
    .filter((a)=>(a))
    .map((line)=>(
      line
      .replace(/\|\|/g, "|")
      .split("\|")
    ))
    .map((sections)=>([sections[2].replace(/'/g, ""), parseFloat(sections[5])]))
    .reduce((freqs, freq)=>{
      freqs[freq[0]] = freq[1];
      return freqs;
    }, {})
  ).replace(/,/g, ",\n")
)
