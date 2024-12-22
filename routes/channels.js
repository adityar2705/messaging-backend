const express = require('express');
const router = express.Router();
const Channel = require('../models/Channel.js');
const { checkAuth } = require('../utils/auth.js');

//create a channel
router.post('/', checkAuth, async (req, res, next) => {
  try {
    const { name, companyId } = req.body;

    if (!name || !companyId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({ error: 'Invalid company ID' });
    }

    const newChannel = new Channel({ name, company: companyId });
    await newChannel.save();

    res.status(201).json(newChannel);
  } catch (error) {
    next(error);
  }
});

module.exports = router;