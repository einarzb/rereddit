var mongoose = require('mongoose');
var Schema = mongoose.Schema; //the function that constructs objects

var userSchema = new Schema({
  name: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
  // userAccountAge:{type: Number},
});

var User = mongoose.model("User", userSchema);
module.exports = User;
