const express = require('express');
const router = express.Router();
const GroupChat = require('../models/GroupChat');
const Message = require('../models/Message'); 
const messageService = require('../services/messageService');
const { checkAuth } = require('../utils/auth');

//create group chat
router.post('/', checkAuth, async (req, res, next) => {
  try {
    const { name, topic, members } = req.body;

    //validate input
    if (!name) {
      return res.status(400).json({ error: 'Missing required field: name' });
    }

    const newGroupChat = new GroupChat({ name, topic, members });
    await newGroupChat.save();

    res.status(201).json(newGroupChat);
  } catch (error) {
    next(error);
  }
});

//get group chat details
router.get('/:id', checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const groupChat = await GroupChat.findById(id).populate('members'); 

    if (!groupChat) {
      return res.status(404).json({ error: 'Group chat not found' });
    }

    res.json(groupChat);
  } catch (error) {
    next(error);
  }
});

//join group chat
router.put('/:id/join', checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; 

    const groupChat = await GroupChat.findById(id);
    if (!groupChat) {
      return res.status(404).json({ error: 'Group chat not found' });
    }

    if (groupChat.members.includes(userId)) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    groupChat.members.push(userId);
    await groupChat.save();

    res.json({ message: 'Joined group chat successfully' });
  } catch (error) {
    next(error);
  }
});

//leave group chat
router.put('/:id/leave', checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const groupChat = await GroupChat.findById(id);
    if (!groupChat) {
      return res.status(404).json({ error: 'Group chat not found' });
    }

    groupChat.members = groupChat.members.filter((memberId) => memberId.toString() !== userId.toString());
    await groupChat.save();

    res.json({ message: 'Left group chat successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;