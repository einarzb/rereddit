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


// Get
// app.get('/', function(req, res, next) {
//   Post.find(function(error, redditdb) {
//     if (error) {
//       console.error(error)
//       return next(error);
//     } else {
//       res.send(redditdb);
//     }
//   });
// });

app.get('/getAll', function (req, res, next) {
    Post.find(function (error, redditdb) {
          if (error) {
            console.error(error)
            return next(error); //express next function. middleware
          } else {
            res.json(redditdb);
            console.log(redditdb);
          }
     });
});

app.post('/posts', function(req, res, next){
  var newPost = new Post(req.body);
  newPost.save(function(err, post){
      if (err){
          console.error(err)
          return next(err);
      } else {
          console.log(post);
          res.json(newPost)
      }
    })
});

//upVote / downVote routes
app.put('/posts/:id', function(req, res, next){
  //posts before change
  Post.find({_id: req.params.id}).exec(function(err, post){
  });
  //posts after voting
  Post.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}).exec(function( err, post){ //pass 3 things: id, req.body, boolean and func
     if(err){
      console.error(err);
      return next (err);
    }else{
      res.send(post);
    }
  });
});


// comment routes
app.post('/comment/:id', function(req,res){
  Post.findOne({_id: req.params.id}, function(err, foundPost){
    if (err){
        console.error(err)
        return next(err);
    } else {
        var newComment = new Comment(req.body);
        foundPost.comments.push(newComment);
        newComment.save();
        foundPost.save();
        res.json(foundPost);
    }
  })
});

//author routes - getting all the author's posts
app.get('/author/:id', function(req,res){
  Post.find({author: req.params.id}, function(err, foundPost){
    if (err){
        console.error(err)
        return next(err);
    } else {
        res.json(foundPost);
        console.log(foundPost);
       }
  });
});

//importent!
app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

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
