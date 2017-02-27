var $ = require("jquery");
var events = require("./events.js");
var diagram = require("./diagram");

$("#header>a#export").click(function(){
  var fileSaver = require("file-saver");
  var exported = require("./diagram/export.js")();
  var exportedBlob = new Blob([exported], {type: "text/plain;chartset=utf-8"})
  fileSaver.saveAs(exportedBlob, diagram.name + ".json");
});

$("#header>a#import").click(function(){
  $("#header>#importUpload").click();
});

$("#header>#importUpload").change(function(){
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
