const express = require('express');
const router = express.Router();
const trip = require('../controllers/trip');

router.post('/create', trip.createTrip)
router.post('/createTripRequest', trip.createTripRequest)
router.get('/find/upcomingTrips/:riderId', trip.getTripRequestForRider)
router.get('/find/tripRequest/:driverId', trip.getTripRequestForDriver)
router.get('/getAll',trip.getTrips)
router.get('/getOne/:id',trip.getOneTrip)
router.post('/sendRequest', trip.createTripRequest);

module.exports = router;