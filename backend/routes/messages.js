const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

router.post('/', messagesController.create);

module.exports = router;
