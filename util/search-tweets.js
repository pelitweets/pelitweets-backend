var Sanitizer       = require('sanitizer');
var twitter         = require('twitter');
var config          = require('./config.js');
var normalizeTweet  = require('./normalize-tweet.js');

var twit = new twitter(config.properties.twitterCredentials);

var defaultSearchOptions = config.properties.twitterSearchOptions;

if (config.properties.tweetsLanguage) {
    defaultSearchOptions.lang = config.properties.tweetsLanguage;
}

var searchTweets = function(options) {

    console.log('util/search-tweets.js/searchTweets');
    //console.log('options=', options);

    var textToSearch      = options.textToSearch  || "";

    options.searchOptions = options.searchOptions || defaultSearchOptions;
    options.onSuccess     = options.onSuccess     || function(tweets, tweetsText) {
        console.log("onSuccess function not implemented");
        console.log("text to search =", textToSearch);
        console.log("tweets processed =", tweets.length);
    };
    options.onError       = options.onError       || function(error) {
        console.log("onError function not implemented");
        console.log("text to search =", textToSearch);
        console.log("error =", error);
    };

    twit.search(textToSearch, options.searchOptions, function(json) {

        if (json.statusCode || !json.statuses) {

            options.onError(json);

        } else  {

            var tweets = [];
            var tweetsText = " ";

            //console.log(json.statuses[0]);

            json.statuses.forEach(function(status){

                var tweet_text       = Sanitizer.sanitize(status.text);
                var tweet_normalized = normalizeTweet.normalizeTweet(tweet_text);
                var tweet_html       = normalizeTweet.parseTweetToHtml(tweet_text);

                var tweet = {
                    id               : status.id_str,
                    avatar           : status.user.profile_image_url_https,
                    username         : Sanitizer.sanitize(status.user.name),
                    nick             : Sanitizer.sanitize(status.user.screen_name),
                    text             : tweet_text,
                    text_normalized  : tweet_normalized,
                    text_html        : tweet_html
                };

                //console.log(tweet.text);
                //console.log(tweet.text_normalized);
                //console.log(tweet.text_html);
                tweets.push(tweet);
                tweetsText = tweetsText+'"'+tweet.text_normalized+'"\n ';
            });

            console.log(tweets.length+' tweets received');

            options.onSuccess(tweets, tweetsText);
        }
    });
};

exports.searchTweets = searchTweets;
