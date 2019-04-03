const express = require('express');
const router = express.Router();
const payment = require('../controllers/payment');

/* Payment routes will go here */

router.post('/create-payment', payment.createPayment);
router.get('/success', payment.paymentSuccess);
router.get('/cancle', payment.cancelPayment);

router.get('/getPayment', payment.getPayments);
router.post('/process-return', payment.processReturn);

module.exports = router;