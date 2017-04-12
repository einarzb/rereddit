//todo
var mongoose = require('mongoose');
var Schema = mongoose.Schema; //the function that constructs objects

var commentSchema = new Schema({
  author: {type: String},
  commentText: {type: String},
  post:{type: Schema.Types.ObjectId, ref: 'Post' }
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
//todo
