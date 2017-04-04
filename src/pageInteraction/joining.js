var blocks = require("../blocks");
var diagram = require("../diagram");
var events = require("../events.js");
var $ = require("jquery");

function moveLine(elem, a, b, c, d){
  [[a, b], [c, d]] = [[a, b], [c, d]].sort((a, b)=>(a[0] - b[0])); //swap coords based on x-value, a will now be smaller than c
  var l = Math.sqrt(Math.pow(a  - c, 2) + Math.pow(d - b, 2)); //get length of line
  //calculate coords
  var x = (a + c - l) / 2;
  var y = (b + d) / 2;
  //calculate angle - note, JS uses rads by default
  var theta = Math.asin(2 * (y - b) / l);
  $(elem).css({ //apply these to the element
    left: x,
    top: y,
    width: l,
    transform: "rotate(" + theta + "rad)"
  });
}

//global vars for storing state of drag
var lineStart = [0, 0];
var lineEnd = [0, 0];
var dragging = false;
var startBlock = "";
var endBlock = "";
var endInput = "";

$("#workspace").on("mousedown", ".block>.output", function(event){ //drag start
  dragging = true;
  $("#workspace").append("<div class='line' id='joiningLine'></div>");
  startBlock = $(this).parent().attr("id");
  lineStart = [event.pageX - $("#workspace").offset().left, event.pageY - $("#workspace").offset().top]; //calculate + store line start coords
});

$(document).on("mousemove", function(event){
  if(dragging){ //mouse move, so update line
    lineEnd = [event.pageX - $("#workspace").offset().left, event.pageY - $("#workspace").offset().top];
    moveLine($("#joiningLine"), lineStart[0], lineStart[1], lineEnd[0], lineEnd[1]);
  }
});

$(document).on("mouseup", function(event){
  if(dragging){
    dragging = false;
    $("#joiningLine").remove(); //delete the line being drawn - new line will be placed if valid
  }
});

$("#workspace").on("mouseup", ".block>.inputs>div", function(event){
  //store relationship from drag
  //this will execute before the previous function, since this is bound to a deeper element and events bubble up the DOM
  if(dragging){
    //bound to the input div, so this will refer to the input element - parent of parent is block elemnet
    endBlock = $(this).parent().parent().attr("id");
    endInput = $(this).attr("id");
    var endBlockInstance = diagram.state.filter((block)=>(block.id == endBlock))[0]; //find actual block object from ID
    endBlockInstance.inputs[endInput].joined = startBlock;
    //draw lines for link
    drawJoiningLines();
    events.emit("newJoin");
  }
});

$("#workspace").on("mousedown", ".block>.inputs>div", function(event){
  if(event.which == 3){ //right mouse button, delete
    event.preventDefault();
    var blockId = $(this).parent().parent().attr("id")
    var input = $(this).attr("id");
    var block = diagram.state.filter((block)=>(block.id == blockId))[0];
    block.inputs[input].joined = "";
    drawJoiningLines();
    events.emit("joinRemove");
  }
});

//redraw lines when stuff happens
events.subscribe("blockMove", drawJoiningLines);
events.subscribe("blockDelete", drawJoiningLines);
events.subscribe("diagramImport", drawJoiningLines);

function drawJoiningLines(){
  $(".line").remove();
  for(var endBlock of diagram.state){
    for(var input in endBlock.inputs){
      if(endBlock.inputs[input].joined){ //loop through every joined input of every block
        var startBlockId = endBlock.inputs[input].joined;
        var startBlock = diagram.state.filter((block)=>(block.id == startBlockId))[0];
        var lineId = startBlock.id + "-" + endBlock.id + "-" + input;

        var line = $("<div class='line' id='" + lineId + "'></div>").appendTo($("#workspace"));
        var outputElem = $("#" + startBlock.id).find(".output").eq(0);
        var inputElem = $("#" + endBlock.id).find(".inputs>#" + input).eq(0);
        moveLine(
          line,
          startBlock.position.x + (outputElem.outerWidth()/2),
          startBlock.position.y + outputElem.position().top + outputElem.outerHeight(),
          endBlock.position.x + inputElem.position().left + (inputElem.outerWidth()/2),
          endBlock.position.y
        );
      }
    }
  }
}
