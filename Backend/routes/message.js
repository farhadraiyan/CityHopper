const express = require('express');
const router = express.Router();
const Message = require('../controllers/message');

/* GET car listing. */
router.get('/find/:id', Message.findMessageById);
router.get('/find/All', Message.findAll);
router.get('/find/From/:id', Message.findMessagesBySenderId);
router.post('/send', Message.sendMessage);
module.exports = router;