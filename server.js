//package requirements
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');

//routing requirements
// var postsRoutes = require('./routes/postsRoutes');
// var router = require('./routes/authRoutes');
var User = require('./models/userModel');
var Post = require('./models/postModel'); // './' - the root route
var Comment = require('./models/commentModel');

//on AIR
var appName = "rereddit";
var app = express(); //this command creates a server and the root route
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

//populating items from db
app.get('/get', function (req, res, next) {
    Post.find(function (error, redditdb) {
          if (error) {
            console.error(error)
            return next(error); //express next function. middleware
          } else {
            res.send(redditdb);
            // console.log(redditdb);
            // console.log("im einar");
          }
     });
});

//fetching posts id - for populate comment and other use! must use FINDONE only
app.get('/post/:id', function (req, res, next) {
//  console.log(req.params.id);
  //populate comments
  Post.findOne({_id: req.params.id}).populate('comments').exec(function(error, post){
    // console.log("im pupolated in server");
    // console.log(post);
          if (error) {
            console.error(error)
            return next(error); //express next function. middleware
          } else {
            res.send(post);
          }
     });
});


//recaptcha
app.post('/submit',function(req,res){
if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === "" || req.body['g-recaptcha-response'] === null){
  return res.json({"responseCode" : 1, 'responseDesc' : "Please select captcha"});
}
var secretKey = '6LcmyBwUAAAAAF4LQYIRvNC1onxgmumqr6rziVFL';
var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // console.log("im body");
    // console.log(body);
    if(body.success !== undefined && !body.success) {
        return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
      }
    res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
  });
});

//submitting post
app.post('/post', function(req, res, next){
   var newPost = new Post(req.body);
  newPost.save(function(err, post){
      if (err){
          console.error(err)
          return next(err);
      } else {
          //console.log(post);
          res.json(newPost)
      }
    })
});

//removing post
app.delete('/post/:id', function(req,res,next){
  console.log(req.params.id);
  Post.findByIdAndRemove(req.params.id, function(err, foundPost){
    if(err){
      console.error(err);
      return next(err);
    } else {
      res.send(foundPost);
    }
  });
});

//upVote / downVote routes
// app.put('/post/:id', function(req, res, next){
//   //posts before change
//   Post.find({_id: req.params.id}).exec(function(err, post){
//   });
//   //posts after voting
//   Post.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}).exec(function( err, post){ //pass 3 things: id, req.body, boolean and func
//      if(err){
//       console.error(err);
//       return next (err);
//     }else{
//       res.send(post);
//     }
//   });
// });


// add comment routes
app.post('/posts/:id', function(req,res){
  //console.log(req.body); the text of the comment
  //console.log(req.params.id); the id of the post
  Post.findOne({_id: req.params.id}).populate('comments').exec(function(err, foundPost){
    if(err){
      return next(err)
    }else{
      var newComment = new Comment(req.body);
      console.log(newComment); //output id of comment!
      //foundPost.comments is the array of comments of this.post
      //newcomment id is being pushed to the comments array
      foundPost.comments.push(newComment);
      //id is being saved
      newComment.save();
      //full post object with array comments is being saved
      foundPost.save();
      console.log('hhhheeeeerrrre is the populated found post')
      console.log(foundPost);
      res.send(foundPost)
    }
  });
});

//delete comments
app.delete('/posts/:id/comments/:commentID', function(req,res){
  //delete doesnt have req.body only req.params
  console.log("im post id", req.params.id); //the id of the post
  console.log("im comment id", req.params.commentID); //the id of the post
  Comment.findOneAndRemove({_id: req.params.commentID}).exec(function(err, commentRemoved){
    if(err){
      console.error(err)
      return next(err);
    }else{
      var
      console.log('removed comment', commentRemoved);
      res.send(commentRemoved);
    }
  });
});
  Post.findOne({_id: req.params.id}, function(err, foundPost){
    if (err){
        console.error(err)
        return next(err);
    } else {
        var deletedComment = new Comment(req.body);
        console.log(deletedComment); //output id of comment!
        //foundPost.comments is the array of comments of this.post
        //deletedComment id is being deleted to the comments array
        foundPost.comments.splice(deletedComment, 1);
        //id is being saved
        deletedComment.save();
        //full post object with array comments is being saved
        foundPost.save();
        res.json(foundPost);
    }
  })



//author routes - getting all the author's posts
app.get('/author/:id', function(req,res){
  Post.find({author: req.params.id}, function(err, foundPost){
    if (err){
        console.error(err)
        return next(err);
    } else {
       // console.log(foundPost);
       return res.json(foundPost);
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
    console.log("App: "+ appName +" is listening on 2000. run me from http://127.0.0.1:2000/home/");
});
