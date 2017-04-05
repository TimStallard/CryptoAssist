var $ = require("jquery");
var events = require("./events.js");
var diagram = require("./diagram");

$("#header a#export").click(function(){ //export button clicked
  var fileSaver = require("file-saver");
  var exported = require("./diagram/export.js")();
  var exportedBlob = new Blob([exported], {type: "text/plain;chartset=utf-8"})
  fileSaver.saveAs(exportedBlob, diagram.name + ".json");
});

$("#header a#import").click(function(){
  $("#importUpload").click();  //on import button click, trigger file open dialog
});

$("#importUpload").change(function(){ //when a file is selected
  var reader = new FileReader();
  reader.onload = function(){
    require("./diagram/import.js")(reader.result);
  }
  reader.readAsText(this.files[0]); //read the file as text, this will call the above function when complete
});

$("#header a#projectName").click(function(){
  var newName = prompt("Please enter a name for the diagram", diagram.name);
  if(newName){
    diagram.name = newName;
  }
  $("#header a#projectName").html(diagram.name);
});

events.subscribe("diagramImport", function(){
  //update displayed name when new diagram imported
  $("#header a#projectName").html(diagram.name);
});

$("#header a#addSnapshot").click(function(){
  var name = prompt("Please enter a name for the snapshot");
  require("./diagram/addSnapshot.js")(name);
});

events.subscribe(["snapshotsChanged", "diagramImport"], function(){
  $("#snapshots>.snapshot").remove();
  diagram.snapshots.sort((a, b)=>(b.date - a.date)); //sort with newest first
  for(var i in diagram.snapshots){
    var date = new Date(diagram.snapshots[i].date);
    $("#snapshots").append(
      `<li class="snapshot"><a href="#" data-i="${i}">${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} - ${diagram.snapshots[i].name}</a></li>`
    );
  }
});

$("#header #snapshots").on("click", ".snapshot>a", function(){
  var snapshot = diagram.snapshots[parseInt($(this).data("i"))] //get the snapshot with the ID from this element
  var newSnapshotName = prompt("Reverting to this snapshot will cause you to lose your current work. If you would like to make a snapshot of your current workspace, please enter a name for it:");
  if(newSnapshotName){ //if user wants another snapshot, make one
    require("./diagram/addSnapshot.js")(newSnapshotName);
  }
  diagram.state = JSON.parse(JSON.stringify(snapshot.state)); //load in snapshot
  require("./diagram/updateState.js")();
});

$("#header #help-button").click(function(){
  $("#help").fadeIn().css("display", "flex");
});

$("#help").click(function(){
  $("#help").fadeOut();
});
