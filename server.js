//package requirements
var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

//routing requirements
// var postsRoutes = require('./routes/postsRoutes');
// var router = require('./routes/authRoutes');
var User = require('./models/userModel');
var Post = require('./models/postModel');
var Comment = require('./models/commentModel');

//on AIR
var app = express();
mongoose.connect('mongodb://localhost/redditdb', function(err) {
    if (err) throw err;
});

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Serve static files in the root directory:
app.use(express.static('public'));
//Serve the node_modules files without the need for full path:
app.use(express.static('node_modules'));
//serve routings
// app.use('/posts', postsRoutes);
// app.use('/auth', authRoutes);
//importent!
app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});


app.get('/get', function(req, res){
  Post.find().exec(function(err, data){
    res.json(data)
  })
});

app.post('/post', function(req, res){
  var newPost = new Post(req.body);
  newPost.save(function(err, post){
    res.json(post)
  })
})

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
