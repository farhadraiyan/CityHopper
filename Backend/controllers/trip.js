const TRIP = require('../models/trip')
const _ = require('lodash');
const erroHandler=require("../library/errorhandlers")
// let findAllTrip = async function (req, res) {
//     TRIP.find().then((success) => {
//         res.send(success)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     })
// }

let createTrip = async function (req, res) {
    //from to has type issue need to fix
    let reqField=["from", "to","cost","departureTime","arivalTime","driver",
"passengers","rating","car"]
    //erro handle with Joi
    let joiResult=erroHandler.joiConfigTrip(req.body);
    //if error handler return errors
    if(joiResult.error)
    {
        res.status(400).send(erroHandler.tripErrors(joiResult.error.details))
        return;
    }

    let tripData=_.pick(req.body, reqField)

    let createTrip;
    try{
        createTrip= await new TRIP(tripData)
        console.log(createTrip)
    }catch(error)
    {
        return res.status(400).send({
            message: "cannot create trip",
            error: error
        })

    }
    let savedTrip;
    try{
        savedTrip=await createTrip.save();
        if (!savedTrip) {
            return res.status(404).send({
                msg: 'cannot save trip'
            })
        }
                // if all good
                return res.status(200).send({
                    msg: 'trip created successfully',
                    place: savedTrip
                })
        
    }
    catch(error)
    {
        return res.status(400).send({
            msg: 'error saving trip',
            errors: error,
        })
    }

    
}

module.exports={
    // findAllTrip,
    createTrip
}