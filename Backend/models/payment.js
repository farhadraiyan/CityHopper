const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    paymentId: {
        type: String,
        required: true
    },
    payerId: {
        type: String,
        required: true
    },
    salesId: {
        type: String,
        required: true
    },
    merchantId: {
        type: String,
        required: true
    },
    transactionAmount: {
        type: String,
        required: true
    },
    transactionDetails: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('payment', paymentSchema);