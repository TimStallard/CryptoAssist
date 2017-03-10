var $ = require("jquery");
var blocks = require("../blocks");
for(var block of Object.keys(blocks)){ //loop through each block model
  blocks[block].type = block;
  //type is used to identify block type for instances, so in this case will be the model we want to show
  $("#blocks").append(require("./block.hbs")({ //generate these from the template, add to page
    block: blocks[block]
  }));
}
