// d3.json("/genre_country").then(function (genres) {

//     var genre = genres;

// })

// d3.json("/latest_release").then(function (latest_movies) {

//     console.log(latest_movies);

// })

// d3.json("/rating_country").then(function (ratings) {

//     console.log(ratings);

// })

// var width = 700,
//     height = 700;

// var svg = d3.selectAll(".bubblebox")
//     .append("svg")
//     .attr("height", height)
//     .attr("width", width)
//     .append("g")
//     .attr("transform", "translate(0,0)");

// var simulation = d3.forceSimulation()
//     .force("x", d3.forceX(width / 2).strength(0.4))
//     .force("y", d3.forceY(height / 2).strength(0.4))
//     .force("collide", d3.forceCollide(function(d){
//         return radiusScale(d.genreCount) + 1;
//     }))

// var radiusScale = d3.scaleSqrt().domain([0, 100]).range([10, 80])

// d3.json("/genre_country").then(function (genres) {
    
//     var circles = svg.selectAll(".bubble")
//         .data(genres)
//         .enter().append("circle")
//         .attr("class", "genre")
//         .attr("r", function(d) {
//             return radiusScale(d.genreCount);
//         })
//         .attr("fill", "blue")
//         .attr("cx", width/2)
//         .attr("cy", height/2)
        
//         // circles
//         // .append("text")
//         // .attr("x", width/2)
//         // .attr("y", height/2)
//         // .attr("text-anchor", "middle")
//         // .text( function(d) {
//         //     return d.genre
//         // })
//         // .style("fill", "white")
//         // .style("font-size", "12px");

//         simulation.nodes(genres)
//         .on("tick", ticked)
    
//         function ticked() {
//             circles
//             .attr("cx", function(d) {
//                 return d.x
//             })
//             .attr("cy", function(d) {
//                 return d.y
//             })
//         }

// });


// // -----------------------------------------------------


// // Version 2


// var width = 700,
//   height = 700;

// var svg = d3
//   .selectAll(".bubblebox")
//   .append("svg")
//   .attr("height", height)
//   .attr("width", width)
//   .append("g")
//   .attr("transform", "translate(0,0)");

// var simulation = d3
//   .forceSimulation()
//   .force("x", d3.forceX(width / 2).strength(0.4))
//   .force("y", d3.forceY(height / 2).strength(0.4))
//   .force(
//     "collide",
//     d3.forceCollide(function (d) {
//       return radiusScale(d.genreCount) + 1;
//     })
//   );

// var radiusScale = d3.scaleSqrt().domain([0, 100]).range([10, 80]);

// d3.json("/genre_country").then(function (genres) {
//   var textAndNodes = svg
//     .append("g")
//     .selectAll("g")
//     .data(genres)
//     .enter()
//     .append("g");

//   var circles = textAndNodes
//     .append("circle")
//     .attr("r", function (d) {
//       return radiusScale(d.genreCount);
//     })
//     .attr("fill", "blue");

//   var texts = textAndNodes
//     .append("texts")
//     .append("text")
//     .text(function (d) {
//       return d.genre;
//     })
//     .style("fill", "white")
//     .style("font-size", "12px");

//   simulation.nodes(genres).on("tick", ticked);

//   function ticked() {
//     circles
//     .attr("cx", d => d.x)
//     .attr("cy", d => d.y)

//     texts
//       .attr('x', d => d.x)
//       .attr('y', d => d.y)
//   }
// });


//-----------------------------------------------------------------------------------------

//Version 3 - Bubble Chart

//-----------------------------------------------------------------------------------------



var width = 700,
  height = 700;

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

var radiusScale = d3.scaleSqrt().domain([0, 100]).range([10, 80]);



d3.json("/genre_country").then(function (genres) {

    function chooseColor(country) {
        switch (country) {
        case "Argentina ":
          return "darkgoldenrod";
        case "Australia ":
          return "red";
        case "Belgium ":
          return "orange";
        case "Brazil ":
          return "green";
        case "Canada ":
          return "purple";
        case "Czech Republic ":
          return "blue";
        case "France ":
          return "lime";
        case "Germany ":
          return "dodgerblue";
        case "Greece ":
          return "indigo";
          case "Hong Kong ":
          return "yellow";
        case "Hungary ":
          return "peru";
        case "India ":
          return "orange";
        case "Italy ":
          return "green";
        case "Israel ":
          return "purple";
        case "Japan ":
          return "blue";
        case "Malaysia ":
          return "lime";
        case "Mexico ":
          return "navy";
        case "Netherlands ":
          return "indigo";
        case "Poland ":
          return "purple";
        case "Russia":
          return "fuchsia";
        case "Singapore ":
          return "green";
        case "Slovakia ":
          return "red";
        case "South Africa":
          return "navy";
        case "Spain ":
          return "blue";
        case "Sweden ":
          return "gold";
        case "Switzerland ":
          return "teal";
        case "Thailand ":
          return "silver";
        case "Turkey ":
          return "gray";
        case "United Kingdom":
          return "maroon";
        case "United States":
          return "orange";
        default:
          return "black";
        }
      }
    console.log(genres);
  // For Dragging
//   function dragstarted(d) {
//     if (!d.active) simulation.alphaTarget(0.3).restart();
//     d.subject.fx = d.subject.x;
//     d.subject.fy = d.subject.y;
//   }
//   function dragged(d) {
//     d.subject.fx = d.x;
//     d.subject.fy = d.y;
//   }
//   function dragended(d) {
//     if (!d.active) simulation.alphaTarget(0);
//     d.subject.fx = null;
//     d.subject.fy = null;
//   }

//   var drag = d3
//     .drag()
//     .on("start", dragstarted)
//     .on("drag", dragged)
//     .on("end", dragended);

  var textAndNodes = svg
    .append("g")
    .selectAll("g")
    .data(genres)
    .enter()
    .append("g");
    // .call(drag);

  var circles = textAndNodes
    .append("circle")
    .attr("r", function (d) {
      return radiusScale(d.genreCount);
    })
    .attr("fill", function (d) {
        return chooseColor(d.countryName)
    });
//console.log(d.countryName)
  var texts = textAndNodes
    .append("text")
    .html(function (d) {
        return "<tspan x='0' dy='0em'>" + d.countryName + "</tspan>" 
             + "<tspan x='0' dy='1.2em'>" +`${d.genre}:${d.genreCount}` + "</tspan>";
      })
    .style("fill", "white")
    .style("color", "white")
    .style("font-size", "8px")
    .style("text-anchor", "middle");

  simulation.nodes(genres).on("tick", ticked);

  function ticked() {
    textAndNodes.attr("transform", function (d) {
      return "translate(" + d.x + ", " + d.y + ")";
    });
  }
});


