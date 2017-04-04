var events = require("../events.js");
var $ = require("jquery");

function getGroups(text, size){
  return text
  .toLowerCase()
  .split(/[^a-z]/) //split on any non a-z character to get words
  .map((word)=>{ //turn each word into all size-length groups
    groups = []
    for(var i = 0; i <= (word.length - size); i++){
      groups.push(word.substr(i, size));
    }
    return groups;
  })
  .reduce((allGroups, groups)=>( //merge these groups
    allGroups.concat(groups)
  ), []);
}

function getFirstLetters(text){
  return text
  .toLowerCase()
  .split(/[^a-z]/) //split on any non a-z character to get words
  .filter((word)=>(word.length > 0)) //filter out zero length words
  .map((word)=>(word[0])); //return first char
}

function getFrequency(groups){
  return groups
  .reduce((frequencies, group)=>{
    if(!frequencies[group]){ //add to object if not already present
      frequencies[group] = 0;
    }
    frequencies[group] += 1;
    return frequencies;
  }, {})
};

function topGroupsByFrequency(groups, alreadyPercentage){
  var output = {};
  output.labels = Object.keys(groups).sort((a, b)=>(groups[b] - groups[a])).slice(0, 26); //get top 26 titles by key
  output.values = output.labels.map((groupName)=>(groups[groupName]));
  if(!alreadyPercentage){
    var total = Object.values(groups).reduce((a, b)=>(a + b));
    output.values = output.values.map((value)=>(value / total * 100)); //calculates as percentage of all items
  }
  return output;
}


module.exports =  {
  name: "Frequency Analysis",
  inputs: {
    input: {
      name: "Input",
      type: "text",
      required: true,
      inline: false
    }
  },
  output: false,
  execute: function({input}, block){
    var topGroups = {};
    if(!isNaN(parseInt(block.properties.type))){
      //frequency of group with length type
      topGroups = topGroupsByFrequency(getFrequency(getGroups(input, parseInt(block.properties.type))));
    }
    else if(block.properties.type == "first"){
      //first letter of each word
      topGroups = topGroupsByFrequency(getFrequency(getFirstLetters(input, parseInt(block.properties.type))));
    }
    $(block.elem).data("chartTop").data.labels = topGroups.labels;
    $(block.elem).data("chartTop").data.datasets[0].data = topGroups.values;
    $(block.elem).data("chartTop").update();
  },
  size: { //if you change this, update static widths in HTML as well
    height: 400,
    width: 400
  },
  pageBlock: {
    html: `
      <select>
        <option value="1">Single Letters</option>
        <option value="2">Digraphs</option>
        <option value="3">Trigraphs</option>
        <option value="first">1st Letter</option>
      </select>
      <span class="topHidden">
        <div class="canvasContainer">
          <canvas class="chart top" width="380" height="150"></canvas>
        </div>
        <div class="canvasContainer">
          <canvas class="chart bottom" width="380" height="150"></canvas>
        </div>
      </span>
      `,
    js: function(block){
      var standardFrequencies = {
        "1": {a: 8.167, b: 1.492, c: 2.782, d: 4.253, e: 12.702, f: 2.228, g: 2.015, h: 6.094, i: 6.966, j: 0.153, k: 0.772, l: 4.025, m: 2.406, n: 6.749, o: 7.507, p: 1.929, q: 0.095, r: 5.987, s: 6.327, t: 9.056, u: 2.758, v: 0.978, w: 2.36, x: 0.15, y: 1.974, z: 0.074},
        "2": {th: 1.52, he: 1.28, in: 0.94, er: 0.94, an: 0.82, re: 0.68, nd: 0.63, at: 0.59, on: 0.57, nt: 0.56, ha: 0.56, es: 0.56, st: 0.55, en: 0.55, ed: 0.53, to: 0.52, it: 0.5, ou: 0.5, ea: 0.47, hi: 0.46, is: 0.46, or: 0.43, ti: 0.34, as: 0.33, te: 0.27, et: 0.19, ng: 0.18, of: 0.16, al: 0.09, de: 0.09, se: 0.08, le: 0.08, sa: 0.06, si: 0.05, ar: 0.04, ve: 0.04, ra: 0.04, ld: 0.02, ur: 0.02},
        "3": {the: 1.3636489593493786, ing: 0.7262728609096382, and: 0.7216909325651525, ion: 0.6628250374662927, tio: 0.5432009819877033, ent: 0.5302935539742596, for: 0.4364176465207254, ati: 0.42040977561828335, ter: 0.35934740727926423, ate: 0.3318152376738465, ers: 0.3060779039472102, res: 0.280786679167951, her: 0.2793230868699396, est: 0.2682868458761497, com: 0.2678235657432033, pro: 0.2649545115201913, ere: 0.2542082834806153, all: 0.25378437256592273, int: 0.25335782763051096, men: 0.25312595645961633, you: 0.2493700011137761, ons: 0.24523864706698645, our: 0.24466859192459378, con: 0.23825624560930553, are: 0.23536230733045035, tha: 0.23203135274154815},
        first: {a: 11.602, b: 4.702, c: 3.511, d: 2.67, e: 2.007, f: 3.779, g: 1.95, h: 7.232, i: 6.286, j: 0.597, k: 0.59, l: 2.705, m: 4.383, n: 2.365, o: 6.264, p: 2.545, q: 0.173, r: 1.653, s: 7.755, t: 16.671, u: 1.487, v: 0.649, w: 6.753, x: 0.017, y: 1.62, z: 0.034}
      }

      if(block.properties.type){
        block.elem.find("select").val(block.properties.type);
      }
      else{
        block.properties.type = block.elem.find("select").val();
      }

      $(block.elem).find("select").change(function(){
        block.properties.type = block.elem.find("select").val();

        var standardFrequency = standardFrequencies[block.properties.type];
        var standardGroups = topGroupsByFrequency(standardFrequency, true);

        $(block.elem).data("chartBottom").data.labels = standardGroups.labels;
        $(block.elem).data("chartBottom").data.datasets[0].data = standardGroups.values;
        $(block.elem).data("chartBottom").update();

        events.emit("inputChanged");
      });

      var Chart = require("chart.js");
      $(block.elem).data("chartTop", new Chart(
        $(block.elem).find(".chart.top"),
        {
          type: "bar",
          options: {
            title: {
              display: true,
              text: "Input Text Frequency"
            },
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          },
          data: {
            labels: [],
            datasets: [{
              data: [],
              backgroundColor: "rgba(0,0,0,0.5)"
            }]
          }
        }
      ));
      $(block.elem).data("chartBottom", new Chart(
        $(block.elem).find(".chart.bottom"),
        {
          type: "bar",
          options: {
            title: {
              display: true,
              text: "Standard English Frequency"
            },
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          },
          data: {
            labels: [],
            datasets: [{
              data: [],
              backgroundColor: "rgba(0,0,0,0.5)"
            }]
          }
        }
      ));

      $(block.elem).find("select").change();
    }
  }
}
