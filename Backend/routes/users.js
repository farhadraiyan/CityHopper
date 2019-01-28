const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

/* GET users listing. */
router.get('/find/:email&:password',user.find);
router.post('/register', user.register);
router.get('/findall', user.findAll);

module.exports = router;
