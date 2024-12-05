const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGOURL;

const connectDB = async () => {
    try {
        await mongoose
            .connect(mongoUrl, {})
            .then(() => {
                console.log('MongoDB Connected');
            })
    }
    catch (error) {
        console.error('Connection to MongoDB failed');
        process.exit(1);
    }
}

module.exports = connectDB;