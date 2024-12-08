const mongoos = require('mongoose');

const flightSchema = new mongoos.Schema({
    formId: {
        type: String,
        required: true
    },
    toId: {
        type: String,
        required: true
    },
    startData: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    minPrice: {
        type: String,
        required: true
    },
    maxPrice: {
        type: String,
        required: true
    },
    preferences: {
        type: String,
        required: true
    },
    chat: {
        type: String,
        required: true
    }
});

module.exports = mongoos.model('Flight', flightSchema);
