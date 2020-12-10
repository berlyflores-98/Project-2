// d3.json("/genre_country").then(function (genres) {

//     var genre = genres;

// })

// d3.json("/latest_release").then(function (latest_movies) {

//     console.log(latest_movies);

// })

// d3.json("/rating_country").then(function (ratings) {

//     console.log(ratings);

// })

var width = 700,
    height = 700;

var svg = d3.selectAll(".bubblebox")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)");

var simulation = d3.forceSimulation()
    .force("x", d3.forceX(width / 2).strength(0.4))
    .force("y", d3.forceY(height / 2).strength(0.4))
    .force("collide", d3.forceCollide(function(d){
        return radiusScale(d.genreCount) + 1;
    }))

var radiusScale = d3.scaleSqrt().domain([0, 100]).range([10, 80])

d3.json("/genre_country").then(function (genres) {
    
    var circles = svg.selectAll(".bubble")
        .data(genres)
        .enter().append("circle")
        .attr("class", "genre")
        .attr("r", function(d) {
            return radiusScale(d.genreCount);
        })
        .attr("fill", "blue")
        .attr("cx", width/2)
        .attr("cy", height/2)
        
        // circles
        // .append("text")
        // .attr("x", width/2)
        // .attr("y", height/2)
        // .attr("text-anchor", "middle")
        // .text( function(d) {
        //     return d.genre
        // })
        // .style("fill", "white")
        // .style("font-size", "12px");

        simulation.nodes(genres)
        .on("tick", ticked)
    
        function ticked() {
            circles
            .attr("cx", function(d) {
                return d.x
            })
            .attr("cy", function(d) {
                return d.y
            })
        }

});