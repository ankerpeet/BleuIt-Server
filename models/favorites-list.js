var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId

var favListSchema = new mongoose.Schema({
  threadList: { type: Array, required: true},
  // RELATIONSHIPS
  userId: { type: ObjectId, ref: 'User', required: true }
})


var FavList = mongoose.model("FavList", favListSchema);

module.exports = FavList