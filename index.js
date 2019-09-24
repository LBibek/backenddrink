var express = require('express');
var app = express();
var path = require('path');
var expressSession = require('express-session');
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// var cookieParser = require('cookie-parser');
// app.use(cookieParser());
// end
//bodyparser middleware that reads json data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressSession({
    secret: 'ss',
    saveUninitialized: false,
    resave: false
})); //express session
// end
//adding router files
var routes = require('./server/routes/routes.js');
//setting view engine ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//serving static files
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/client')));
app.use(express.static(path.join(__dirname + '/views')));
//use of middleware routes functionality
app.use('/', routes);
//setting port of application
app.listen(9000, function (err) {
    console.log('listening to port 9000');
});
