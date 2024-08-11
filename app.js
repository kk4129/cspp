require('dotenv').config();  // Load environment variables from .env file
const express = require('express');  // Import express
const mongoose = require('mongoose');  // Import mongoose
const bodyParser = require('body-parser');  // Import body-parser
const path = require('path');  // Import path

const app = express();  // Create an express app

app.use(bodyParser.urlencoded({ extended: true }));  // Middleware for parsing URL-encoded bodies
app.use(bodyParser.json());  // Middleware for parsing JSON bodies

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route to serve login.html
app.get('/login', (req, res) => {
  console.log('Serving login.html');
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route for authentication (example placeholder)
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
