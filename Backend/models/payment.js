
const mongoose = require('mongoose');

// ***** Build Your Model Schema here *****
const earnings = mongoose.Schema({
    firstName: String,
    lastName:String,
    address: String,
    city: String,
    phoneNumber: String,
    status: String

})

module.exports = mongoose.model('earnings', earningsSchema);
