module.exports = function(app) {

    var AddRoute    = require('../util/add-route.js');
    var Config      = require('../util/config.js');
    var Version     = require('../util/version.js');

    // GET - Return a help in JSON format
    var getHelp = function(req, res) {

        console.log('GET - routes/index-routes.js/getHelp');
        res.jsonp(AddRoute.routes);
    };

    // GET - Return the configuration file in JSON format
    var getConfig = function(req, res) {

        console.log('GET - routes/index-routes.js/getConf');
        var conf = {
            version                 : Version.version,
            environment             : Config.properties.environment,
            tweetsLanguage          : Config.properties.tweetsLanguage,
            twitterSearchOptions    : Config.properties.twitterSearchOptions,
            sendTweet               : Config.properties.sendTweet,
            cacheInMinutes          : Config.properties.cacheInMinutes,
            cacheNoSentiment        : Config.properties.cacheNoSentiment,
            cacheNotAnalyzed        : Config.properties.cacheNotAnalyzed,
            rowLimit                : Config.properties.rowLimit,
        };
        res.jsonp(conf);
    };

    // Link routes and functions
    AddRoute.addRoute({
        app         : app,
        method      : 'get',
        url         : '',
        description : 'Return Tweets Sentiment API description',
        callback    : getHelp
    });
    AddRoute.addRoute({
        app         : app,
        method      : 'get',
        url         : 'config',
        description : 'Return the configuration file in JSON format',
        callback    : getConfig
    });
}
