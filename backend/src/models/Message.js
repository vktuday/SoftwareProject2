const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "fromModel",
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "toModel",
  },

  fromModel: {
    type: String,
    required: true,
    enum: ["User", "Trainer"],
  },
  toModel: {
    type: String,
    required: true,
    enum: ["User", "Trainer"],
  },

  text: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);