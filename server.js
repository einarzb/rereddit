//todo
//middleware, routes

var express = require('express');
var app = express();

//Serve static files in the root directory:
app.use(express.static('public'));
//Serve the node_modules files without the need for full path:
app.use(express.static('node_modules'));

// Mongoose for mongoDB connection:
var mongoose = require('mongoose');

//Connect to mongo database:
mongoose.connect('mongodb://localhost/redditdb', function(err) {
    if (err) throw err;
});

//passport authentication
var passport = require('./models/passport');

//body parser
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Load the data model/schema -> Use to manipualte data from mongoDB
var User = require('./models/userModel');
var Post = require('./models/postModel');
var Comment = require('./models/commentModel');

//404 error
app.use(function(req, res, next){
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// main error handler -  warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

// Start a server listener
app.listen(2000, function() {
    var appName = "rereddit";
    console.log("App: "+ appName +" is listening on 2000. ");
});
