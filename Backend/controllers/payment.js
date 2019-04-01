const payment = require('../routes/payment');
const paypal = require('paypal-rest-sdk');
const config = require('../config/config');
const Trip = require('../models/trip');

paypal.configure({
    mode: 'sandbox', // Sandbox or live
    client_id: config.clientId,
    client_secret: config.clientSecret
});


/*Payment Controller goes here */ 

exports.createPayment = async function (req, res) {
    var trip
    try {
        trip = await Trip.findById({_id:req.body.id})
        if(!trip){
            return res.status(400).send({
                msg: 'error finding trip'
            })
        }
        res.status({
            msg: "Trip Found",
            data: trip
        })
    } catch (error) {
        return res.status(400).send({
            msg: 'Unable to find trip',
            error: error
        })
    }
    var tripRequest
    try{
        tripRequest = await Trip.findById({_id: req.body.riderId})
        if(!tripRequest){
            return res.status(400).send({
                msg: 'error finding trip request',
            })
        }
        res.status({
            msg: "Trip Request Found",
            data: tripRequest
        })
    } catch(error){
        return res.status(400).send({
            msg: "Trip Request not found",
            error: error
        })
    }

    const tripName = JSON.stringify(trip.from.name + " to " + trip.to.name)
    console.log(trip.cost)
    

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/payment/success",
            "cancel_url": "http://localhost:3000/payment/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": tripName,
                    "sku": trip.id,
                    "price": trip.cost,
                    "currency": "CAD",
                    "quantity": tripRequest.seatsRequested
                }]
            },
            "amount": {
                "currency": "CAD",
                "total": trip.cost * tripRequest.seatsRequested
            },
            "description": "Transction for " + tripName + ", with the amount of $" + trip.cost + " CAD."
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            // console.log(payment.links);
            for(let links of payment.links){
                if(links.rel === "approval_url"){
                    console.log(links.href)
                    res.redirect(links.href)
                }
            }
        }
    });
}

exports.paymentSuccess = async (req, res) =>{
    const payerId = req.query.PayerID;
    console.log(payerId)
    const paymentId = req.query.paymentId;
    console.log(payerId)
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency" : "CAD",
                "total": "30.00"
            }
        }]

    };

    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        if(error){
            res.status(400).send({
                msg: "Payment execution failed",
                error: error
            })
        }else{
            res.status(200).send({
                msg: "Payment Execution Successfull",
                paymentData: payment
            })
        }
    })
}


exports.cancelPayment = async (req, res) =>{
    res.status(200).send({
        msg: "Payment Request has been cancelled"
    })
}

