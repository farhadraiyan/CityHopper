const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    make: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    seatCapacity: {
        type: Number,
        require: true
    },
    licencePlateNum: {
        type: String,
        require: true
    },
    luggageCapacity: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('car', carSchema);