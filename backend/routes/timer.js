const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

router.get('/', (req, res) => {
  const status = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/status.json'))
  );
  res.json(status);
});

module.exports = router;
