const Blog = require('../models/Blog');

const parseBoolean = (value, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return fallback;
};

const ensureAdmin = (req, res) => {
  if (!req.user || req.user.role !== 'super_admin') {
    res.status(403).json({ message: 'Not authorized' });
    return false;
  }
  return true;
};

// Create Blog (Admin Only)
exports.createBlog = async (req, res) => {
  try {
    if (!ensureAdmin(req, res)) return;
    const { title, excerpt, content, image, category, published } = req.body;
    const imagePath = req.file ? `/uploads/blogs/${req.file.filename}` : image;
    const blog = new Blog({
      title,
      excerpt,
      content,
      image: imagePath,
      category,
      author: req.user.id,
      published: parseBoolean(published, false)
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Blogs (Public)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Blogs (Admin)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    if (!ensureAdmin(req, res)) return;
    const status = req.query.status;
    const filter = {};
    if (status === 'published') filter.published = true;
    if (status === 'draft') filter.published = false;
    const blogs = await Blog.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Blog (Public)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (!blog.published) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Blog (Admin Only)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    if (!ensureAdmin(req, res)) return;

    const { title, excerpt, content, image, category, published } = req.body;
    const imagePath = req.file ? `/uploads/blogs/${req.file.filename}` : image;

    if (title !== undefined) blog.title = title;
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = content;
    if (category !== undefined) blog.category = category;
    if (imagePath !== undefined) blog.image = imagePath;
    if (published !== undefined) blog.published = parseBoolean(published, blog.published);

    blog.updatedAt = Date.now();
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Blog (Admin Only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    if (!ensureAdmin(req, res)) return;

    await Blog.deleteOne({ _id: req.params.id });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
