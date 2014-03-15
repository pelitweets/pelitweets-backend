// configuramos app
var express = require("express");
var path = require("path");
var app = express();

app.configure(function () {
    console.log('Configuring app');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        if ('OPTIONS' == req.method) {
            res.send(200);
        } else {
            next();
        }
    });
    app.use(app.router);
});

// importamos las rutas;
var analyzeRoutes = require('./routes/analyze-routes.js')(app);
var indexRoutes   = require('./routes/index-routes.js')(app);
var movieRoutes   = require('./routes/movie-routes.js')(app);

app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
});

// cargamos la configuracion
var config = require('./util/config.js');
var logEnv = '-----------------------------------------------\n'+
             'NODE_ENV    = '+process.env.NODE_ENV         +'\n'+
             'environment = '+config.properties.environment+'\n'+
             '-----------------------------------------------';
console.log(logEnv);

// arrancamos el servidor
var http = require("http");
var server = http.createServer(app);
var port = process.env.PORT || config.properties.port;
server.listen(port, function () {
    console.log('node server running on port', port);
});

// conectamos con la base de datos
var mongoose = require('mongoose');
mongoose.connect(config.properties.urlMongoDB, function (error, res) {
    if (error) {
        console.log('ERROR: connecting to MongoDB Database. ' + error);
    } else {
        console.log('Connected to MongoDB Database');
    }
});
