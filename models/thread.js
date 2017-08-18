var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId

var threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  img: { type: String, required: false },
  video: { type: String, required: false },
  tags: { type: Array, required: true },
  votes: { type: Number, required: false, default: 0},
  voterList:{ type: Array},

  //RELATIONSHIPS
  userId: { type: ObjectId, ref: 'User', required: true }
})

var Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread