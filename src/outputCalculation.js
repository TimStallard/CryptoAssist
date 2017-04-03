var diagram = require("./diagram");
var events = require("./events.js");
var blockModels = require("./blocks");
var typeConversion = require("./typeConversion.js");

function resolveOutput(block, cache){
  try{
    var inputValues = {};
    $(block.elem).find(".error").html("");
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

      if(inputValues[input]){ //if input is present, check and convert into type
        inputValues[input] = typeConversion[blockModels[block.type].inputs[input].type](inputValues[input]);
      }
      else{ //currently missing/blank
        if(blockModels[block.type].inputs[input].required){ //if required, throw an error
          throw "A required input is missing";
        }
        else if(blockModels[block.type].inputs[input].default){ //otherwise, if a default is present, use that
          inputValues[input] = blockModels[block.type].inputs[input].default;
        }
      }
    }

    var output = blockModels[block.type].execute(inputValues, block);
    cache[block.id] = output;
    return output;
  }
  catch(err){ //if there is an error, display it
    $(block.elem).find(".error").html(err);
    return "";
  }
}

function calculateOutputBlocks(){ //resolve the output for frequency and output blocks, their execute functions will handle displaying
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
