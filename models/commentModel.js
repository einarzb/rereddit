//todo
var mongoose = require('mongoose');
var Schema = mongoose.Schema; //the function that constructs objects

var commentSchema = new Schema({
  post:{type: Schema.Types.ObjectId, ref: 'Post' },
  text: {type: String},
  userName: {type: String}
  //subReddit: {type: String}
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
//todo
