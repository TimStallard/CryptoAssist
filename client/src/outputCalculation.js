var diagram = require("./diagram.js");
var events = require("./events.js");
var blocks = require("./blocks");

function resolveOutput(block, cache){
  var inputValues = {};
  for(var input in block.inputs){
    if(block.inputs[input] in cache){
      inputValues[input] = cache[block.inputs[input]];
    }
    else{
      var inputBlock = diagram.state.filter((diagramBlock)=>(diagramBlock.id == block.inputs[input]))[0];
      inputValues[input] = resolveOutput(inputBlock, cache);
    }
  }

  var output = blocks[block.type].execute(inputValues, block);
  cache[block.id] = output;

  return output;
}

function calculateOutputBlocks(){
  var cache = {};
  var outputBlocks = diagram.state.filter((block)=>(block.type == "output"));
  for(var block of outputBlocks){
    resolveOutput(block, cache);
  }
}

events.subscribe("inputChanged", calculateOutputBlocks);
events.subscribe("newJoin", calculateOutputBlocks);

window.calculate = calculateOutputBlocks;
