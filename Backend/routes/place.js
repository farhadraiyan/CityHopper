const express = require('express');
const router = express.Router();
const place = require('../controllers/place');

router.post('/create',place.generatePlace)

module.exports=router;