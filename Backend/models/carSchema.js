const mongoose = require('mongoose');

// Car Schema 

const carSchema = mongoose.Schema({
    make: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    year: {
        type: String,
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
        type: String,
        require: true
    },
    licencePlateNum: {
        type: String,
        require: true
    },
    luggageCapacity: {
        type: String,
        require: true
    }
    
})

module.exports = mongoose.exports('cars', carSchema);