const express = require('express');
const router = express.Router();
const car = require('../controllers/car');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' })

/* GET car listing. */
router.get('/find/:carId', car.findCarByCarId);
router.get('/find/All', car.findAll);
router.get('/find/user/:userId', car.findCarByUserId);
router.post('/register/',upload.single('image'), car.createCar);
router.post('/uploadImage',upload.single('image'),car.uploadImage)
router.put('/update/:carId', car.updateCar)
router.delete('/delete/:carId', car.deleteCar);

module.exports = router;