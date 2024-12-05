const express = require('express');
const connectDB = require('./api/db');
const auth = require('./routes/auth');
const cors = require('cors');

require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());

app.use(cors({
    origin: '*',
}));

app.use('/', auth);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});