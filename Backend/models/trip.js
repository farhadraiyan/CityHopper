const mongoose = require('mongoose')
//const Place = require('./place')
const TripRequestSchema = mongoose.Schema({
  riderId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true
  },
  tripId: {
    type: mongoose.Schema.ObjectId,
    ref: 'trip'
  },
  seatsRequested: {
    type: Number,
    required: true
  },
  Confirmed: {
    type: Boolean
  },
  time_created: {
    type: Date,
    default: Date.now
  },
  additionalDetails: {
    type: String
  },
  paymentStatus: {
    type: Boolean,
    default: false
  }
})
const TripSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'place',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'place',
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  departureTime: {
    type: Date,
    default: Date.now
  },
  arivalTime: {
    type: Date,
    default: Date.now
  },
  seatsAvailable: {
    type: Number,
    required: true
  },
  luggage: {
    type: String,
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'user'
  },
  passengers: [{
    type: mongoose.Schema.Types.Mixed,
    ref: 'user'
  }],
  rating: {
    type: Number,
    require: true
  },
  car: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'car'
  },
  active: {
    type: Boolean,
    require:true
  },
  tripRequests: [{
    type: mongoose.Schema.ObjectId,
    ref: 'TripRequest'
  }]
})

TripSchema.methods.addTripRequest = async function (tripReqID) {
  this.tripRequests.push(tripReqID)
  let updatedTrip
  try {
    updatedTrip = await this.save()
  } catch (error) {
    return error
  }
  return updatedTrip
}

const TripRequest = mongoose.model('TripRequest', TripRequestSchema)
const TRIP = mongoose.model('Trip', TripSchema)
module.exports = {
  TripRequest,
  TRIP
}