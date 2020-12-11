// Creating map object
var map = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 1.7
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
  //d3.select(window).on("load", updateBubble);

var select_countries = ["Argentina","Australia","Belgium", "Brazil", "Canada","Czech Republic","France","Germany","Greece",
"Hong Kong S.A.R.","Hungary","India","Italy","Israel","Japan","Malaysia","Mexico","Netherlands","Poland","Russia","Singapore",
"Slovakia","South Africa","Spain","Sweden","Switzerland","Thailand","Turkey","United Kingdom","United States of America", "Iceland"];

d3.json("/rating_country").then(function (ratings) {
  var ratings = ratings;
  d3.json("/latest_release").then(function (latest_movies) {

    var latest_movies = latest_movies;

d3.json(link).then((data) => {


  function chooseColor(country) {
    switch (country) {
    case "Argentina":
      return "darkgoldenrod";
    case "Australia":
      return "red";
    case "Belgium":
      return "orange";
    case "Brazil":
      return "green";
    case "Canada":
      return "purple";
    case "Czech Republic":
      return "blue";
    case "France":
      return "lime";
    case "Germany":
      return "dodgerblue";
    case "Greece":
      return "indigo";
    case "Hong Kong S.A.R.":
      return "orange";
    case "Hungary":
      return "peru";
    case "Iceland":
        return "indigo";
    case "India":
      return "orange";
    case "Italy":
      return "green";
    case "Israel":
      return "purple";
    case "Japan":
      return "blue";
    case "Malaysia":
      return "lime";
    case "Mexico":
      return "navy";
    case "Netherlands":
      return "indigo";
    case "Poland":
      return "purple";
    case "Russia":
      return "fuchsia";
    case "Singapore":
      return "green";
    case "Slovakia":
      return "red";
    case "South Africa":
      return "navy";
    case "Spain":
      return "blue";
    case "Sweden":
      return "gold";
    case "Switzerland":
      return "teal";
    case "Thailand":
      return "silver";
    case "Turkey":
      return "gray";
    case "United Kingdom":
      return "maroon";
    case "United States of America":
      return "orange";
    default:
      return "black";
    }
  }

    var countries = data;
  // console.log(countries);

  
  //console.log(latest_movies);

  var geojson;

   function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 4,
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
    //geojson.resetStyle(e.target);
    var layer = e.target;
    layer.setStyle({
        color: "white",
        fillColor: chooseColor(e.sourceTarget.feature.properties.ADMIN),
        fillOpacity: 0.5,
        weight: 1.5
    })
    layerPopup.remove();
    
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
            if (countries.features[i].properties.ADMIN === "Hong Kong S.A.R."){
              var country_name = "Hong Kong "
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
                fillColor: chooseColor(countries.features[i].properties.ADMIN),
                fillOpacity: 0.5,
                weight: 1.5
              };
            },onEachFeature: onEachFeature
     }).on('click', function(ev) {
      releaseInfo(ev);
      updateBubble(ev);
     
       // ev is an event object (MouseEvent in this case)
  }).addTo(map);



  function countryReleases(e){
    var country_movie_total = 0
    for (var p = 0; p < latest_movies.length; p++){
      var country_count_name = e.sourceTarget.feature.properties.ADMIN;
      if (e.sourceTarget.feature.properties.ADMIN === "United States of America"){
        var country_count_name = "United States";
      }
      if (e.sourceTarget.feature.properties.ADMIN === "Hong Kong S.A.R."){
        var country_count_name = "Hong Kong"
      }
      if(latest_movies[p].countryName === country_count_name||latest_movies[p].countryName === country_count_name+" "){
        country_movie_total++;
      }
  }
  var html_data = `<h5><strong>${e.sourceTarget.feature.properties.ADMIN}</strong></h5><hr> <p> Latest Releases: ${country_movie_total}</p>`;
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
            if (i.layer.feature.properties.ADMIN === "Hong Kong S.A.R."){
              var country_name = "Hong Kong S.A.R."
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
            
              html_data += `<img src=${mov_data[m].image}" style="max-width:10%; max-height: auto; margin-right: 10px;margin-top: 10px" class="card-img-top center" >`
            
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

  function updateBubble(ev){
   // d3.select(".bubblebox").remove();
    d3.select(".bubblebox").select("svg").remove();
      loadbubble(ev);


  }
      var width = 800,
          height = 800;
    
          
  function loadbubble(ev){

  var svg = d3
    .selectAll(".bubblebox")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)");
  
  var simulation = d3
    .forceSimulation()
    .force("x", d3.forceX(width / 2).strength(0.4))
    .force("y", d3.forceY(height / 2).strength(0.4))
    .force(
      "collide",
      d3.forceCollide(function (d) {
        return radiusScale(d.genreCount) + 2;
      })
    );
  
  var radiusScale = d3.scaleSqrt().domain([0, 100]).range([30, 100]);
  
  
  
  d3.json("/genre_country").then(function (genres) {

    var genre_data =[];
        for (var n = 0; n < genres.length; n++){
            var genre_country_name = ev.layer.feature.properties.ADMIN;
             
            if (ev.layer.feature.properties.ADMIN === "United States of America"){
                    var genre_country_name = "United States";
            }
            if (ev.layer.feature.properties.ADMIN === "Hong Kong S.A.R."){
              var genre_country_name = "Hong Kong "
            }
              if(genre_country_name+" " === genres[n].countryName||genre_country_name === genres[n].countryName){
                genre_data.push({
                  "countryName": genres[n].countryName,
                  "genre": genres[n].genre,
                  "genreCount": genres[n].genreCount
                })
              }
          }
    
    console.log(genre_data);

      // For Dragging
  function dragstarted(d) {
    if (!d.active) simulation.alphaTarget(0.3).restart();
    d.subject.fx = d.subject.x;
    d.subject.fy = d.subject.y;
  }
  function dragged(d) {
    d.subject.fx = d.x;
    d.subject.fy = d.y;
  }
  function dragended(d) {
    if (!d.active) simulation.alphaTarget(0);
    d.subject.fx = null;
    d.subject.fy = null;
  }

  var drag = d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
  
    var textAndNodes = svg
      .append("g")
      .selectAll("g")
      .data(genre_data)
      .enter()
      .append("g")
      .call(drag);
  
    var circles = textAndNodes
      .append("circle")
      .attr("r", function (d) {
        return radiusScale(d.genreCount);
      })
      .attr("fill", chooseColor(ev.layer.feature.properties.ADMIN));
  
    var texts = textAndNodes
      .append("text")
      .html(function (d) {
        return "<tspan x='0' dy='0em'>" + d.countryName + "</tspan>" 
             + "<tspan x='0' dy='1.2em'>" +`${d.genre}:${d.genreCount}` + "</tspan>";
      })
      .style("fill", "white")
      .style("color", "white")
      .style("font-size", "12px")
      .style("text-anchor", "middle");
  
    simulation.nodes(genre_data).on("tick", ticked);
  
    function ticked() {
      textAndNodes.attr("transform", function (d) {
        return "translate(" + d.x + ", " + d.y + ")";
      });
    }
  });
    }
}
     }
});
  
    })
});


