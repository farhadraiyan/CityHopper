const mongoose = require('mongoose')
//const Place = require('./place')

const Trip = mongoose.Schema({
    from: {
        type: mongoose.Schema.ObjectId,
        ref: 'trip',
        required: true
    },
    to: {
        type: mongoose.Schema.ObjectId,
        ref: 'trip',
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    departureTime:{ 
        type: Date, 
        default: Date.now 
    },
    arivalTime:{ 
        type: Date, 
        default: Date.now 
    },
    driver: {
        type: mongoose.Schema.ObjectId,
        ref: 'driver'
    },
    passengers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'passengers'
    }],
    rating: {
        type: Number,
        require: true
    },
    car: {
        type: mongoose.Schema.ObjectId,
        ref: 'car'
    }
})

module.exports = mongoose.model('Trip', Trip);
