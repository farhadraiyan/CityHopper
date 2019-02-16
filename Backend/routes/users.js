const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const jwt = require('express-jwt');
const auth = require('./../middlewire/auth')

// var auth = jwt({
    
// })

/* GET users listing. */
router.get('/find/:email&:password',user.find);
router.post('/register', user.register);
router.get('/find/All', user.findAll);
router.delete('/delete/:id',user.deleteOne);
router.put('/edit/:id',user.editOne );
router.post('/login',auth, user.login);

module.exports = router;

