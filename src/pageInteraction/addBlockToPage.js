var blocks = require("../blocks");

module.exports = function(newBlock){
  var newBlockElement = $(
    require("./block.hbs")({
      block: blocks[newBlock.type],
      instance: newBlock
    })
  ).appendTo("#workspace");
  newBlock.elem = newBlockElement;
  if(blocks[newBlock.type].size){
    newBlockElement.css({
      height: blocks[newBlock.type].size.height,
      width: blocks[newBlock.type].size.width
    });
  }
  if(newBlock.position){
    newBlockElement.css({
      top: newBlock.position.y,
      left: newBlock.position.x
    });
  }
  blocks[newBlock.type].pageBlock.js(newBlock);
}
