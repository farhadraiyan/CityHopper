const mongoose = require('mongoose');

const Place = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coordinates: {
        type: Point,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Place', Place);