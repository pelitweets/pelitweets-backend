var twitter = require('twitter');
var config  = require('./config.js');

var twit = new twitter(config.properties.twitterCredentials);

var sendTweet = function(movie) {

    console.log('util/send-tweet.js/sendTweet');
    //console.log('movieTitle=', movieTitle);
    //console.log('score=', score);

    if (config.properties.sendTweet) {

        var tweetText = '"'+movie.movie_title+'"';

        if ( tweetText.length < (140-55) && movie.movie_rating_average !== 'NaN') {

            tweetText = tweetText+' tiene una puntuación de '+movie.movie_rating_average;
        }
        
        if ( tweetText.length < (140-55) && movie.movie_rating_score !== 'NaN') {

            tweetText = tweetText+', TWITTER: '+movie.movie_rating_score;
        }

        if ( tweetText.length < (140-55) && movie.movie_rating_fa !== 'NaN') {

            tweetText = tweetText+', FA: '+movie.movie_rating_fa;
        }
        
        if ( tweetText.length < (140-55) && movie.movie_rating_imdb !== 'NaN') {

            tweetText = tweetText+', IMDB: '+movie.movie_rating_imdb;
        }
        
        if ( tweetText.length < (140-45) ) {

            var url = 'http://pelitweets.com/#/'+movie._id;
            tweetText = tweetText+' > '+ url;
        }

        twit.updateStatus(tweetText, function(jsonUpdateStatus) {
            //console.log('jsonUpdateStatus =',jsonUpdateStatus);
            console.log('Sended tweet =',tweetText);
        });
    }
};

exports.sendTweet = sendTweet;
