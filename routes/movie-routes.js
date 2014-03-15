module.exports = function(app) {

    var MovieService = require('../services/movie-services.js');
    var Config       = require('../util/config.js');
    var AddRoute     = require('../util/add-route.js');

    // GET - Return all movies in the DB
    var findMovies = function(req, res) {

        console.log('GET - routes/movie-routes.js/findMovies');

        MovieService.findAllMovies({

            onSuccess: function(movies) {
                res.jsonp(movies);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // GET - Return a movie with specified ID
    var findMovie = function(req, res) {

        console.log('GET - routes/movie-routes.js/findMovie');

        var movieId = req.params.movieId;
        console.log('movieId=' + movieId);

        MovieService.findMovieById({

            movieId: movieId,

            onSuccess: function(movie) {
                res.jsonp(movie);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // DELETE - Delete a movie with specified ID
    var deleteMovie = function(req, res) {

        console.log('DELETE - routes/movie-routes.js/deleteMovie');

        /* en el parámetro movie id puede vernir solo el ID de la película
           o puede venir algo del tipo el-titulo-de-la-pelicula-ID */
        var texts = req.params.movieId.slipt('-');
        var movieId = texts[texts.length-1];
        console.log('movieId=' + movieId);

        MovieService.findMovieByIdAndRemove({

            movieId: movieId,

            onSuccess: function(movie) {
                res.jsonp(movie);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // Link routes and functions
    AddRoute.addRoute({
        app         : app,
        method      : 'get',
        url         : 'movies',
        description : 'Return all movies '
                    + '(max='+Config.properties.rowLimit+') ordered by date',
        callback    : findMovies
    });

    AddRoute.addRoute({
        app         : app,
        method      : 'get',
        url         : 'movie/:movieId',
        description : 'Return the movie with the supplied $movieID',
        callback    : findMovie
    });

    if ( Config.properties.showAllRoutes ) {
        AddRoute.addRoute({
            app         : app,
            method      : 'delete',
            url         : 'movie/:movieId',
            description : 'Delete the movie with the supplied $movieID',
            callback    : deleteMovie
        });
    }
}
