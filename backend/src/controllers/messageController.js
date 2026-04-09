const Message = require("../models/Message");
const mongoose = require("mongoose");

async function sendMessage(req, res) {
  try {
    const { toUser, text, toModel } = req.body;

    if (!toUser || !toModel) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const fromId = req.user._id;
    if (!fromId) {
      return res.status(400).json({ error: "Invalid sender" });
    }

    const message = await Message.create({
      fromUser: fromId,
      toUser: new mongoose.Types.ObjectId(toUser),
      fromModel: req.role,
      toModel,
      text,
    });

    const savedMessage = await Message.findById(message._id)
      .populate("fromUser", "_id name email")
      .populate("toUser", "_id name email");

    return res.status(201).json({ message: savedMessage });
  } catch (err) {
    console.error("Error in sendMessage:", err);
    return res.status(500).json({
      error: "Failed to send message",
      details: err.message,
    });
  }
}

async function getMessages(req, res) {
  try {
    const currentId = req.user._id;

    let messages = [];

    if (req.role === "Trainer") {
      messages = await Message.find({
        $or: [
          { toUser: currentId, toModel: "Trainer" },
          { fromUser: currentId, fromModel: "Trainer" },
        ],
      })
        .populate("fromUser", "_id name email")
        .populate("toUser", "_id name email")
        .sort({ createdAt: 1 });
    } else if (req.role === "User") {
      messages = await Message.find({
        $or: [
          { toUser: currentId, toModel: "User" },
          { fromUser: currentId, fromModel: "User" },
        ],
      })
        .populate("fromUser", "_id name email")
        .populate("toUser", "_id name email")
        .sort({ createdAt: 1 });
    }

    return res.json({ messages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load messages" });
  }
}

module.exports = { sendMessage, getMessages };