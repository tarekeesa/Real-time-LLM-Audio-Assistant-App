// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from a .env file into process.env

const app = express();

// Middleware
app.use(cors());  // Enables CORS for all origins, adjust as necessary for production
app.use(express.json());  // Parses incoming JSON requests and puts the parsed data in req.body





// Define routes
app.get('/api/deepgram-key', (req, res) => {
    // Ensure the API key is only sent to authenticated and authorized users
    console.log('process.env.DEEPGRAM_API_KEY',process.env.DEEPGRAM_API_KEY)
    res.json({ apiKey: process.env.DEEPGRAM_API_KEY });

});

// Define a port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use, trying another one...`);
        app.listen(PORT + 1, () => {
            console.log(`Server running on port ${PORT + 1}`);
        });
    } else {
        console.error(err);
    }
});
