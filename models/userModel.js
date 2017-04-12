var mongoose = require('mongoose');
var Schema = mongoose.Schema; //the function that constructs objects

var userSchema = new Schema({
  name: { type: String },
  posts: [{ type: String }], //should be ref to other schema
  comments: [{ type: String }], //should be ref to other schema
  // userAccountAge:{type: Number},
  upVote:  {type: Number },
  downVote: {type: Number }
});

var User = mongoose.model("User", userSchema);
module.exports = User;
