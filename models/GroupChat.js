const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topic: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
});

module.exports = mongoose.model('GroupChat', groupChatSchema);