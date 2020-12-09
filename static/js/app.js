d3.json("/genre_country").then(function (genres) {

    console.log(genres);

})

d3.json("/latest_release").then(function (latest_movies) {

    console.log(latest_movies);

})

d3.json("/rating_country").then(function (ratings) {

    console.log(ratings);

})