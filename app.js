const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import route files
const entriesRoute = require('./routes/entries');
const potRoute = require('./routes/pot');
const subscribeRoute = require('./routes/subscribe');

// Routes
app.use('/entries', entriesRoute);
app.use('/pot', potRoute);
app.use('/subscribe', subscribeRoute);

// Test Root Endpoint
app.get('/', (req, res) => {
  res.send("DOG MOON POT Backend Running!");
  });

  // Start Server
  app.listen(port, () => {
    console.log(`Server clearly running on port ${port}`);
    });
    