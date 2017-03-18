var blocks = require("../blocks");
var diagram = require("../diagram");
var events = require("../events.js");
var $ = require("jquery");
var uuid = require("node-uuid");

function blockPositionChange(event){ //fired when a block is moved or added
  var block = diagram.state.filter((block)=>(block.dragging))[0];
  if(block){
    //change position to the event coordinates plus the offset, factoring in the relative positioning of the items on the workspace
    block.position.x = event.pageX - $("#workspace").position().left - block.offset.x;
    block.position.y = event.pageY - $("#workspace").position().top - block.offset.y;

    $("#workspace>.block#" + block.id).css({ //apply new position to element
      left: block.position.x,
      top: block.position.y,
    });

    events.emit("blockMove"); //trigger redraw of lines
  }
}

$("#blocks").on("mousedown", ".block>.main,.block>.inputs", function(event){ //add new block
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
    inputs:
      Object.keys(blocks[$(this).parent().data("type")].inputs) //get input ids
      .reduce((inputs, input)=>{ //turn this into an object
        inputs[input] = {
          joined: "",
          value: blocks[$(this).parent().data("type")].inputs[input].default || "" //use default value if present
        };
        return inputs;
      }, {}),
    properties: {}
  }
  diagram.state.push(newBlock);
  require("./addBlockToPage.js")(newBlock);
  blockPositionChange(event);
});

$("#workspace").on("mousedown", ".block>.main,.block>.inputs", function(event){ //drag start
  if(event.which == 1){ //check left mouse button
    var block = diagram.state.filter((block)=>(block.id == $(this).parent().attr("id")))[0]; //find block
    block.dragging = true;
    block.offset.x = event.pageX - $(this).parent().offset().left; //calculate offset of block from mouse
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
    diagram.state = diagram.state.filter((block)=>(block.id != $(this).parent().attr("id"))); //delete block from array
    for(var block of diagram.state){ //break relatioships
      for(var input in block.inputs){
        if(block.inputs[input].joined == $(this).parent().attr("id")){
          block.inputs[input].joined = "";
        }
      }
    }
    $(this).parent().remove(); //delete element
    events.emit("blockDelete"); //redraw lines
  }
});

$(document).on("contextmenu", function(event){
  event.preventDefault();
  return false;
});
