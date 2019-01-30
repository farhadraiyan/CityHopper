const TRIP = require('../models/trip')

let findAll = async function (req, res) {
    TRIP.find().then((success) => {
        res.send(success)
    }).catch((error)=>{
        res.status(500).send(error)
    })
}

let create = async function (req, res) {
    let errors = {}
    
}