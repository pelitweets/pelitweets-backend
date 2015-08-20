var MovieService  = require('./movie-services.js');
var Config        = require('../util/config.js');
var SearchTweets  = require('../util/search-tweets.js');
var AnalyzeText   = require('../util/analyze-text.js');
var SendTweet     = require('../util/send-tweet.js');
var Util          = require('../util/util.js');
var Normalize     = require('../util/normalize-text.js');

var analyzeAllMovies = function() {

    console.log('services/analyze-services.js/analyzeAllMovies');

    MovieService.findMoviesToUpdate({

        onSuccess: function(movies) {

            console.log(movies.length+' movies to update');

            for (var i = 0; i < movies.length; i++) {

                if ( isCacheExpired(movies[i]) ) {

                    console.log('IN CACHE ' + movies[i].movie_title.trim());

                } else {


                    console.log('TO ANALYZE ' + movies[i].movie_title.trim());

                    var options = {};

                    options.index = i;
                    options.movies = movies.length;
                    options.movie = movies[i];
                    options.movie.movie_title = movies[i].movie_title.trim();
                    options.movie.movie_title_normalized = Normalize.normalizeTitle(options.movie.movie_title);
                    options.movie.movie_id_normalized = options.movie.movie_title_normalized+'-'+options.movie._id;

                    if ( Config.properties.searchAndAnalyzeTweets ) {

                        console.log('SEARCH AND ANALYZE TWEETS ' + movies[i].movie_title.trim());
                        searchTweets(options);

                    } else {

                        console.log('ONLY UPDATE ' + movies[i].movie_title.trim());
                        options.tweets = options.movie.tweets;
                        options.tweetsText = options.movie.tweetsText;
                        options.score = options.movie.score;
                        options.scoreTag = options.movie.scoreTag;
                        updateMovie(options);
                    }
                    
                }
            }
        },

        onError: function(error) {
            console.log('analyzeMovies -> error', error);
        }
    });
};

var isCacheExpired = function(movie) {

    //console.log('services/analyze-services.js/isCacheExpired -> movie.movie_title', movie.movie_title);

    var cacheInMinutes = Config.properties.cacheInMinutes;
    //console.log('services/analyze-services.js/isCacheExpired -> cacheInMinutes', cacheInMinutes);

    if ( typeof movie.movie_analyzed_date === "undefined" ) {

        return false;

    } else {

        //console.log('services/analyze-services.js/isCacheExpired -> movie.movie_analyzed_date', movie.movie_analyzed_date);

        var expirationDate = new Date(movie.movie_analyzed_date.getTime() + cacheInMinutes*60000);        
        //console.log('services/analyze-services.js/isCacheExpired -> expirationDate', expirationDate);

        return expirationDate > Date.now();
    }
};

var searchTweets = function(options) {

    console.log('services/analyze-services.js/searchTweets ->', options.movie.movie_title);

    SearchTweets.searchTweets({

        textToSearch: 'pelicula ' + options.movie.movie_title,

        onSuccess: function(tweets, tweetsText) {

            options.tweets = tweets;
            options.tweetsText = tweetsText;

            if ( tweetsText.length < 280 ) {

                updateMovie(options);

            } else {

                processTweets(options);
            }
        },

        onError: function(error) {

            updateMovie(options);

            console.log('searchTweets "'+options.movie.movie_title+'" -> error', error);
        }

    });
};

var processTweets = function(options) {

    console.log('services/analyze-services.js/processTweets');
    //console.log('options =', options);

    AnalyzeText.analyzeText({

        textToAnalyze: options.tweetsText,

        onSuccess: function(score, scoreTag) {

            options.score = score;
            options.scoreTag = scoreTag;

            updateMovie(options);
        },

        onError: function(error) {

            updateMovie(options);

            console.log('processTweets "'+options.movie.movie_title+'" -> error', error);
        }
    });
};

var updateRatings = function(options) {

    console.log('services/analyze-services.js/updateRatings');
    //console.log('options =', options);

    var movie = options.movie;

    var sumRating = 0;
    var ratings = 0;

    if ( Util.isNumber(movie.movie_rating_fa) ) {
        sumRating = sumRating + parseFloat(movie.movie_rating_fa);
        ratings = ratings + 1;
    } else {
        movie.movie_rating_fa = '-';
    }

    if ( Util.isNumber(movie.movie_rating_imdb) ) {
        sumRating = sumRating + parseFloat(movie.movie_rating_imdb);
        ratings = ratings + 1;
    } else {
        movie.movie_rating_imdb = '-';
    }

    if ( Util.isNumber(options.score) ) {
        sumRating = sumRating + parseFloat(options.score);
        ratings = ratings + 1;
        movie.movie_rating_score = options.score;
    } else {
        movie.movie_rating_score = '-';
    }

    movie.movie_rating_average = Util.roundWithDecimals((sumRating / ratings), 1);

    if ( Util.isNumber(movie.movie_rating_average) ) {
        SendTweet.sendTweet(movie);
    } else {
        movie.movie_rating_average = '-';
    }

    movie.movie_rating_score_tag = options.scoreTag;

    return movie;
}

var updateMovie = function(options) {

    console.log('services/analyze-services.js/updateMovie');
    //console.log('options =', options);

    var movie = updateRatings(options);

    movie.movie_analyzed_date    = Date.now();
    movie.movie_text_analyzed    = options.tweetsText;
    movie.movie_tweets_analyzed  = options.tweets;

    var saveOptions = {};
    saveOptions.movie = movie;

    saveOptions.onSuccess = function(movie) {
        console.log('movie updated ('+(options.index+1)+' de '+options.movies+')');
    };

    saveOptions.onError = function(error) {
        console.log('updateMovie "'+movie.movie_title+'" -> error', error);
    };

    MovieService.createOrUpdateMovie(saveOptions);
};

exports.analyzeAllMovies = analyzeAllMovies;
