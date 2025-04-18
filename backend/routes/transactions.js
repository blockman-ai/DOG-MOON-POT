const express = require('express');
const { validateTransaction } = require('../controllers/transactionsController');
const router = express.Router();

router.post('/validate', validateTransaction);

module.exports = router;
