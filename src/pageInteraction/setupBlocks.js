var $ = require("jquery");
var blocks = require("../blocks");
for(var block of Object.keys(blocks)){
  blocks[block].type = block;
  $("#blocks").append(require("./block.hbs")({
    block: blocks[block]
  }));
}
