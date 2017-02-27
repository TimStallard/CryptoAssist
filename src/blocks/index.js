var blocks = [
  "input",
  "output",
  "reverse",
  "numsToLetters",
  "lettersToNums",
  "hexToAscii",
  "asciiToHex",
  "vigenereEncode",
  "vigenereDecode",
  "caesar",
  "affineEncrypt",
  "affineDecrypt",
  "atbash",
  "numbersToElements",
  "elementsToNumbers",
  "transposition",
  "transpositionReverse",
  "substitution",
  "frequency",
  "custom",
];

module.exports = blocks.reduce((blocks, block)=>{
  blocks[block] = require("./" + block + ".js");
  return blocks;
}, {});
