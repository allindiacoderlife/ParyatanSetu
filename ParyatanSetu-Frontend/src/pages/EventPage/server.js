const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cultural_events', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'));

const eventSchema = new mongoose.Schema({
    title: String,
    location: String,
    date: String,
    keywords: String,
    type: String
});

const Event = mongoose.model('Event', eventSchema);

// Sample Data Population (run once)
const sampleData = [
    { title: 'Music Night', location: 'Auditorium', date: '2024-12-15', keywords: 'music', type: 'upcoming' },
    { title: 'Art Show', location: 'Gallery', date: '2024-11-20', keywords: 'art', type: 'past' }
];

Event.insertMany(sampleData);

// API Endpoint
app.get('/api/events', async (req, res) => {
    const { events, location, keywords, from_date, to_date, event_type } = req.query;

    const query = {};

    if (events) query.title = new RegExp(events, 'i');
    if (location) query.location = new RegExp(location, 'i');
    if (keywords) query.keywords = new RegExp(keywords, 'i');
    if (from_date) query.date = { $gte: from_date };
    if (to_date) query.date = { $lte: to_date };
    if (event_type && event_type !== 'all') query.type = event_type;

    const eventsData = await Event.find(query);
    res.json(eventsData);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
