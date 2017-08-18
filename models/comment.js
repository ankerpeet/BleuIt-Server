var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId

var commentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  votes: { type: Number, required: true, default: 0},
  voterList: { type: Array },

  // RELATIONSHIPS
  userId: { type: ObjectId, ref: 'User', required: true },
  threadId: { type: ObjectId, ref: 'Thread', required: true }
})


var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment