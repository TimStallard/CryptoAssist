var blocks = require("../blocks");
var diagram = require("../diagram");
var events = require("../events.js");
var $ = require("jquery");
var uuid = require("node-uuid");

function blockPositionChange(event){
  var block = diagram.state.filter((block)=>(block.dragging))[0];
  if(block){
    block.position.x = event.pageX - $("#workspace").position().left - block.offset.x;
    block.position.y = event.pageY - $("#workspace").position().top - block.offset.y;

    $("#workspace>.block#" + block.id).css({
      left: block.position.x,
      top: block.position.y,
    });

    events.emit("blockMove");
  }
}

$("#blocks").on("mousedown", ".block>.main,.block>.inputs", function(event){
  var newBlock = {
    id: uuid.v4(),
    position: {
      x: 0,
      y: 0
    },
    dragging: true,
    offset: {
      x: event.pageX - $(this).parent().offset().left,
      y: event.pageY - $(this).parent().offset().top
    },
    type: $(this).parent().data("type"),
    inputs: {},
    properties: {}
  }
  diagram.state.push(newBlock);
  require("./addBlockToPage.js")(newBlock);
  blockPositionChange(event);
});

$("#workspace").on("mousedown", ".block>.main,.block>.inputs", function(event){
  if(event.which == 1){ //check left mouse button
    var block = diagram.state.filter((block)=>(block.id == $(this).parent().attr("id")))[0];
    block.dragging = true;
    block.offset.x = event.pageX - $(this).parent().offset().left;
    block.offset.y = event.pageY - $(this).parent().offset().top;
    blockPositionChange(event);
  }
});

$("#workspace").on("mouseup", ".block>.main,.block>.inputs", function(event){
  diagram.state.filter((block)=>(block.id == $(this).parent().attr("id")))[0].dragging = false;
});


$(document).on("mousemove", function(event){
  event.preventDefault();
  blockPositionChange(event);
});

$("#workspace").on("mousedown", ".block>.main", function(event){
  if(event.which == 3){ //right mouse button, delete
    event.preventDefault();
    for(var i in diagram.state){
      if(diagram.state[i].id == $(this).parent().attr("id")){
        diagram.state.splice(i, 1);
      }
    }
    for(var block of diagram.state){
      for(var input in block.inputs){
        if(block.inputs[input] == $(this).parent().attr("id")){
          delete block.inputs[input];
        }
      }
    }
    $(this).parent().remove();
    events.emit("blockDelete");
  }
});

$(document).on("contextmenu", function(event){
  event.preventDefault();
  return false;
});
