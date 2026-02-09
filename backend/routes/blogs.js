const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const { requireAuth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public routes
router.get('/', blogsController.getAllBlogs);
router.get('/admin', requireAuth, blogsController.getAllBlogsAdmin);
router.get('/:id', blogsController.getBlogById);

// Admin routes
router.post('/', requireAuth, upload.single('image'), blogsController.createBlog);
router.put('/:id', requireAuth, upload.single('image'), blogsController.updateBlog);
router.delete('/:id', requireAuth, blogsController.deleteBlog);

module.exports = router;
