const mongoose = require('mongoose')
//const Place = require('./place')
const TripRequestSchema = mongoose.Schema({
  riderId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true
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
  }
})
const Trip = mongoose.Schema({
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'place',
    required: true
  },
  to: {
    type: mongoose.Schema.ObjectId,
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
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  },
  passengers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  }],
  rating: {
    type: Number,
    require: true
  },
  car: {
    type: mongoose.Schema.ObjectId,
    ref: 'car'
  },
  tripRequests: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Trip'
  }]
})

Trip.methods.addTripRequest = async function (tripReqID) {
  this.TripRequests.push(tripReqID)
  let updatedTrip
  try {
    updatedTrip = await this.save()
  } catch (error) {
    return error
  }
  return updatedTrip
}
module.exports = mongoose.model('TripRequest', TripRequestSchema)
module.exports = mongoose.model('Trip', Trip);
