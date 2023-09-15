const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a user by ID
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE a new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE a user by ID
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true } // Return the updated user
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a user by ID
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
