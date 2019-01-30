const mongoose = require('mongoose');

// ***** Build Your Model Schema here *****
const earnings = mongoose.Schema({
    tripEarnings: String,
    paidTrips: String,
    tips: String,
    balance: String
})

module.exports = mongoose.model('earnings', earnings);
