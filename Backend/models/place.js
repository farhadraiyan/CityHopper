const mongoose = require('mongoose');

const Place = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: 
    {
        street: {
            type:String,
            required:true
        },
        geoLocationFrom:{
            coordinates:[Number]
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
    },
    navPointType:{
        type:String,
        required:true
    }
    
    

})

module.exports = mongoose.model('Place', Place);