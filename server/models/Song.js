
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  artist: {
    type: String,
    required: [true, 'Artist is required'],
  },
  album: {
    type: String,
    required: [true, 'Album is required'],
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
  },
  songFile: {
    type: String,
    // required: [true, 'Song file is required'],
  },
  imageFile: {
    type: String,
    // required: [true, 'Image file is required'],
  },
});





module.exports = mongoose.model('Song', songSchema);


