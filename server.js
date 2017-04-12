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

//body parser
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Load the xample data model/schema -> Use to manipualte data from mongoDB
var userModel = require('./models/userModel');
var commentModel = require('./models/commentModel');
var postModel = require('./models/postModel');
var postModel = require('./models/postModel');

// Start a server listener
app.listen(2000, function() {
    var appName = "rereddit";
    console.log("App: "+ appName +" is listening on 2000. ");

});
