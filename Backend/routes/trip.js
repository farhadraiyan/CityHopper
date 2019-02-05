const express = require('express');
const router = express.Router();
const trip = require('../controllers/trip');

router.post('/create',trip.createTrip)

module.exports=router;