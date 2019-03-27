const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    seatCapacity: {
        type: Number,
        required: true
    },
    licencePlateNum: {
        type: String,
        required: true
    },
    luggageCapacity: {
        type: Number,
        required: true
    },
    luggageSize:{
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Car', carSchema);