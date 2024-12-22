const Message = require('../models/Message');
const GroupChat = require('../models/GroupChat'); 

const createGroupChatMessage = async (groupId, content) => {
  try {
    const groupChat = await GroupChat.findById(groupId);
    if (!groupChat) {
      throw new Error('Group chat not found');
    } 

    const newMessage = new Message({ sender: req.user._id, content }); 
    await newMessage.save();
    groupChat.messages.push(newMessage); 
    await groupChat.save(); 

    return newMessage;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createGroupChatMessage,
};