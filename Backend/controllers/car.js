const car = require('../models/car')
const _ = require('lodash')

let findAll = async function(req, res) {
    try {
        let all = await car.find({})
        res.status(200).send(all)
    } catch (error) {
        res.status(400).send({
            message: "Error getting all cars",
            error: error
        })
    }
}

let findCarByUserId = async function (req, res) {
    let errors = {}
    let reqFields = ['userId']
    // add fields to error if errors getting user information
    reqFields.forEach(function(field) {
        if(!req.body[field] || req.body[field] === '') {
            errors[field] = `${field.replace(/_/g, ' ')} is required`
        }
    })
    // if stuff inside errors, send to user -> errors
    if(Object.keys(errors).length) {
        return res.status(400).send({
            msg: 'error finding car',
            errors: errors,
        })
    }
    let data = _.pick(req.body, ['userId'])

    let userCars
    try {
        userCars = await car.findById(data.userId)
        if (!userCars) {
            res.status(400).send({
                message: "Error getting user car"
            })
        }
        res.status(200).send({
            message: "Found user vehicle details",
            vehicle: userCars
        })
    } catch (error) {
        res.status(400).send({
            message: "Error getting user cars",
            error: error
        })
    }
}
