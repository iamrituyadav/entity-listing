const mongoose = require("mongoose");

const addSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  address: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("add", addSchema);
