var data = require("fs").readFileSync("data.txt").toString();
var frequencies = data
.replace(/\r/g, "")
.split("\n")
.filter((a)=>(a))
.map((line)=>(
  line
  .split("\t")
  .filter((a)=>(a))
))
.map((sections)=>([sections[0], parseFloat(sections[1])]))
.reduce((freqs, freq)=>{
  freqs[freq[0]] = freq[1];
  return freqs;
}, {});

var total = Object.values(frequencies).reduce((a, b)=>(a + b));
var percentages = {};
var trigraphs = Object.keys(frequencies).splice(0, 26);
for(var trigraph of trigraphs){
  percentages[trigraph] = frequencies[trigraph] / total * 100;
}
console.log(percentages);
