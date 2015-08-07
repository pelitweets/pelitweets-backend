var request = require('request');

var post = function(url, json, callback) {

    //console.log('util/rest/request.js/post');key
    //console.log('url =', url);
    //console.log('json =', json);

    var options = {
        url     : url,
        //headers : { Accept: '*/*' },
        //json    : json
        //body    : json
        form    : json
    };

    callback = callback || function(data) {
        console.log("--------------------------------------------------");
        console.log("callback function not implemented");
        console.log('util/rest/request.js/post');
        console.log('url =', url);
        console.log('json =', json);
        console.log('data =', data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");
    };

    request.post(options, function(error, response, data) {
        callback(error || data);
    });
};

exports.post = post;
