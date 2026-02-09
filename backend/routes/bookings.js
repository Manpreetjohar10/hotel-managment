const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { requireAuth } = require('../middleware/auth');

router.post('/', requireAuth, bookingsController.create);
router.get('/my', requireAuth, bookingsController.listMine);
router.patch('/:id/cancel', requireAuth, bookingsController.cancel);

module.exports = router;
