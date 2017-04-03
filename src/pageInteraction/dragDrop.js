var blocks = require("../blocks");
var diagram = require("../diagram");
var events = require("../events.js");
var $ = require("jquery");
var uuid = require("node-uuid");

function blockPositionChange(event){ //fired when a block is moved or added
  var block = diagram.state.filter((block)=>(block.dragging))[0];
  if(block){
    //change position to the event coordinates plus the offset, factoring in the relative positioning of the items on the workspace
    block.position.x = window.scrollX + event.clientX - $("#workspace").position().left - block.offset.x;
    block.position.y = window.scrollY + event.clientY - $("#workspace").position().top - block.offset.y;

    if(offY){
      //when off y-axis, move to sit edge of block on axis
      block.position.y = window.scrollY + window.innerHeight - $(block.elem).height() - $("#workspace").position().top;
    }

    if(offX){
      //when off y-axis, move to sit edge of block on axis
      block.position.x = window.scrollX + window.innerWidth - $(block.elem).width() - $("#workspace").position().left;
    }

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
  offX = false;
  offY = false;
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

var timer;
var lastevent;
var startevent;
var offY = false;
var offX = false;
$(document).on("mousemove", ".block", function(e){
  if(diagram.state.filter((block)=>(block.id == $(this).attr("id"))).filter((block)=>(block.dragging)).length){
    //block is being dragged
    lastevent = e;
    if(!offY){
      if(($(this).offset().top + $(this).height() - window.scrollY) > window.innerHeight){
        //block has just moved off the page, start scrolling
        startevent = e;
        offY = true;
      }
    }
    else{
      if(e.clientY < startevent.clientY){
        //user has moved the block back from the boundary, stop
        offY = false;
        blockPositionChange(lastevent);
      }
    }

    if(!offX){
      if(($(this).offset().left + $(this).width() - window.scrollX) > window.innerWidth){
        //block has just moved off the page, start scrolling
        startevent = e;
        offX = true;
      }
    }
    else{
      if(e.clientX < startevent.clientX){
        //user has moved the block back from the boundary, stop
        offX = false;
        blockPositionChange(lastevent);
      }
    }
  }
});

timer = setInterval(function(){
  if(offY){ //scroll in y-direction and update blocks if block is moved off in that direction
    window.scrollBy(0, 2);
  }
  if(offX){ //scroll in x-direction and update blocks if block is moved off in that direction
    window.scrollBy(2, 0);
  }
  if(offX || offY){ //if off in either direction, move the block on the page
    blockPositionChange(lastevent);
  }
}, 3);
