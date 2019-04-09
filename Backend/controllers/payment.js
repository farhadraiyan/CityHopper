const paypal = require('paypal-rest-sdk');
const config = require('../config/config');
const { TRIP } = require('../models/trip')
const { TripRequest } = require('../models/trip')
const paymentModel = require('../models/payment');
const _ = require('lodash');

paypal.configure({
    mode: 'sandbox', // Sandbox or live
    client_id: config.clientId,
    client_secret: config.clientSecret
});

var total;
/*Payment Controller goes here */ 

exports.createPayment = async function (req, res) {
    console.log(req.body)
    console.log(req.body.tripRequestID)
    var trip
    try {
        trip = await TRIP.findById({_id:req.body.tripId})
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
            error: error.message
        })
    }

    //This endpoint is importent and needed for future implementation.

    var tripRequest
    try{
        tripRequest = await TripRequest.findOne({riderId: req.body.riderId})
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
   
    total = trip.cost * tripRequest.seatsRequested + (trip.cost * tripRequest.seatsRequested * 20/100);
    console.log(total)
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
                    "sku": req.body.tripRequestID,
                    "price": total,
                    "currency": "CAD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "CAD",
                "total": total
            },
            "description": "Transction for " + tripName + ", with the amount of $" + total + " CAD."
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.status(400).send({
                msg: "Payment process unsuccessful",
                error: error
            })
        } else {
            for(let links of payment.links){
                if(links.rel === "approval_url"){
                    // res.setHeader("Access-Control-Allow-Origin", "*")
                    // console.log(links.href)
                    // res.redirect(links.href)
                    return res.status(200).send({
                        paymentURL: links.href
                    })
                }
            }
        }
    });
}

let  handlePaypalSuccessPayment = async function (req ,res, error, payment) {
    if (error) {
        return res.status(400).send({
            error: "error generating payment",
            message: error.message
        })
    }
    let data = {}
    data.paymentId = payment.id
    data.payerId = payment.payer.payer_info.payer_id
    data.salesId = payment.transactions[0].related_resources[0].sale.id
    data.merchantId = payment.transactions[0].payee.merchant_id
    data.transactionAmount = payment.transactions[0].amount.total
    data.transactionDetails = payment.transactions[0].description

    let paypalData
    try {
        paypalData = await new paymentModel(data)
        if (!paypalData) {
            return res.status(400).send({
                msg: "Payment execution failed"
            })
        }
    } catch (error) {
        return res.status(400).send({
            msg: "Payment execution failed",
            error: error.message
        })
    }

    let savedPaypalData
    try {
        savedPaypalData = await paypalData.save()
        if (!savedPaypalData) {
            return res.status(400).send({
                msg: "Payment saving failed"
            })
        }
    } catch (error) {
        return res.status(400).send({
            msg: "Payment saving failed",
            error: error.message
        })
    }

    let tripRequestID = payment.transactions[0].item_list.items[0].sku
    console.log(tripRequestID)
    let tripRequest
    try {
        tripRequest = await TripRequest.findById(tripRequestID)
        console.log(tripRequest)
        if (!tripRequest) {
            return res.status(200).send({
                message: "Payment processed successfully but error updating trip, contact our support."
            })
        }
    } catch (error) {
        return res.status(200).send({
            message: "Payment processed successfully but error updating trip, contact our support.",
            error: error.message
        })
    }
    tripRequest.paymentStatus = true

    let savedTrip
    try {
        savedTrip = await tripRequest.save()
        if (!savedTrip) {
            return res.status(200).send({
                message: "Payment processed successfully but saving updating trip, contact our support."
            })
        }
    } catch (error) {
        return res.status(200).send({
            message: "Payment processed successfully but error updating trip, contact our support.",
            error: error.message
        })
    }
    return res.redirect('http://localhost:4200/trips/upcoming')

}
exports.paymentSuccess = async (req, res) =>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency" : "CAD",
                "total": total
            }
        }]

    };

    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        handlePaypalSuccessPayment(req, res, error, payment)
    })
}

exports.getPayments = async (req, res) =>{
    let paymentInfo;
    try {
        paymentInfo = await paymentModel.findById({_id:req.body.id})
        if(!paymentInfo){
            return res.status(400).send({
                msg: "Error finding payment info"
            })
        }
        paypal.payment.get(paymentInfo.paymentId, (error, payment) => {
            if(error){
                return res.status(400).send({
                    msg: "Error finding payment Id",
                    error: error
                })
            }else{
                res.status(200).send({
                    msg: "payment info Found",
                    paymentData: payment
                })
            }
        })
    } catch (error) {
        return res.status(400).send({
            msg: "Payment info not found",
            error: error
        })
    }
}

exports.processReturn = async (req, res) => {
    let paymentInfo;
    try {
        paymentInfo = await paymentModel.findById({_id:req.body.id})
        if(!paymentInfo){
            res.status.send({
                msg: "Error Finding payment"
            })
        } 
        const data = {
            "salesId": paymentInfo.saleId,
            "amount": {
                "currency": "CAD",
                "total": paymentInfo.transactionAmount
            }
        }
        await paypal.sale.refund(paymentInfo.salesId, data, (error, payment) => {
            if(error){
                res.status(400).send({
                    msg: "Issue processing refund",
                    error: error
                })
            }else{
                console.log("Get Sale Details Response");
                res.status(200).send({
                    msg: "Payment Refunded successfully",
                    paymentData: payment
                })
            }
        })
    } catch (error) {
        res.status(400).send({
            msg: "Error finding payment info",
            error: error
        })
    }
}

exports.cancelPayment = async (req, res) =>{
    res.status(200).send({
        msg: "Payment Request has been cancelled"
    })
}
