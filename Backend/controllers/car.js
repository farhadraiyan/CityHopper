var User = require('../models/user');
const Car = require('../models/car')
const _ = require('lodash')

let findAll = async function (req, res) {
    try {
        let all = await Car.find({})
        res.status(200).send(all)
    } catch (error) {
        res.status(400).send({
            message: "Error getting all cars",
            error: error.messagess
        })
    }
}

let findCarByCarId = async function (req, res) {
    let errors = {}
    let reqFields = ['carId']
    // add fields to error if errors getting user information
    reqFields.forEach(function (field) {
        if (!req.body[field] || req.body[field] === '') {
            errors[field] = `${field.replace(/_/g, ' ')} is required`
        }
    })
    if (Object.keys(errors).length) {
        return res.status(400).send({
            msg: 'error finding car',
            errors: errors,
        })
    }

    let data = _.pick(req.body, ['userId'])

    let foundcar
    try {
        foundcar = await Car.findById(data.carId)
        if (!foundcar) {
            return res.status(400).send({
                msg: 'error finding car'
            })
        }
    } catch (error) {
        return res.status(400).send({
            msg: 'error finding car',
            error: error
        })
    }
}

let findCarByUserId = async function (req, res) {
    let errors = {}
    let reqFields = ['userId']
    // add fields to error if errors getting user information
    reqFields.forEach(function (field) {
        if (!req.body[field] || req.body[field] === '') {
            errors[field] = `${field.replace(/_/g, ' ')} is required`
        }
    })
    // if stuff inside errors, send to user -> errors
    if (Object.keys(errors).length) {
        return res.status(400).send({
            msg: 'error finding car',
            errors: errors,
        })
    }
    let data = _.pick(req.body, ['userId'])

    let userCars
    try {
        userCars = await Car.find({ userId: data.userId })
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

let createCar = async function (req, res) {
    let errors = {}
    let reqFields = ['userId', 'make', 'model', 'year', 'color', 'type',
        'seatCapacity', 'licencePlateNum', 'luggageCapacity']
    // add fields to error if errors getting user information
    reqFields.forEach(function (field) {
        if (!req.body[field] || req.body[field] === '') {
            errors[field] = `${field.replace(/_/g, ' ')} is required`
        }
    })
    // send error
    if (Object.keys(errors).length) {
        return res.status(400).send({
            msg: 'error creating car',
            errors: errors,
        })
    }
    let data = _.pick(req.body, reqFields)
    let createdCar
    // try catch to catch error creating a car
    try {
        createdCar = await new Car(data)
    } catch (error) {
        return res.status(400).send({
            message: "error creating car",
            error: error
        })
    }
    let savedCar
    // try catch to catch error for saving created car to mongodb
    try {
        savedCar = await createdCar.save()
    } catch (error) {
        return res.status(400).send({
            msg: 'error saving car',
            errors: error,
        })
    }
    try {
        let updatedUser = await User.findOneAndUpdate({ _id: data.userId },
            { $push: { "cars": savedCar._id } }, { new: true })
        return res.status(200).send({
            msg: 'Vehicle added successfully to the user',
            vehicle: savedCar
        })
    } catch (error) {
        return res.status(400).send({
            msg: 'error saving car to user',
            errors: error,
        })
    }

}

let updateCar = async function (req, res) {
    let errors = {}
    let reqFields = ['carId', 'make', 'model', 'year', 'color', 'type',
        'seatCapacity', 'licencePlateNum', 'luggageCapacity']
    // add fields to error if errors getting user information
    reqFields.forEach(function (field) {
        if (!req.body[field] || req.body[field] === '') {
            errors[field] = `${field.replace(/_/g, ' ')} is required`
        }
    })

    // send error
    if (Object.keys(errors).length) {
        return res.status(400).send({
            msg: 'error creating car',
            errors: errors,
        })
    }

    let data = _.pick(req.body, reqFields)

    try {
        let updatedCar = await Car.findByIdAndUpdate(data.carId, { $set: data }, { new: true })

        if (!updatedCar) {
            return res.status(400).send({
                error: "could not update the car. Please try again later"
            })
        }

        // if all good
        return res.status(200).send({
            message: "Car updated successfully",
            vehicle: updatedCar
        })
    } catch (error) {
        return res.status(400).send({
            message: "Error updating car",
            error: error
        })
    }
}

let deleteCar = async function (req, res) {
    let errors = {}
    let reqFields = ['carId']
    // add fields to error if errors getting user information
    reqFields.forEach(function (field) {
        if (!req.body[field] || req.body[field] === '') {
            errors[field] = `${field.replace(/_/g, ' ')} is required`
        }
    })
    if (Object.keys(errors).length) {
        return res.status(400).send({
            msg: 'error deleting car',
            errors: errors,
        })
    }
    let data = _.pick(req.body, reqFields)
    let deleteCar

    try {
        deleteCar = await Car.findByIdAndDelete(data.carId)
        if (!deleteCar) {
            return res.status(400).send({
                error: "could not delete the car. Please try again later"
            })
        }

        // if all good
        return res.status(200).send({
            message: "Car deleted successfully",
            deletedCar: deleteCar
        })

    } catch (error) {
        return res.status(400).send({
            message: "could not update the car. Please try again later",
            error: error
        })
    }
}

module.exports = {
    findAll,
    findCarByCarId,
    findCarByUserId,
    createCar,
    updateCar,
    deleteCar
}
