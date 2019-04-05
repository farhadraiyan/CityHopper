const express = require('express');
const router = express.Router();
const Message = require('../controllers/message');

/* GET car listing. */
router.get('/find/All', Message.findAll);
router.get('/find/:messageId', Message.findMessageById);
router.post('/find/From', Message.findMessagesBySenderId);
router.post('/send', Message.sendMessage);
module.exports = router;