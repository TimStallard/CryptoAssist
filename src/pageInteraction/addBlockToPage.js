var blocks = require("../blocks");
var events = require("../events");
var $ = require("jquery");

module.exports = function(newBlock){
  var newBlockElement = $(
    require("./block.hbs")({
      block: blocks[newBlock.type],
      instance: newBlock
    })
  ).appendTo("#workspace");
  newBlockElement.find(".inputs input").keyup(function(){
    //when input field is updated, save the value to the block object and emit event for updates
    var inputId = $(this).parent().attr("id");
    if(!newBlock.inputs[inputId]){
      newBlock.inputs[inputId] = {};
    }
    newBlock.inputs[inputId].value = $(this).val();
    events.emit("inputChanged");
  });
  newBlock.elem = newBlockElement;
  if(blocks[newBlock.type].size){
    //if the block declaration contains a non-standard size, resize it
    newBlockElement.css({
      height: blocks[newBlock.type].size.height,
      width: blocks[newBlock.type].size.width
    });
  }
  if(newBlock.position){
    //if this block instance already has a position, place it there
    //this will only be used for importing
    newBlockElement.css({
      top: newBlock.position.y,
      left: newBlock.position.x
    });
  }
  blocks[newBlock.type].pageBlock.js(newBlock);
}
