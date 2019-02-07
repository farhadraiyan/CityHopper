const Place=require('../models/place');
const _ = require('lodash');
const erroHandler=require("../library/errorhandlers")
let generatePlace = async function(req, res) {
    
    let reqFields = ['name','location']
    //erro handle with Joi
    let joiResult=erroHandler.joiConfigPlace(req.body);
    //if error handler return errors
    if(joiResult.error)
    {
        res.status(400).send(erroHandler.placeErrors(joiResult.error.details))
        return;
    }

    let placeData = _.pick(req.body, reqFields)
    
    let crtPlace
    // try catch to catch error creating a car
    
    try {
        crtPlace = await new Place(placeData)
    } catch (error) {
        return res.status(400).send({
            message: "cannot create place",
            error: error
        })
    }
    let savedPlace
    // try catch to manage async await
    try {
        savedPlace = await crtPlace.save()
        if (!savedPlace) {
            return res.status(404).send({
                msg: 'cannot save place'
            })
        }

        // if all good
        return res.status(200).send({
            msg: 'place created successfully',
            place: savedPlace
        })

    } catch (error) {
        return res.status(400).send({
            msg: 'error saving place',
            errors: error,
        })
    }
}

module.exports={
    generatePlace
    
}



