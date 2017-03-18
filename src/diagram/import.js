var diagram = require("./index.js");
var events = require("../events.js");
var $ = require("jquery");

module.exports = function(newDiagram){
  var newDiagramObject = JSON.parse(newDiagram);
  var customCode = false;
  if(newDiagramObject.state.filter((block)=>(block.type == "custom")).length){customCode = true}; //check blocks for custom
  for(var snapshot of newDiagramObject.snapshots){
    if(snapshot.state.filter((block)=>(block.type == "custom")).length){customCode = true}; //check blocks in snapshots for custom
  }
  var accepted = true;
  if(customCode){ //check with user if JS present
    accepted = confirm("This document contains Javascript. You should only allow this document to be opened if you trust the source.");
  }
  if(accepted){
    Object.assign(diagram, JSON.parse(newDiagram));
    require("./updateState.js")();
  }
}
