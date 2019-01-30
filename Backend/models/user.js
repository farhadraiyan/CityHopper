
const mongoose = require('mongoose');

// ***** Build Your Model Schema here *****
const userSchema = mongoose.Schema({
    
    firstName: {
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },    
    email:{
        type: String,    
        required:true
    },
    password:{
        type: String,
        required:true
    },
    salt:{
        type: String
    },
    country:{
        type: String,
        required:true
    },
    province:{
        type: String,
        require:true
    },
    city:{
        type: String,
        required:true
    },
    phoneNumber:{
        type: String,
        required:true
    },
    termsCondition:{
        type: Boolean,
        required:true
    },
    userType:{
        type: String
    },
    cars:[{
        type: mongoose.Schema.ObjectId,
        ref: 'car'
    }] 
})

module.exports = mongoose.model('user', userSchema);
