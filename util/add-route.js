var routes = [];

// app, method, url, description, callback
var addRoute = function(options) {

    var method      = options.method;
    var url         = '/api/'+options.url;
    var description = options.description;
    var callback    = options.callback;

    routes.push({
        method      : method,
        url         : url,
        description : description
    });

    switch (method) {
        case "get":
            options.app.get(url, callback);
            break;
        case "post":
            options.app.post(url, callback);
            break;
        case "put":
            options.app.put(url, callback);
            break;
        case "delete":
            options.app.delete(url, callback);
            break;
        default:
            console.log("error", options);
    }
}

exports.routes = routes;
exports.addRoute = addRoute;
