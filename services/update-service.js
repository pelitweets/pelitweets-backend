var MovieService  = require('./movie-services.js');
var Normalize     = require('../util/normalize-text.js');
var NormalizeText = require('../util/normalize-text.js');
var Config        = require('../util/config.js');
var SearchTweets  = require('../util/search-tweets.js');
var AnalyzeText   = require('../util/analyze-text.js');
var SendTweet     = require('../util/send-tweet.js');
var Mongoose      = require('mongoose');

var analizeAllMovies = function() {

    console.log('analizeAllMovies');

    MovieService.findAllMovies({

        onSuccess: function(movies) {

            console.log(movies.length+' to update');

            for (var i = 0; i < movies.length; i++) {
                analizeMovie(movies[i]);
            }
        },

        onError: function(error) {
            console.log('analizeMovies -> error', error);
        }
    });
};

var analizeMovie = function(movie) {

    console.log('analizeMovie');
    console.log("->"+movie.movie_title);

    SearchTweets.searchTweets({

        textToSearch: "peli " + movie.movie_title,

        onSuccess: function(tweets, tweetsText) {

            var options = {};
            options.movie = movie;
            options.tweets = tweets;
            options.tweetsText = tweetsText;

            processTweets(options);
        },

        onError: function(error) {
            console.log('analizeMovie -> error', error);
        }

    });
};

var processTweets = function(options) {

    console.log('processTweets');
    //console.log('options=', options);

    AnalyzeText.analyzeText({

        textToAnalize: options.tweetsText,

        onSuccess: function(score, scoreTag) {

            options.score = score;
            options.scoreTag = scoreTag;
            console.log('score', score);
            SendTweet.sendTweet(options.movie.movie_title, scoreTag);

            updateMovie(options);
        },

        onError: function(error) {

            console.log('processTweets -> error', error);
        }
    });
};

var isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var ratingAverage = function(movie) {

    var sumRating = 0;
    var ratings = 0;

    if ( isNumber(movie.movie_rating_fa) ) {
        sumRating = movie.movie_rating_fa;
        ratings = ratings + 1;
    }

    if ( isNumber(movie.movie_rating_fa) ) {
        sumRating = movie.movie_rating_fa;
        ratings = ratings + 1;
    }

    if ( isNumber(movie.movie_rating_fa) ) {
        sumRating = movie.movie_rating_fa;
        ratings = ratings + 1;
    }

    return (sumRating / ratings);
}

var updateMovie = function(options) {

    console.log('updateMovie');
    //console.log('options=', options);

    var saveOptions = {};

    var movie = options.movie;

    movie.movie_title_normalized = Normalize.normalizeTitle(options.movie.movie_title);
    movie.movie_rating_score     = options.score;
    movie.movie_rating_score_tag = options.scoreTag;
    movie.movie_rating_average   = ratingAverage(movie);
    movie.movie_text_analyzed    = options.tweetsText;
    movie.movie_tweets_analyzed  = options.tweets;

    saveOptions.movie = movie;

    saveOptions.onSuccess = function(movie) {
        console.log(movie.movie_title + ' updated');
    };

    saveOptions.onError = function(error) {
        console.log('updateMovie -> error', error);
    };

    MovieService.createOrUpdateMovie(saveOptions);
};

exports.analizeAllMovies = analizeAllMovies;
