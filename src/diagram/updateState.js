var diagram = require("./index.js");
var events = require("../events.js");
var $ = require("jquery");

module.exports = function(){
  $("#workspace>*").remove(); //remove old lines + block
  for(var block of diagram.state){ //add blocks to page
    require("../pageInteraction/addBlockToPage.js")(block);
  }
  events.emit("diagramImport"); //trigger line re-draw
}
