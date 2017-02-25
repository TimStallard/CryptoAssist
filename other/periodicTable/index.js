//data.txt should be the table section from the source of https://en.wikipedia.org/w/index.php?title=List_of_chemical_elements&action=edit
//This worked as of 23/02/17, data structure may change and break this code

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
      [4]
      .replace(/\ /g, "")
      .toLowerCase()
    ))
  ).replace(/,/g, ",\n")
)
