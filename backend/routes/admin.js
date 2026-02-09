const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const messagesController = require('../controllers/messagesController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.use(requireAuth, requireAdmin);

router.get('/stats', adminController.getStats);
router.get('/users', adminController.listUsers);
router.get('/bookings', adminController.listBookings);
router.patch('/bookings/:id/status', adminController.updateBookingStatus);
router.get('/messages', messagesController.list);

module.exports = router;
