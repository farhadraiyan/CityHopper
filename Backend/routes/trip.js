const express = require('express');
const router = express.Router();
const trip = require('../controllers/trip');

router.post('/create', trip.createTrip)
router.post('/createTripRequest', trip.createTripRequest)
router.get('/find/tripRequest/:tripId', trip.getTripRequestsForTrip)
router.get('/getAll',trip.getTrips)

module.exports = router;