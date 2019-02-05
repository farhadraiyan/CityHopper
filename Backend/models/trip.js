const mongoose = require('mongoose')
const place = require('./place')

const trip = mongoose.Schema({
    from: {
        type: place,
        required: true
    },
    to: {
        type: place,
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
