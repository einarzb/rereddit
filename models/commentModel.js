//todo
var mongoose = require('mongoose');
var Schema = mongoose.Schema; //the function that constructs objects

var commentSchema = new Schema({
  post: { type: ref },
  text: {type: String},
  userName: {type: ref}
  //subReddit: {type: String}
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
//todo
