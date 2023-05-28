const router = require("express").Router();
const Message = require("../models/Message");

//add a message
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get a message
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/:messageId", async (req, res) => {
  try {
    const messages = await Message.findById({
      _id: req.params.messageId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.delete("/:messageId", async (req, res) => {
  try {
    const messages = await Message.findByIdAndDelete({
      _id: req.params.messageId,
    });
    res.status(200).json("deleted successful message");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
