const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

/* GET users listing. */
router.get('/user/find/:email&:password',user.find);
router.post('/user/register', user.register);
router.get('/user/findAll', user.findAll);
router.delete('/user/delete/:id',user.deleteOne);

module.exports = router;
