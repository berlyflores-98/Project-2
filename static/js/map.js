// Creating map object
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 1.5
});

// Adding tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
}).addTo(myMap);

var link = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
var choroplethLayer;

// Grabbing our GeoJSON data..
d3.json(link).then(function (data) {
  // // Creating a GeoJSON layer with the retrieved data
  // L.geoJson(data).addTo(map);

  // Create a new choropleth layer
  choroplethLayer = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "MHI2016",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    }
  })
})
// //need to use the function command to read in data from API
// //then use the onEachFeature function to read it into the map(binds data)
// function filterAPIResponse(key){
//   var country = apiResponse.filter(countryName === key)
//   if (country.length === 0){
//     return 0
//   }
//   else{
//     return country[0]['countryRating']
//   }
// }
// onEachFeature (feature){
//   'rating': filterAPIResponse(feature.properties.ADMIN)
// 