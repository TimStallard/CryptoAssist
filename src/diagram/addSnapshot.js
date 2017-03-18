var diagram = require("./index.js");
var events = require("../events.js");

module.exports = function(snapshotName){
  var state = JSON.parse(require("./export.js")()).state;
  diagram.snapshots.push({
    date: new Date().getTime(),
    name: snapshotName,
    state: state
  });
  events.emit("snapshotsChanged");
}
