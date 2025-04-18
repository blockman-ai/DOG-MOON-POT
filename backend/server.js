const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port,() => console.log('Server running on port ${port}'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Correctly serve your static frontend from the proper path
app.use(express.static(path.join(__dirname, '../frontend')));

// Explicit route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
  });

  // Fetch Pot Details
  app.get('/pot-details.json', (req, res) => {
    res.sendFile(path.resolve(__dirname, './data/pot-details.json'));
    });

    // Fetch Entries
    app.get('/entries.json', (req, res) => {
      res.sendFile(path.resolve(__dirname, './data/entries.json'));
      });

      // Enter Lottery
      app.post('/enter', (req, res) => {
        const { wallet } = req.body;
          if (!wallet) return res.json({ success: false, error: "No wallet provided" });

            const entriesPath = path.resolve(__dirname, './data/entries.json');
              const entries = JSON.parse(fs.readFileSync(entriesPath));
                entries.push({ wallet, timestamp: new Date().toISOString() });
                  fs.writeFileSync(entriesPath, JSON.stringify(entries, null, 2));

                    res.json({ success: true });
                    });

                    // Subscribe Emailecho '[]' > backend/data/entries.json
                    app.post('/subscribe', (req, res) => {
                      const { email } = req.body;
                        if (!email) return res.json({ success: false, error: "Email required" });

                          const subscribersPath = path.resolve(__dirname, './data/subscribers.json');
                            const subscribers = JSON.parse(fs.readFileSync(subscribersPath));
                              if (!subscribers.includes(email)) {
                                  subscribers.push(email);
                                      fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));
                                        }

                                          res.json({ success: true });
                                          });

                                          // Start Server
                                          app.listen(port, () => console.log(`Server clearly running on port ${port}`));
