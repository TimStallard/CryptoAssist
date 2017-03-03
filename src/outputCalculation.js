var diagram = require("./diagram");
var events = require("./events.js");
var blocks = require("./blocks");

function resolveOutput(block, cache){
  var inputValues = {};
  for(var input in block.inputs){
    if(block.inputs[input].joined){ //if it's joined to something else
      if(block.inputs[input].joined in cache){ //if output of other block is already in cache
        inputValues[input] = cache[block.inputs[input].joined];
      }
      else{
        var inputBlock = diagram.state.filter((diagramBlock)=>(diagramBlock.id == block.inputs[input].joined))[0]; //find block instance
        inputValues[input] = resolveOutput(inputBlock, cache); //calculate and store output
      }
    }
    else if(block.inputs[input].value){ //if value is already set, just save that
      inputValues[input] = block.inputs[input].value;
    }
  }

  var output = blocks[block.type].execute(inputValues, block);
  cache[block.id] = output;

  return output;
}

function calculateOutputBlocks(){
  var cache = {};
  var outputBlocks = diagram.state.filter((block)=>((block.type == "output") || (block.type == "frequency")));
  for(var block of outputBlocks){
    resolveOutput(block, cache);
  }
}

events.subscribe("inputChanged", calculateOutputBlocks);
events.subscribe("newJoin", calculateOutputBlocks);
events.subscribe("joinRemove", calculateOutputBlocks);
events.subscribe("diagramImport", calculateOutputBlocks);

window.calculate = calculateOutputBlocks;
