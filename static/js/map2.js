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

d3.json("/rating_country").then(function (ratings) {
  var ratings = ratings;
  d3.json("/latest_release").then(function (latest_movies) {

    var latest_movies = latest_movies;

d3.json(link).then((data) => {


    var countries = data;
  // console.log(countries);

  
  console.log(latest_movies);

  var geojson;

   function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

    function onEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
         mouseout: resetHighlight,
      });
  }
  console.log(ratings);

     for (var i = 0; i < countries.features.length; i++) {
        if (select_countries.includes(countries.features[i].properties.ADMIN)){
         
          for(var j = 0; j < ratings.length; j++){
            //console.log(ratings[0].countryName);
            var country_name = ratings[j].countryName;
            if (countries.features[i].properties.ADMIN === "United States of America"){
              var country_name = "United States of America";
            }
            
            if(countries.features[i].properties.ADMIN+" " === country_name || countries.features[i].properties.ADMIN === country_name ){
              
              var country_rating = ratings[j].countryRating;
              var mov_total = 0;
              var mov_data =[];
            for (var k = 0; k < latest_movies.length; k++){
              if(latest_movies[k].countryName === ratings[j].countryName){
                mov_total++;
                mov_data.push({
                  "title": latest_movies[k].title
                })
              }
          }

            }
            
        }
          
        geojson = L.geoJson(countries.features[i], {
            // Style each feature (in this case a neighborhood)
            style: function(feature) {
              return {
                color: "white",
                // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                fillColor: "green",
                fillOpacity: 0.5,
                weight: 1.5
              };
            },onEachFeature: onEachFeature
     }).bindPopup(movietitles()).addTo(map);

      function movietitles(){
        var html_data = ``;
        html_data = `<h5>${countries.features[i].properties.ADMIN}</h5> <hr> <p>Average Movie Rating: ${country_rating}</p><p>Total Latest Releases: ${mov_total}</p><p><strong> Sample list of Latest Titles:</strong></p>`
        for(var m=0;m<mov_data.length;m++){
          if(m<5){
            html_data += `<li>${mov_data[m].title}</li>`
          }
        }
        return html_data;
      }
      


    };


}
});




    })
})

  //console.log(genres);




// d3.json("/rating_country").then((data) => {
// function filterAPIResponse(key){
//   var country = apiResponse.filter(countryName === key)
//   if (country.length === 0){
//     return 0
//   }
//   else{
//     return country[0]['countryRating']
//   }
// },  onEachFeature


//   function onEachFeature(feature){
//   layer.on({
//   'countryRating': filterAPIResponse(feature.countryRating)
// });
// }
// })