const TRIP = require('../models/trip')
const TripRequest = require('../models/trip')
const _ = require('lodash');
const erroHandler = require("../library/errorhandlers")
const User = require("../models/user")

let createTrip = async function (req, res) {
  //from to has type issue need to fix
  let reqField = ["from", "to", "cost", "departureTime", "luggage", "seatsAvailable", "arivalTime", "driver",
    "passengers", "rating", "car"]
  //erro handle with Joi
  let joiResult = erroHandler.joiConfigTrip(req.body);
  //if error handler return errors
  if (joiResult.error) {
    res.status(400).send(erroHandler.tripErrors(joiResult.error.details))
    return;
  }

  let tripData = _.pick(req.body, reqField)

  let createTrip;
  try {
    createTrip = await new TRIP(tripData)
    //this is how get access to the user
    const user = await User.findById(createTrip.driver)
    console.log(user)
  } catch (error) {
    return res.status(400).send({
      message: "cannot create trip",
      error: error
    })

  }
  let savedTrip;
  try {
    savedTrip = await createTrip.save();
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
  catch (error) {
    return res.status(400).send({
      msg: 'error saving trip',
      errors: error,
    })
  }
}

let createTripRequest = async function (req, res) {
  // get the trip ID
  let errors = {}
  let reqFields = ['tripId', 'riderId', 'seatsRequested', 'additionalDetails']
  // add fields to error if errors getting user information
  reqFields.forEach(function (field) {
    if (!req.body[field] || req.body[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`
    }
  })
  if (Object.keys(errors).length) {
    return res.status(400).send({
      msg: 'error creating trip request',
      errors: errors,
    })
  }
  let data = _.pick(req.body, reqFields)

  let trip
  try {
    trip = await TRIP.findById(data.tripId)
  } catch (error) {
    return res.status(400).send({
      message: 'Error fetching trip, check trip ID',
      error: error.message
    })
  }
  let newTripReq
  try {
    newTripReq = await new TripRequest(data)
  } catch (error) {
    return res.status(400).send({
      message: 'Error creating trip request',
      message: error.message
    })
  }
  let savedTripRequest
  try {
    savedTripRequest = await newTripReq.save()
  } catch (error) {
    return res.status(400).send({
      message: 'Error saving trip request',
      error: error.message
    })
  }

  let savedTripWithTripRequest
  try {
    savedTripWithTripRequest = await trip.addTripRequest(savedTripRequest._id)
  } catch (error) {
    return res.status(400).send({
      message: 'Error saving trip request to Trip',
      error: error.message
    })
  }
  res.status(200).send({
    message: 'success',
    data: {
      trip: savedTripWithTripRequest,
      tripRequest: savedTripRequest
    }
  })
}

let getTripRequestsForTrip = async function (req, res) {
  let errors = {}
  let reqFields = ['tripId']
  // add fields to error if errors getting user information
  reqFields.forEach(function (field) {
    if (!req.params[field] || req.params[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`
    }
  })
  if (Object.keys(errors).length) {
    return res.status(400).send({
      msg: 'error getting trip request',
      errors: errors,
    })
  }
  let tripId = req.params.tripId
  let trip
  try {
    trip = await TRIP.findById(tripId)
  } catch (error) {
    return res.status(400).send({
      message: 'Cannot get trip requests',
      error: error.message
    })
  }
  if (trip.tripRequests.length < 0) {
    return res.status(404).send({
      message: 'No requests found for this trip.'
    })
  }
  let allTripRequests
  try {
    allTripRequests = await TripRequest.find({
      '_id': { $in: trip.tripRequests }
    })
  } catch (error) {
    return res.status(400).send({
      message: 'Cannot get trip requests',
      error: error.message
    })
  }
  res.status(200).send({
    message: 'Success',
    data: allTripRequests
  })
}

module.exports = {
  // findAllTrip,
  createTrip,
  createTripRequest,
  getTripRequestsForTrip
}