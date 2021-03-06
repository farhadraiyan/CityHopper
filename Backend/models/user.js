const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const keys = require('./../config/config')
const privateKey = fs.readFileSync("../Backend/keys/privateKey.key", 'utf-8');


// ***** USER Model Schema *****
const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    tempToken: {
        type: String,
        required: true
    },
    country: {

        type: String,
        required: true
    },
    province: {
        type: String,
        require: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    termsCondition: {
        type: Boolean,
        required: true
    },
    userType: {
        type: String
    },
    cars: [{
        type: mongoose.Schema.ObjectId,
        ref: 'car'
    }],
    profilePicture: {
        type: mongoose.Schema.ObjectId,
        ref: 'image',
    },
    imageUrl: {
        type: String
    },
    ratings: {
        tyep: Number
    },
    trips: {
        type: Number
    },
    dateOfBirth: {
        type: String
    },
    description: {
        type: String
    }
});

// Setting Salt and hash for user password
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    console.log(this.salt);
    // var buffer = new Buffer(this.salt, 'binary')
    // console.log(buffer);
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    console.log(this.hash);
    return this.hash
};

// Varifying User Password
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    console.log(this.hash === hash) // Should return true
    return this.hash === hash
}

//------Generate authentication token

// this function send a JS Object with the intended data as a token and a secret algorithm,
// the exp data will be set 7 days in advanced before the token expires. 
userSchema.methods.generateJwt = function () {
    var expiry = new Date()
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        //phoneNumber: this.phoneNumber,
        exp: parseInt(expiry.getTime / 1000)
    }, privateKey)
}

userSchema.methods.email_generateJwt = function () {
    var expiry = new Date()
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        //phoneNumber: this.phoneNumber,
        exp: parseInt(10000000000)
    }, keys.EMAIL_SECRET)
}


module.exports = mongoose.model('user', userSchema);


// function setPassword(password){
//     this.salt = crypto.randomBytes(16).toString('hex');
// //     console.log(this.salt);
// //     // var buffer = new Buffer(this.salt, 'binary')
// //     // console.log(buffer);
//      this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//      console.log(this.hash)
// }
// setPassword("HelloWorld")