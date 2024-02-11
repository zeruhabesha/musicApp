
const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Total number of songs
router.get('/total-songs', async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    res.json({ totalSongs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Other statistics routes...

module.exports = router;
