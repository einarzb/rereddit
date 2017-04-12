//todo
//each post should have an array of comment ids - suitable for population
var mongoose = require('mongoose');
var Schema = mongoose.Schema; //the function that constructs objects

var postSchema = new Schema({
  title: { type: String },
  text: {type: String},
  link: {type: String},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment' }]
  // image: {type: String}
  //subReddit: {type: String}
  //username
});

var Post = mongoose.model("Post", postSchema);
module.exports = Post;
