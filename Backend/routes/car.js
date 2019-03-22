const express = require('express');
const router = express.Router();
const car = require('../controllers/car');

/* GET car listing. */
router.get('/find/:carId', car.findCarByCarId);
router.get('/find/All', car.findAll);
router.get('/find/user/:userId', car.findCarByUserId);
router.post('/register/', car.createCar);
router.put('/update/:carId', car.updateCar)
router.delete('/delete/:carId', car.deleteCar);

module.exports = router;