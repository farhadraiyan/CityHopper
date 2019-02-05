const mongoose = require('mongoose')
const Place = require('./place')

const trip = mongoose.Schema({
    from: {
        type: Place.from,
        required: true
    },
    to: {
        type: Place.to,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    departureTime:{
        type: Date,
        required: true
    },
    arrivalTime:{
        type: Date,
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true
    },
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true
    }],
    rating: {
        type: Number,
        require: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car'
    }
})

module.exports = mongoose.model('trip', trip);
