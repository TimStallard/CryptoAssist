var $ = require("jquery");

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
  //console.log($("#header>#importUpload")[0].files[0])
})
