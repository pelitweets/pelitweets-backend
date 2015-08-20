var development = {

    environment             : 'development',
    port                    : 5000,
    urlMongoDB              : process.env.MONGODB_URL,
    twitterCredentials  : {
        consumer_key        : process.env.TWITTER_CONSUMER_KEY,
        consumer_secret     : process.env.TWITTER_CONSUMER_SECRET,
        access_token_key    : process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET
    },
    tweetsLanguage          : 'es', // none (automatic), es, en, fr
    twitterSearchOptions: {
        count               : 100, // max 100
        result_type         : "",  // none(:mixed), recent or popular
    },
    sendTweet               : false,
    cacheInMinutes          : 10,
    textalytics         : {
        key                 : process.env.TEXTALYTICS_KEY,
        url                 : 'https://api.meaningcloud.com/sentiment-2.0',
        model               : 'general_es' // none (automatic), general_es, general_en, general_fr
    },
    rowLimit                : 10,
    showAllRoutes           : true,
    searchAndAnalyzeTweets  : true
}

var stage = {

    environment             : 'stage',
    port                    : 5000,
    urlMongoDB              : process.env.MONGODB_URL,
    twitterCredentials  : {
        consumer_key        : process.env.TWITTER_CONSUMER_KEY,
        consumer_secret     : process.env.TWITTER_CONSUMER_SECRET,
        access_token_key    : process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET
    },
    tweetsLanguage          : 'es', // none (automatic), es, en, fr
    twitterSearchOptions: {
        count               : 100, // max 100
        result_type         : "",  // none(:mixed), recent or popular
    },
    sendTweet               : false,
    cacheInMinutes          : 1,
    textalytics         : {
        key                 : process.env.TEXTALYTICS_KEY,
        url                 : 'https://api.meaningcloud.com/sentiment-2.0',
        model               : 'general_es' // none (automatic), general_es, general_en, general_fr
    },
    rowLimit                : 100,
    showAllRoutes           : true,
    searchAndAnalyzeTweets  : true
}

var production = {

    environment             : 'production',
    port                    : 5000,
    urlMongoDB              : process.env.MONGODB_URL,
    twitterCredentials  : {
        consumer_key        : process.env.TWITTER_CONSUMER_KEY,
        consumer_secret     : process.env.TWITTER_CONSUMER_SECRET,
        access_token_key    : process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET
    },
    tweetsLanguage          : 'es', // none (automatic), es, en, fr
    twitterSearchOptions: {
        count               : 100, // max 100
        result_type         : "",  // none(:mixed), recent or popular
    },
    sendTweet               : true,
    cacheInMinutes          : 1440,
    textalytics         : {
        key                 : process.env.TEXTALYTICS_KEY,
        url                 : 'https://api.meaningcloud.com/sentiment-2.0',
        model               : 'general_es' // none (automatic), general_es, general_en, general_fr
    },
    rowLimit                : 100,
    showAllRoutes           : false,
    searchAndAnalyzeTweets  : true
}

var env = process.env.NODE_ENV;

switch (env) {
    case 'stage':
        exports.properties = stage;
        break;
    case 'development':
        exports.properties = development;
        break;
    default:
        exports.properties = production;
        break;
}
