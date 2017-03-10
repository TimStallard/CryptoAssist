var $ = require("jquery");
var events = require("./events.js");
var diagram = require("./diagram");

$("#header>a#export").click(function(){ //export button clicked
  var fileSaver = require("file-saver");
  var exported = require("./diagram/export.js")();
  var exportedBlob = new Blob([exported], {type: "text/plain;chartset=utf-8"})
  fileSaver.saveAs(exportedBlob, diagram.name + ".json");
});

$("#header>a#import").click(function(){
  $("#header>#importUpload").click(); //on import button click, trigger file open dialog
});

$("#header>#importUpload").change(function(){ //when a file is selected
  var reader = new FileReader();
  reader.onload = function(){
    require("./diagram/import.js")(reader.result);
  }
  reader.readAsText(this.files[0]); //read the file as text, this will call the above function when complete
});

$("#header>a#projectName").click(function(){
  do{
    diagram.name = prompt("Please enter a name for the diagram", diagram.name);
  }
  while(!diagram.name); //keep asking for a new name until a valid one is entered
  $("#header>a#projectName").html(diagram.name);
});

events.subscribe("diagramImport", function(){
  //update displayed name when new diagram imported
  $("#header>a#projectName").html(diagram.name);
});
