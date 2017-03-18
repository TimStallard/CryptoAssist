var diagram = require("./index.js");
var events = require("../events.js");
var $ = require("jquery");

module.exports = function(newDiagram){
  Object.assign(diagram, JSON.parse(newDiagram));
  require("./updateState.js")();
}
