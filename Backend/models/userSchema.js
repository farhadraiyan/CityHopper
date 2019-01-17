
const mongoose = require('mongoose');

// ***** Build Your Model Schema here *****
const earnings = mongoose.Schema({
    name:{
        firstName: {
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    email:{
        type:String,    
        required:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    province:{
        type:String,
        require:true
    },
    city:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    termsCondition:{
        type:boolean,
        required:true
    },
    userType:{
        type:String
    }

})

module.exports = mongoose.model('user', userSchema);
