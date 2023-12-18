const express = require('express');
var router = express.Router();
const {poolConnect} = require('../conn/config');
const {pool} = require('../conn/config');
const User = require('../models/userModel');

router.get('/', async (req, res) => {
    await poolConnect;
    try {
      const users = await User.getAllUsers(pool);
      res.json(users);
  
    } catch (err) {
      console.error('Greška pri izvršavanju upita:', err);
      res.status(500).json({ error: 'Greška pri izvršavanju upita' });
    }
});


module.exports = router;