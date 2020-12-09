// Creating map object
var map = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 1.5
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
  }).addTo(map);
  

   var link = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";
  //  var link2 =  

var select_countries = ["Argentina","Australia","Belgium", "Brazil", "Canada","Czech Republic","France","Germany","Greece",
"Hong Kong","Hungary","India","Italy","Israel","Japan","Malaysia","Mexico","Netherlands","Poland","Russia","Singapore",
"Slovakia","South Africa","Spain","Sweden","Switzerland","Thailand","Turkey","United Kingdom","United States of America"];

d3.json(link).then((data) => {


    var countries = data;
   console.log(countries);

    // var cleanData = [];
     for (var i = 0; i < countries.features.length; i++) {
        if (select_countries.includes(countries.features[i].properties.ADMIN)){

        L.geoJson(countries.features[i], {
            // Style each feature (in this case a neighborhood)
            style: function(feature) {
              return {
                color: "white",
                // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                fillColor: "green",
                fillOpacity: 0.5,
                weight: 1.5
              };
            },
     }).addTo(map);

    };
}
});

// d3.json(link2).then((data) => {
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
// }