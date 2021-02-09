
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4
    // layers: [Total_Administered, Total_Distributed]
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


var link = "static/data/States_Vaccine.json";

d3.json(link).then(function(response) {
  console.log(response);

  var stateArray= [];
  var data = response.rows;
  for (var i=0;i<data.length; i++){
    stateArray.push([data[i][10], data[i][11], data[i][2]])
  }

  var heat = L.heatLayer(stateArray,{
    radius: 20,
    blur: 35
  }).addTo(myMap);
});
