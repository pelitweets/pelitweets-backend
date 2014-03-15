var Movie  = require('../models/movie.js');
var Config = require('../util/config.js');

var findAllMovies = function(options) {

    console.log('services/movie-services.js/findAllMovies');
    //console.log('options=', options);

    options.onSuccess = options.onSuccess || function() {
        console.log("onSuccess function not implemented");
    };
    options.onError   = options.onError   || function() {
        console.log("onError function not implemented");
    };

    Movie.find({})
        .sort({'movie_release_date': -1})
        .sort({'movie_rating_average': -1})
        .select('_id '+
                'movie_title '+
                'movie_original_title '+
                'movie_runtime '+
                'movie_plot '+
                'movie_year '+
                'movie_release_date '+
                'movie_country '+
                'movie_rating_fa '+
                'movie_rating_imdb '+
                'movie_rating_score '+
                'movie_rating_score_tag '+
                'movie_rating_average '+
                'movie_official_web '+
                'movie_poster_link '+
                'movie_analyzed_date')
        .limit(Config.properties.rowLimit)
        .exec(function(error, movies) {

        if(!error) {

            printMovies(movies);
            options.onSuccess(movies);

        } else {

            console.log('ERROR retrieving movies: ' + error);
            options.onError(error);
        }
    });
};

var findMovieByTitle = function(options) {

    console.log('services/movie-services.js/findMovieByTitle');
    //console.log('options=', options);

    options.movieTitle  = options.movieTitle || "";
    options.onSuccess   = options.onSuccess || function() {
        console.log("onSuccess function not implemented");
    };
    options.onNotFound  = options.onNotFound  || function() {
        console.log("onNotFound function not implemented");
    };
    options.onError = options.onError     || function() {
        console.log("onError function not implemented");
    };

    Movie.find({'movieText':options.movieTitle})
        .limit(1)
        .exec(function(error, movie) {

        if(!error) {

            if(movie.length > 0) {

                printMovie(movie[0], 'received');
                options.onSuccess(movie[0]);

            } else {

                console.log('movie "' + options.movieText + '" not found');
                options.onNotFound();
            }
        } else {

            console.log('ERROR retrieving movie with movieId="'
                + options.movieId + '": ' + error);
            options.onError(error);
        }
    });
};

var findMovieById = function(options) {

    console.log('services/movie-services.js/findMovieById');
    //console.log('options=', options);

    options.movieId = options.movieId || 0;
    options.onSuccess = options.onSuccess || function() {
        console.log("onSuccess function not implemented");
    };
    options.onError   = options.onError   || function() {
        console.log("onError function not implemented");
    };

    Movie.findById(options.movieId, function(error, movie) {

        if(!error) {

            if(movie) {

                printMovie(movie, 'received');
                options.onSuccess(movie);

            } else {

                var errorMessage = 'Movie not found';
                console.log('ERROR retrieving movie with movieId="' 
                    + options.movieId + '": ' + errorMessage);
                options.onError(errorMessage);
            }
        } else {

            console.log('ERROR retrieving movie with movieId="'
                + options.movieId + '": ' + error);
            options.onError(error);
        }
    });
};

var createOrUpdateMovie = function(options) {

    console.log('services/movie-services.js/createOrUpdateMovie');
    //console.log('options=', options);

    options.onSuccess = options.onSuccess || function() {
        console.log("onSuccess function not implemented");
    };
    options.onError   = options.onError   || function() {
        console.log("onError function not implemented");
    };

    var movie = options.movie || new Movie({
        movie_title:            options.movie_title,
        movie_original_title:   options.movie_original_title,
        movie_runtime:          options.movie_runtime,
        movie_plot:             options.movie_plot,
        movie_year:             options.movie_year,
        movie_release_date:     options.movie_release_date,
        movie_country:          options.movie_country,
        movie_rating_fa:        options.movie_rating_fa,
        movie_rating_imdb:      options.movie_rating_imdb,
        movie_rating_score:     options.movie_rating_score,
        movie_rating_score_tag: options.movie_rating_score_tag,
        movie_rating_average:   options.movie_rating_average,
        movie_official_web:     options.movie_official_web,
        movie_poster_link:      options.movie_poster_link,
        movie_analyzed_date:    options.movie_analyzed_date,
        movie_text_analyzed:    options.movie_last_text_analyzed,
        movie_tweets_analyzed:  options.movie_last_text_tweets_analyzed
    });

    movie.save(function(error, newMovie) {

      if(!error && newMovie) {

        printMovie(movie, 'saved');
        options.onSuccess(newMovie);

      } else {

        console.log('ERROR saving movie: ' + error);
        options.onError(error);
      }
    });
};

var findMovieByIdAndUpdate = function(options) {

    console.log('services/movie-services.js/findMovieByIdAndUpdate');
    //console.log('options=', options);

    findMovieById({
        movieId: options.movieId,
        onSuccess: function(movie) {

            movie.movie_title            = options.movie_title;
            movie.movie_original_title   = options.movie_original_title;
            movie.movie_runtime          = options.movie_runtime;
            movie.movie_plot             = options.movie_plot;
            movie.movie_year             = options.movie_year;
            movie.movie_release_date     = options.movie_release_date;
            movie.movie_country          = options.movie_country;
            movie.movie_rating_fa        = options.movie_rating_fa;
            movie.movie_rating_imdb      = options.movie_rating_imdb;
            movie.movie_rating_score     = options.movie_rating_score;
            movie.movie_rating_score_tag = options.movie_rating_score_tag;
            movie.movie_rating_average   = options.movie_rating_average;
            movie.movie_official_web     = options.movie_official_web;
            movie.movie_poster_link      = options.movie_poster_link;
            movie.movie_analyzed_date    = options.movie_analyzed_date;
            movie.movie_text_analyzed    = options.movie_last_text_analyzed;
            movie.movie_tweets_analyzed  = options.movie_last_text_tweets_analyzed;

            createOrUpdateMovie({
                movie:     movie,
                onSuccess: options.onSuccess,
                onError:   options.onError
            });
        },
        onError : options.onError,
    });

};

var findMovieByIdAndRemove = function(options) {

    console.log('services/movie-services.js/findMovieByIdAndRemove');
    //console.log('options=', options);

    findMovieById({
        movieId: options.movieId,
        onSuccess: function(movie) {

            movie.remove(function(error) {

                if(!error) {

                    printMovie(movie, 'removed');
                    options.onSuccess(movie);

                } else {

                    console.log('ERROR removing movie: ' + error);
                    options.onError(error);
                }
            });
        },
        onError : options.onError
    });
};

var printMovies = function(movies) {

    /*movies.forEach(function(movie){
        printMovie(movie);
    });*/

    console.log(movies.length +' movies received');
};

var printMovie = function(movie, message) {

    if (message) {
        console.log('movie ', message);
    }

    console.log({
        movie_id:               movie._id,
        movie_title:            movie.movie_title,
        movie_rating_fa:        movie.movie_rating_fa,
        movie_rating_imdb:      movie.movie_rating_imdb,
        movie_rating_score:     movie.movie_rating_score,
        movie_rating_average:   movie.movie_rating_average,
        movie_analyzed_date:    movie.movie_analyzed_date
    });
};

exports.findAllMovies          = findAllMovies;
exports.findMovieById          = findMovieById;
exports.findMovieByTitle       = findMovieByTitle;
exports.createOrUpdateMovie    = createOrUpdateMovie;
exports.findMovieByIdAndUpdate = findMovieByIdAndUpdate;
exports.findMovieByIdAndRemove = findMovieByIdAndRemove;
exports.printMovie             = printMovie;
