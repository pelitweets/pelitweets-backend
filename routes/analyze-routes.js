module.exports = function(app) {

    var AnalyzeService = require('../services/analyze-services.js');
    var AddRoute       = require('../util/add-route.js');

    // GET - Update the score of all movies
    var analyzeAllMovies = function(req, res) {

        console.log('GET - routes/analyze-routes.js/analyzeAllMovies');

        AnalyzeService.analyzeAllMovies();

        res.jsonp({result:"analyze started"});
    };

    // Link routes and functions
    AddRoute.addRoute({
        app         : app,
        method      : 'get',
        url         : 'analyze',
        description : 'Analyze and update all the movies',
        callback    : analyzeAllMovies
    });
}
