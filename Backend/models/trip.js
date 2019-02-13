const mongoose = require('mongoose')
//const Place = require('./place')

const Trip = mongoose.Schema({
    from: {
        type: mongoose.Schema.ObjectId,
        ref: 'place',
        required: true
    },
    to: {
        type: mongoose.Schema.ObjectId,
        ref: 'place',
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
    seatsAvailable:{
        type:Number,
        required:true
        
    },
    luggage:{
        type:String,
        required:true
    },
    driver: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    passengers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
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
