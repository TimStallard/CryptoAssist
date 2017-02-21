var blocks = require("../blocks");
var diagram = require("../diagram.js");
var $ = require("jquery");

function moveLine(elem, a, b, c, d){
  [[a, b], [c, d]] = [[a, b], [c, d]].sort((a, b)=>(a[0] > b[0])); //swap coords based on x-value, a will always be smaller than b
  var l = Math.sqrt(Math.pow(a  - c, 2) + Math.pow(d - b, 2));
  var x = (a + c - l) / 2;
  var y = (b + d) / 2;
  var theta = Math.asin(2 * (y - b) / l);
  $(elem).css({
    left: x,
    top: y,
    width: l - 2,
    transform: "rotate(" + theta + "rad)"
  });
}

var lineStart = [0, 0];
var lineEnd = [0, 0];
var dragging = false;
var startBlock = "";
var endBlock = "";
var endInput = "";

$("#workspace").on("mousedown", ".block>.output", function(event){
  dragging = true;
  $("#workspace").append("<div class='line' id='joiningLine'></div>");
  startBlock = $(this).parent().attr("id");
  lineStart = [event.pageX - $("#workspace").offset().left, event.pageY - $("#workspace").offset().top];
});

$(document).on("mousemove", function(event){
  if(dragging){
    lineEnd = [event.pageX - $("#workspace").offset().left, event.pageY - $("#workspace").offset().top];
    moveLine($(".line"), lineStart[0], lineStart[1], lineEnd[0], lineEnd[1]);
  }
});

$(document).on("mouseup", function(event){
  if(dragging){
    dragging = false;
    $("#joiningLine").remove();
  }
});

$("#workspace").on("mouseup", ".block>.inputs>div", function(event){
  if(dragging){
    endBlock = $(this).parent().parent().attr("id");
    endInput = $(this).attr("id");
    console.log(startBlock, endBlock, endInput);
    var endBlockInstance = diagram.state.filter((block)=>(block.id == endBlock))[0];
    endBlockInstance.inputs[endInput] = startBlock;
    drawJoiningLines();
  }
});

function drawJoiningLines(){
  for(var endBlock of diagram.state){
    for(var input in endBlock.inputs){
      startBlockId = endBlock.inputs[input];
      startBlock = diagram.state.filter((block)=>(block.id == startBlockId))[0];
      lineId = startBlock.id + "-" + endBlock.id + "-" + input;
      if($("#" + lineId).length){
        var line = $("#" + lineId)
      }
      else{
        var line = $("<div class='line' id='" + lineId + "'></div>").appendTo($("#workspace"));
      }

      outputElem = $("#" + startBlock.id).find(".output").eq(0);
      inputElem = $("#" + endBlock.id).find(".inputs>#" + input).eq(0);
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
