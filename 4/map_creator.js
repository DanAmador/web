
var svgheight = 300;
var barheight = 0.6 * svgheight;
var svgwidth = 500;
var measures = "px";
var lastSelected;

var svgs1 = d3.select("#bar1").append("svg").attr("id", "svgs1");
var svgs2 = d3.select("#bar2").append("svg").attr("id", "svgs2");

svgs1.style("height", svgheight + measures).style("width", svgwidth + measures);
svgs2.style("height", svgheight + measures).style("width", svgwidth + measures);
d3.select("#barcontainer").style("width", svgwidth + measures);

var map = L.map('map');
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osm = new L.TileLayer(osmUrl);
map.setView(new L.LatLng(51.3, 0.7), 2);
map.addLayer(osm);

var marker = new Array();

buildD3Components(1)
buildD3Components(2)


//baut die leaflet karte mit markers 
function buildLeaflet() {

  marker.length = 0;
  for (let l = 0; l < world_data.length; ++l) {
    var lat = world_data[l].gps_lat;
    var long = world_data[l].gps_long;
    var m = new L.marker([lat, long]);
    //jedes marker muss eine id mit 3 stellen haben
    if (l + 1 < 10) { m._mid = "00" + (l + 1); }
    else if (l + 1 >= 10 && l < 100) { m._mid = "0" + (l + 1); }
    else { m._mid = (l + 1); }
    m.addTo(map);
    m._icon.attributes[0].value = "unselected.png";

    marker.push(m);
    m.bindPopup(lastSelected + "<br/>from:" + world_data[l].name + "<br/>" + world_data[l][lastSelected]).closePopup();
    m.on('mouseover', (function (s) {
      return function () {
        select_markers('1', s._mid);
        select_markers('2', s._mid);
      }
    })(m));
    m.on('mouseout', (function (s) {
      return function () {
        unselect_markers('1', s._mid);
        unselect_markers('2', s._mid);
      }
    })(m));
  }
}



//Gloable funktionen für die D3 und leaflet interaktiopn 
function select_markers(idx, id) {
  document.getElementsByClassName(id)[idx - 1].style = "fill : navy";
  marker[parseInt(id) - 1]._icon.attributes[0].value = "marker.png";


}

function unselect_markers(idx, id) {
  document.getElementsByClassName(id)[idx - 1].style = "fill : gray";
  marker[parseInt(id) - 1]._icon.attributes[0].value = "unselected.png";
}



//baut den d3 komponenten mit callbacks für updates 
function buildD3Components(idx) {
  function barChange(select_id) {
    buildLeaflet();

    var selected = lastSelected
    var minr = 0;
    var maxr = d3.max(world_data, function (d) { return d[selected] });
    var max = d3.max(world_data, function (d) { return d[selected] });
    var min = d3.min(world_data, function (d) { return d[selected] });
    if (min < 0) {
      max -= min;
      minr = min;
    }

    var val = max / barheight;

    var affected_component = select_id == 1 ? d3.select("#svgs1") : d3.select("#svgs2");
    affected_component.selectAll("rect").remove();
    affected_component.selectAll("g").remove();
    var scaler = d3.scale.linear()
      .domain([maxr, minr])
      .range([0, barheight]);
    var axis = d3.svg.axis()
      .scale(scaler)
      .orient("left");
    affected_component.append("g")
      .attr("transform", "translate(40, 0)")
      .attr("font-size", 8)
      .call(axis);
    affected_component.selectAll("rect")
      .data(world_data)
      .enter()
      .append("rect")
      .attr("x", function (d, i) { return (i * 15) + 50; })
      .attr("y", function (d) {
        let sel_val = d[selected]
        if (sel_val < 0) { return barheight + (min / val) + measures; }
        else {
          return min > 0 ? barheight - (sel_val / val) + measures :
            barheight - ((sel_val - min) / val) + measures;
        }
      })
      .attr("width", "14px")
      .attr("height", function (d) {
        if (d[selected] < 0) { return d[selected] * (-1) / val + measures; }
        else { return d[selected] / val + measures; }
      })
      .attr("class", function (d) { return d.id; })
      .attr("onmouseover", function (d) { return "select_markers('" + select_id + "','" + d.id + "')"; })
      .attr("onmouseout", function (d) { return "unselect_markers('" + select_id + "','" + d.id + "')"; })
      .style("fill", "gray");

  }
  function buildLegend(select_id) {
    var svg_comp = select_id == 1 ? d3.select("#svgs1") : d3.select("#svgs2");

    svg_comp.selectAll("text")
      .data(world_data)
      .enter()
      .append("text")
      .text(function (d) { return d.name; })
      .attr("x", barheight + 3 + measures)
      .attr("y", function (d, i) {
        return (-i * 15) - 55;
      })
      .attr("transform", "rotate(90)")
      .attr("font-size", "10")
      ;
  }

  let keys = Object.keys(world_data[0]).splice(2, 10)
  d3.select("#bar" + idx)
    .insert("select", ":first-child")
    .attr("id", function (d) { return "select" + idx })
    .on("change", function () {
      lastSelected = this.value;
      barChange(idx)
    })
    .selectAll("option")
    .data(keys)
    .enter()
    .append("option")
    .attr("value", function (d) { return d; })
    .text(function (d) { return d; });


  lastSelected = keys[0]

  buildLegend(1);
  buildLegend(2);

  barChange(1);
  barChange(2);

}
