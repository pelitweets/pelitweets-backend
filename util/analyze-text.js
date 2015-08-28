var rest   = require('./rest.js');
var config = require('./config.js');
var util   = require('./util.js');

var analyzeText = function(options) {

    console.log('util/analyze-text.js/analyzeText');
    //console.log('options=', options);

    var analyzeTextOptions = {};

    analyzeTextOptions.textToAnalyze = options.textToAnalyze  || "";
    analyzeTextOptions.onSuccess     = options.onSuccess      || function(score, scoreTag) {
        console.log("onSuccess function not implemented");
        console.log("textToAnalyze =", analyzeTextOptions.textToAnalyze);
        console.log("score =", score);
        console.log("scoreTag =", scoreTag);
    };
    analyzeTextOptions.onError       = options.onError        || function(error) {
        console.log("onError function not implemented");
        console.log("textToAnalyze =", analyzeTextOptions.textToAnalyze);
        console.log("error =", error);
    };

    var textalyticsOptions = {
        key: config.properties.textalytics.key,
        of: 'json',
        txt: '' + analyzeTextOptions.textToAnalyze
    };

    if (config.properties.textalytics.model) {
        textalyticsOptions.model = config.properties.textalytics.model;
        //console.log('textalyticsOptions.data.model=',config.properties.textalytics.model);
    }

    //console.log('textalyticsOptions =', textalyticsOptions);
    //console.log("textToAnalyze =", analyzeTextOptions.textToAnalyze);

    var processResponse = function(data) {

        //console.log(data);

        var json = data;
        if ( typeof json === 'string' || json instanceof String ) {
            json = JSON.parse(data);
        }

        //console.log(json);

        if (!json.score_tag)  {

            //console.log('error =', data);
            analyzeTextOptions.onError(json);

        } else {


            var score = 5;
            var scoreTag = json.score_tag;
            console.log('scoreTag =', scoreTag);

            switch(scoreTag) {
                case 'P+':
                    score = 9;
                    break;
                case 'P':
                    score = 7;
                    break;
                case 'N':
                    score = 3;
                    break;
                case 'N+':
                    score = 1;
                    break;
            }
            console.log('score =', score);

            var status = json.status || {};
            var credits = json.status.credits;
            var remainingCredits = json.status.remaining_credits;


            console.log('requestCredits =', credits);
            console.log('remainingCredits =', remainingCredits);
            var percentage = Math.round((remainingCredits*100)/500000);
            console.log('remainingCredits = '+percentage+'%');

            analyzeTextOptions.onSuccess(score, scoreTag, credits, remainingCredits);
        }
    };

    rest.post(config.properties.textalytics.url, textalyticsOptions, processResponse);
};

exports.analyzeText = analyzeText;
