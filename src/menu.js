var $ = require("jquery");
var events = require("./events.js");
var diagram = require("./diagram");

$("#header a#export").click(function(){
  var fileSaver = require("file-saver");
  var exported = require("./diagram/export.js")();
  var exportedBlob = new Blob([exported], {type: "text/plain;chartset=utf-8"})
  fileSaver.saveAs(exportedBlob, diagram.name + ".json");
});

$("#header a#import").click(function(){
  $("#importUpload").click();
});

$("#importUpload").change(function(){
  var reader = new FileReader();
  reader.onload = function(){
    require("./diagram/import.js")(reader.result);
  }
  reader.readAsText(this.files[0]);
});

$("#header>a#projectName").click(function(){
  do{
    diagram.name = prompt("Please enter a name for the diagram", diagram.name);
  }
  while(!diagram.name);
  $("#header>a#projectName").html(diagram.name);
});

events.subscribe("diagramImport", function(){
  $("#header>a#projectName").html(diagram.name);
});

$("#header a#addSnapshot").click(function(){
  var name = prompt("Please enter a name for the snapshot");
  require("./diagram/addSnapshot.js")(name);
});

events.subscribe(["snapshotsChanged", "diagramImport"], function(){
  $("#snapshots>.snapshot").remove();
  diagram.snapshots.sort((a, b)=>(b.date - a.date));
  for(var i in diagram.snapshots){
    var date = new Date(diagram.snapshots[i].date);
    $("#snapshots").append(
      `<li class="snapshot"><a href="#" data-i="${i}">${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} - ${diagram.snapshots[i].name}</a></li>`
    );
  }
});

$("#header #snapshots").on("click", ".snapshot>a", function(){
  var snapshot = diagram.snapshots[parseInt($(this).data("i"))]
  var newSnapshotName = prompt("Reverting to this snapshot will cause you to lose your current work. If you would like to make a snapshot of your current workspace, please enter a name for it:");
  if(newSnapshotName){
    require("./diagram/addSnapshot.js")(newSnapshotName);
  }
  diagram.state = JSON.parse(JSON.stringify(snapshot.state));
  require("./diagram/updateState.js")();
});
