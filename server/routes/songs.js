const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Song = require('../models/Song');
const { homedir } = require('os');
// Set up multer for file upload
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, '/uploads/');
 },
 filename: (req, file, cb) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const extname = path.extname(file.originalname);
  cb(null, file.fieldname + '-' + uniqueSuffix + extname);
 },
});
const upload = multer({ storage });
// Create a song
router.post('/add', upload.fields([{ name: 'songFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), async (req, res) => {
 try {
  const { title, artist, album, genre } = req.body;
  const songFile = req.files.songFile[0].path;
  const imageFile = req.files.imageFile[0].path;
  const song = new Song({ title, artist, album, genre , songFile, imageFile});
  await song.save();
  res.status(201).json({ song });
 } catch (error) {
  res.status(400).json({ error: 'Failed to create the song' });
 }
});
// List all songs
router.get('/view', async (req, res) => {
 try {
  const songs = await Song.find();
  res.json({ songs });
 } catch (error) {
  res.status(400).json({ error: 'Failed to fetch songs' });
 }
});
// List selected songs
router.get('/view/:id', async (req, res) => {
    try {
      const { id } = req.params; // Extract the ID from the request parameters
      const song = await Song.findById(id); // Fetch the song by ID
      if (!song) {
        return res.status(404).json({ error: 'Song not found' }); 
      }
      res.json({ song }); 
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// update
router.put('/update/:id', async (req, res) => {
  try {
   const { id } = req.params;
   const { title, artist, album, genre } = req.body;
   
   // Validate if a song exists with the given ID
   const existingSong = await Song.findById(id);
   if (!existingSong) {
     return res.status(404).json({ error: 'Song not found' });
   }
   
   // Update the song's fields and save the changes
   existingSong.title = title;
   existingSong.artist = artist;
   existingSong.album = album;
   existingSong.genre = genre;
   
   // Save the updated song
   await existingSong.save();
   
   // Send a success response
   res.json({ updatedSong: existingSong });
  } catch (error) {
   console.error("Error updating data", error);
   // Handle errors and send a 400 status code with an appropriate error message
   res.status(400).json({ error: 'Bad request. Please check your input.' });
  }
 });
 
 
// Delete a song
router.delete('/delete/:id', async (req, res) => {
 try {
  const { id } = req.params;
  // Validate if a song exists with the given ID
  const existingSong = await Song.findById(id);
  if (!existingSong) {
   return res.status(404).json({ error: 'Song not found' });
  }
  await existingSong.remove();
  res.json({ message: 'Song deleted successfully' });
 } catch (error) {
  res.status(400).json({ error: 'Failed to delete the song' });
 }
});
module.exports = router;
