const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static frontend files clearly
app.use(express.static(path.join(__dirname, '../frontend')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
  });

  // Fetch Pot Details
  app.get('/pot-details.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/pot-details.json'));
    });

    // Fetch Entries
    app.get('/entries.json', (req, res) => {
      res.sendFile(path.join(__dirname, 'data/entries.json'));
      });

      // Enter Lottery
      app.post('/enter', (req, res) => {
        const { wallet } = req.body;
          if (!wallet) return res.json({ success: false, error: "No wallet provided" });

            const entries = JSON.parse(fs.readFileSync('data/entries.json'));
              entries.push({ wallet, timestamp: new Date().toISOString() });
                fs.writeFileSync('data/entries.json', JSON.stringify(entries, null, 2));

                  res.json({ success: true });
                  });

                  // Subscribe Email
                  app.post('/subscribe', (req, res) => {
                    const { email } = req.body;
                      if (!email) return res.json({ success: false, error: "Email required" });

                        const subscribers = JSON.parse(fs.readFileSync('data/subscribers.json'));
                          if (!subscribers.includes(email)) {
                              subscribers.push(email);
                                  fs.writeFileSync('data/subscribers.json', JSON.stringify(subscribers, null, 2));
                                    }

                                      res.json({ success: true });
                                      });

                                      // Start Server
                                      app.listen(port, () => console.log(`Server running on port ${port}`));
                                      