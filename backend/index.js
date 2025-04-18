const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transactionsRoute = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionsRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
    