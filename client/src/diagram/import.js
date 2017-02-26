var diagram = require("./index.js");
var events = require("../events.js");
var $ = require("jquery");

module.exports = function(newDiagram){
  Object.assign(diagram, JSON.parse(newDiagram));
  $("#workspace>*").remove();
  for(var block of diagram.state){
    require("../pageInteraction/addBlockToPage.js")(block);
  }
  events.emit("diagramImport");
}
