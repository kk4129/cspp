const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login.html'); // Redirect to login page after registration
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Invalid username or password');
    }

    // Login success, redirect to a success page or dashboard
    res.redirect('/index.html')
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

module.exports = router;



