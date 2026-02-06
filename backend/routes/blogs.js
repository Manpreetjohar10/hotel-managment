const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const { requireAuth } = require('../middleware/auth');

// Public routes
router.get('/', blogsController.getAllBlogs);
router.get('/:id', blogsController.getBlogById);

// Admin routes
router.post('/', requireAuth, blogsController.createBlog);
router.put('/:id', requireAuth, blogsController.updateBlog);
router.delete('/:id', requireAuth, blogsController.deleteBlog);

module.exports = router;
