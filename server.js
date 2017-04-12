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

//populating DB

var user1 = new User ({
  name: "einarzb",
  posts: [],
  comments: []
});

var post = new Post ({
  author: user1._id,
  title: "My first reddit post",
  text: "OMG this is brilliant I'm so excited!",
  link: "http://www.ynet.co.il",
  comments: [],
  upVote: 0,
  downVote: 0
});

var comment = new Comment ({
  author:"talkbacker",
  commentText: "Einar is a great writer, you shold get a politzer",
  post: post._id
});

//save comment
comment.save();

//push
post.comments.push(comment);
user1.comments.push(comment);
user1.posts.push(post);

//save 'em
user1.save();
post.save();

// Start a server listener
app.listen(2000, function() {
    var appName = "rereddit";
    console.log("App: "+ appName +" is listening on 2000. ");
});
