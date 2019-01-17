
const mongoose = require('mongoose');

// ***** Build Your Model Schema here *****
const earnings = mongoose.Schema({
    name:{
        firstName: {
            type:String
        },
        lastName:{
            type:String
        }
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    country:{
        type:String
    },
    province:{
        type:String
    },
    city:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    termsCondition:{
        type:boolean
    },
    userType:{
        type:String
    }

})

module.exports = mongoose.model('earnings', earningsSchema);
