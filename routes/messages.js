const express = require('express');
const router = express.Router();
const messageService = require('../services/messageService.js');

router.post('/group-chats/:groupId', async (req, res, next) => { 
  try {
    const { groupId } = req.params;
    const { content } = req.body; 
    const newMessage = await messageService.createGroupChatMessage(groupId, content);
    res.status(201).json(newMessage); 
  } catch (error) {
    next(error);
  }
});

router.post('/channels/:channelId', async (req, res, next) => { 
  try {
    //logic to send a channel message
  } catch (error) {
    next(error);
  }
});

module.exports = router;