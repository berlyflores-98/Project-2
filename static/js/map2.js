// Creating map object
var map = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 1.5
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
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

  
  //console.log(latest_movies);

  var geojson;

   function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 4,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    })
    layerPopup = L.popup()
           .setLatLng(e.latlng)
           .setContent(countryReleases(e))
            .openOn(map);

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
  //console.log(ratings);

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
     }).on('click', function(ev) {
      releaseInfo(ev); // ev is an event object (MouseEvent in this case)
  }).addTo(map);



  function countryReleases(e){
    var country_movie_total = 0
    for (var p = 0; p < latest_movies.length; p++){
      var country_count_name = e.sourceTarget.feature.properties.ADMIN;
      if (e.sourceTarget.feature.properties.ADMIN === "United States of America"){
        var country_count_name = "United States";
      }
      if(latest_movies[p].countryName === country_count_name||latest_movies[p].countryName === country_count_name+" "){
        country_movie_total++;
      }
  }
  var html_data = `<h5><strong>${e.sourceTarget.feature.properties.ADMIN}</strong></h5><hr> <p> Latest Releases: ${country_movie_total}</p>`;
    return html_data;
}

      function releaseTitles(){
        var html_data = ``;
        html_data = `<h5>${countries.features[i].properties.ADMIN}</h5><hr> `
        for(var m=0;m<mov_data.length;m++){
          if(m<5){
            html_data += `<li>${mov_data[m].title}</li>`
          }
        }
        return html_data;
      }


      function releaseInfo(i){
        
        
        //var click_country= i.layer.feature.properties.ADMIN;
        if(select_countries.includes(i.layer.feature.properties.ADMIN)){
          for(var j = 0; j < ratings.length; j++){
            //console.log(ratings[0].countryName);
            var country_name = ratings[j].countryName;
            if (i.layer.feature.properties.ADMIN === "United States of America"){
              var country_name = "United States of America";
            }
            
            if(i.layer.feature.properties.ADMIN+" " === country_name || i.layer.feature.properties.ADMIN === country_name ){
              
              var country_rating = ratings[j].countryRating;
              var mov_total = 0;
              var mov_data =[];
            for (var k = 0; k < latest_movies.length; k++){
              if(latest_movies[k].countryName === ratings[j].countryName){
                mov_total++;
                mov_data.push({
                  "title": latest_movies[k].title,
                  "image": latest_movies[k].image
                })
              }
          }
          var html_data = `<h5 id = "movie_title"><strong>Latest Releases</strong></h5><p>${i.layer.feature.properties.ADMIN}'s Latest Releases</p><p>Average Movie Rating: ${country_rating}</p><p>Total Latest Releases: ${mov_total}</p><p><strong> Sample list of Latest Titles:</strong></p>`
          for(var m=0;m<mov_data.length;m++){
            if(m<8){
              html_data += `<img src=${mov_data[m].image}" style="max-width:20%; max-height: auto; margin-right: 10px;margin-top: 10px" class="card-img-top center" >`
            }
          }     
        }
        
      }
      if(mov_total>0){
        document.getElementById("movie info").innerHTML = html_data
      }else{
          document.getElementById("movie info").innerHTML = `<h5 id = "movie_title"><strong>Latest Releases</strong></h5><p>${i.layer.feature.properties.ADMIN} has no latest releases</p>`
        }
      }
    }
    // map.on('click', function(e) { 
    //   console.log("World Map");
    //   document.getElementById("movie info").innerHTML = ""

    // })



}
     }
});




    })
});