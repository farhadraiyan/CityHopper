const mongoose = require('mongoose');

// ***** Build Your Model Schema here *****
const earnings = mongoose.Schema({
    tripEarnings: String,
    paidTrips: String,
    tips:String,
    balance:string
})

module.exports = mongoose.model('earnings', earningsSchema);
