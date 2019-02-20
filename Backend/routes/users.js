const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
// const jwt = require('express-jwt');
const auth = require('./../middlewire/auth')
const multer = require('multer')
const upload = multer({ dest: './public/uploads' })

// var auth = jwt({

// })

/* GET users listing. */
router.get('/find/:_id', user.find);
router.post('/register', user.register);
router.get('/find/All', user.findAll);
router.delete('/delete/:id', user.deleteOne);
router.put('/edit/:id', user.editOne);
router.post('/login', user.login);
router.post('/upload', upload.single('image'), user.uploadProfilePicture);
router.get('/profile/picture/user/:id', user.getProfilePictureByUserID)
router.get('/profile/picture/:id', user.getProfilePictureByID)

module.exports = router;

