var mongoose = require("mongoose");

var tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  threadList: { type: Array, required: true}
})


var Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag