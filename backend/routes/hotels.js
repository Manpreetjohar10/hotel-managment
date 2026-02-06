const express = require('express');
const router = express.Router();
const controller = require('../controllers/hotelsController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// public
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// protected - admin only
router.post('/', requireAuth, requireAdmin, controller.create);
router.put('/:id', requireAuth, requireAdmin, controller.update);
router.delete('/:id', requireAuth, requireAdmin, controller.remove);

module.exports = router;
