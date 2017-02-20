var $ = require("jquery");
var blocks = require("../blocks");
for(var block of Object.keys(blocks)){
  $("#blocks").append(require("./block.hbs")(blocks[block]));
}
