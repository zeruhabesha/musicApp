// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const songRoutes = require('./routes/songs');
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/songsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.use('/api/songs', songRoutes);

// Serve static files
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
