var twitter = require('twitter');
var config  = require('./config.js');

var twit = new twitter(config.properties.twitterCredentials);

var sendTweet = function(movieTitle, score) {

    console.log('util/send-tweet.js/sendTweet');
    //console.log('movieTitle=', movieTitle);
    //console.log('score=', score);

    if (config.properties.sendTweet) {

        var tweetText = '"'+movieTitle+'" tiene una puntuación de '+score;

        if ( tweetText.length < (140-45) ) {

            var url = 'http://pelitweets.com/';

            tweetText = tweetText+' > '+ url;
        }

        twit.updateStatus(tweetText, function(jsonUpdateStatus) {
            //console.log('jsonUpdateStatus =',jsonUpdateStatus);
            console.log('Sended tweet =',tweetText);
        });
    }
};

exports.sendTweet = sendTweet;
