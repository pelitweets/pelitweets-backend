module.exports = function(app) {

    var MovieService = require('../services/movie-services.js');
    var Config       = require('../util/config.js');
    var AddRoute     = require('../util/add-route.js');

    // GET - Return all movies in the DB
    var findAllMovies = function(req, res) {

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

    // GET - Return all movies by rating
    var findAllMoviesByRating = function(req, res) {

        console.log('GET - routes/movie-routes.js/findAllMoviesByRating');

        MovieService.findAllMoviesByRating({

            onSuccess: function(movies) {
                res.jsonp(movies);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };
    
    // GET - Return movies to update
    var findMoviesToUpdate = function(req, res) {

        console.log('GET - routes/movie-routes.js/findMoviesToUpdate');

        MovieService.findMoviesToUpdate({

            onSuccess: function(movies) {
                res.jsonp(movies);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };
        
    // GET - Search movies by title
    var searchByTitle = function(req, res) {

        console.log('GET - routes/movie-routes.js/searchByTitle');

        var movieTitle = req.params.title
        console.log('movieTitle=' + movieTitle);
        
        MovieService.searchByTitle({

            movieTitle: movieTitle,
            
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
        
        /* en el parámetro movie id puede vernir solo el ID de la película
           o puede venir algo del tipo el-titulo-de-la-pelicula-ID */
        var texts = req.params.movieId.split('-');
        var movieId = texts[texts.length-1];
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
        var texts = req.params.movieId.split('-');
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
                    + '(max='+Config.properties.rowLimit+') ordered by released date and score',
        callback    : findAllMovies
    });

    AddRoute.addRoute({
        app         : app,
        method      : 'get',
        url         : 'movies-by-rating',
        description : 'Return all movies by rating'
                    + '(max='+Config.properties.rowLimit+') ordered by score',
        callback    : findAllMoviesByRating
    });

    AddRoute.addRoute({
        app         : app,
        method      : 'get',
        url         : 'movies-to-update',
        description : 'Return all movies to update'
                    + '(max='+Config.properties.rowLimit+') ordered by updated date',
        callback    : findMoviesToUpdate
    });

    AddRoute.addRoute({
        app         : app,
        method      : 'get',
        url         : 'search/:title',
        description : 'Return the movies with the supplied $title',
        callback    : searchByTitle
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
