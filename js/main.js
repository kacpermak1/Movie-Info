$(function() {
  $("#searchForm").on("submit", e => {
    e.preventDefault();
    let searchText = $("#searchText");
    const moviesRow = $("#movies");
    getMovies(searchText.val());
    searchText.val("");
  });

  const getMovies = searchText => {
    axios
      .get("https://www.omdbapi.com/?apikey=fa47d1cc&s=" + searchText)
      .then(res => {
        let movies = res.data.Search;
        let output = "";
        $.each(movies, (index, movie) => {
          output += `
        <div class="col-6 col-md-4 pb-4">
           <div class="p-2 custom-card">
                <div class="well text-center">
                    <img src=${movie.Poster} alt=${movie.Title}/>
                    <h5 class="pt-3 pb-3">${movie.Title}</h5>
                    <a id="movie-details-button" data-id="${movie.imdbID}" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
        </div>`;

          $("#movies").html(output);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  $("#movies").on("click", "a", function() {
    const thisButton = $(this);
    sessionStorage.setItem("movieId", thisButton.attr("data-id"));
    window.location = "movie.html";
    getMovie();
  });

  const getMovie = () => {
    let movieId = sessionStorage.getItem("movieId");

      axios
        .get("https://www.omdbapi.com/?apikey=fa47d1cc&i=" + movieId)
        .then(res => {
          let movie = res.data;
          let output = `
            <div class="row">
                <img class="thumbnail col-md-4" src=${movie.Poster} alt=${movie.Title}/>
                <div class="col-md-8">
                    <h2 class="bg-white text-center">${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
                        <li class="list-group-item"><strong>imdbRating: </strong>${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well col-md-12 pt-3">
                <h3 class="text-white">Plot</h3>
                <p class="text-white">${movie.Plot}</p>
                <hr/>
                <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-secondary">Go back to search</a>
                </div>
            </div>
    `;

          $("#movie").html(output);
        })
        .catch(err => {
          console.log(err);
        });
  };

  getMovie();
});
