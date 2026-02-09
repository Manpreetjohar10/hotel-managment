import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../api';
import decodeJwt from '../utils/decodeJwt';

export default function Blogs() {
  const blogFallback = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="100%" height="100%" fill="#eef2f7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8a94a6" font-family="Arial" font-size="22">Blog Image</text></svg>'
  );
  const emptyForm = {
    title: '',
    excerpt: '',
    category: 'General',
    image: '',
    content: '',
    published: true
  };

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSaving, setAdminSaving] = useState(false);
  const [adminForm, setAdminForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchBlogs(false);
  }, []);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (t) {
      const p = decodeJwt(t);
      setIsAdmin(!!(p && p.role === 'super_admin'));
    }
  }, []);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setImagePreview(adminForm.image || '');
  }, [imageFile, adminForm.image]);

  useEffect(() => {
    fetchBlogs(isAdmin);
  }, [isAdmin]);

  const fetchBlogs = async (adminMode) => {
    try {
      const res = adminMode ? await fetchWithAuth('/api/blogs/admin') : await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: 'Failed to load blogs', type: 'error' }
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    setAdminSaving(true);
    try {
      const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';
      const method = editingId ? 'PUT' : 'POST';
      const formData = new FormData();
      formData.append('title', adminForm.title);
      formData.append('excerpt', adminForm.excerpt);
      formData.append('content', adminForm.content);
      formData.append('category', adminForm.category);
      formData.append('published', adminForm.published ? 'true' : 'false');
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (adminForm.image) {
        formData.append('image', adminForm.image);
      }
      const res = await fetchWithAuth(url, {
        method,
        body: formData
      });
      const body = await res.json();
      if (!res.ok) throw body;
      setAdminForm(emptyForm);
      setImageFile(null);
      setImagePreview('');
      setEditingId(null);
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: editingId ? 'Blog updated' : 'Blog created', type: 'success' }
      }));
      fetchBlogs(isAdmin);
    } catch (err) {
      console.error(err);
      const msg = (err && err.message) || 'Create failed';
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: msg, type: 'error' }
      }));
    } finally {
      setAdminSaving(false);
    }
  };

  const handleEditBlog = (blog) => {
    setEditingId(blog._id);
    setAdminForm({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      category: blog.category || 'General',
      image: blog.image || '',
      content: blog.content || blog.body || '',
      published: !!blog.published
    });
    setImageFile(null);
    setImagePreview(blog.image || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setAdminForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      const res = await fetchWithAuth(`/api/blogs/${id}`, { method: 'DELETE' });
      const body = await res.json();
      if (!res.ok) throw body;
      if (editingId === id) handleCancelEdit();
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: 'Blog deleted', type: 'success' }
      }));
      fetchBlogs(isAdmin);
    } catch (err) {
      console.error(err);
      const msg = (err && err.message) || 'Delete failed';
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: msg, type: 'error' }
      }));
    }
  };

  const categories = ['All', ...new Set(blogs.map(b => b.category))];
  const statusMatches = (blog) => {
    if (!isAdmin || statusFilter === 'all') return true;
    return statusFilter === 'published' ? !!blog.published : !blog.published;
  };
  const estimateRead = (text = '') => {
    const words = String(text || '').trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 180));
    return `${minutes} min read`;
  };

  const filteredBlogs = blogs
    .filter(b => (
      (category === 'All' || b.category === category) && statusMatches(b)
    ))
    .filter(b => {
      if (!search) return true;
      const hay = `${b.title || ''} ${b.excerpt || ''} ${b.category || ''}`.toLowerCase();
      return hay.includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  const featuredBlog = filteredBlogs[0] || null;
  const gridBlogs = featuredBlog ? filteredBlogs.filter((b) => b._id !== featuredBlog._id) : filteredBlogs;
  const popularBlogs = blogs.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
  const totalCategories = new Set(blogs.map(b => b.category)).size;
  const latestBlogDate = blogs.reduce((latest, b) => {
    const d = b?.createdAt ? new Date(b.createdAt) : null;
    if (!d || Number.isNaN(d.getTime())) return latest;
    return latest && latest > d ? latest : d;
  }, null);

  if (loading) return <div className="loading">Loading blogs...</div>;

  return (
    <div className="blogs-page">
      <div className="page-header blog-hero">
        <div>
          <h1>Travel Journal & Insider Guides</h1>
          <p>Editorial picks, destination reports, and hotel trends curated weekly.</p>
        </div>
        <div className="blog-hero-card">
          <div className="pill">Weekly Digest</div>
          <h3>Stay ahead of new destinations</h3>
          <p>Get curated tips, city launches, and hotel offers every Friday.</p>
          <button className="btn small">Subscribe</button>
        </div>
      </div>

      <div className="blogs-content">
        {isAdmin && (
          <section className="admin-dashboard">
            <div className="admin-dashboard-header">
              <div>
                <h2 className="admin-dashboard-title">Admin Dashboard</h2>
                <p className="admin-dashboard-subtitle">
                Manage blog content, publishing, and moderation.
                </p>
              </div>
              {editingId && (
                <div className="admin-editing-indicator">
                  Editing: <strong>{adminForm.title || 'Untitled'}</strong>
                </div>
              )}
            </div>
            <div className="admin-dashboard-stats">
              <div className="admin-stat-card">
                <div className="admin-stat-label">Total Blogs</div>
                <div className="admin-stat-value">{blogs.length}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Categories</div>
                <div className="admin-stat-value">{totalCategories}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Latest Post</div>
                <div className="admin-stat-value admin-stat-date">
                  {latestBlogDate ? latestBlogDate.toLocaleDateString() : '-'}
                </div>
              </div>
            </div>

            <div className="admin-filters">
              <span className="admin-filter-label">Status</span>
              <div className="admin-filter-group">
                {['all', 'published', 'draft'].map(status => (
                  <button
                    key={status}
                    type="button"
                    className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-controls">
              <form onSubmit={handleSaveBlog} className="admin-form">
                <input
                  placeholder="Title"
                  value={adminForm.title}
                  onChange={(e) => setAdminForm({ ...adminForm, title: e.target.value })}
                  required
                />
                <input
                  placeholder="Category"
                  value={adminForm.category}
                  onChange={(e) => setAdminForm({ ...adminForm, category: e.target.value })}
                  required
                />
                <input
                  placeholder="Excerpt"
                  value={adminForm.excerpt}
                  onChange={(e) => setAdminForm({ ...adminForm, excerpt: e.target.value })}
                  required
                />
                <input
                  placeholder="Image URL"
                  value={adminForm.image}
                  onChange={(e) => setAdminForm({ ...adminForm, image: e.target.value })}
                />
                <select
                  value={adminForm.published ? 'published' : 'draft'}
                  onChange={(e) => setAdminForm({ ...adminForm, published: e.target.value === 'published' })}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                />
                <div className="admin-form-hint admin-form-full">
                  Upload an image file or provide a URL above.
                </div>
                {editingId && adminForm.image && !imageFile && (
                  <div className="admin-form-hint admin-form-full">
                    Current image: <span className="truncate">{adminForm.image}</span>
                  </div>
                )}
                {imagePreview && (
                  <div className="admin-image-preview">
                    <img src={imagePreview} alt="Blog preview" />
                  </div>
                )}
                <textarea
                  placeholder="Content"
                  value={adminForm.content}
                  onChange={(e) => setAdminForm({ ...adminForm, content: e.target.value })}
                  rows={4}
                  className="admin-form-full"
                  required
                />
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary" disabled={adminSaving}>
                    {adminSaving ? 'Saving...' : (editingId ? 'Update Blog' : 'Create Blog')}
                  </button>
                  {editingId && (
                    <button type="button" className="btn ghost" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  )}
                  <Link to="/dashboard/admin" className="btn btn-secondary">
                    Go to Full Dashboard
                  </Link>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Filter Bar */}
        <div className="category-filter blog-filter-bar">
          <div className="blog-search">
            <input
              type="text"
              placeholder="Search by title, category, or keywords"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="blog-sort">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title</option>
            </select>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="blogs-layout">
          <div className="blogs-main">
            {/* Featured Blog */}
            {featuredBlog && (
              <section className="blog-featured">
                <div className="featured-media">
                  <img
                    src={featuredBlog.image || blogFallback}
                    alt={featuredBlog.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = blogFallback; }}
                  />
                  <span className="featured-badge">Featured</span>
                </div>
                <div className="featured-body">
                  <div className="featured-meta">
                    <span className="pill">{featuredBlog.category || 'General'}</span>
                    <span className="featured-date">
                      {featuredBlog.createdAt ? new Date(featuredBlog.createdAt).toLocaleDateString() : ''}
                    </span>
                    <span className="featured-date">{estimateRead(featuredBlog.content || featuredBlog.body)}</span>
                  </div>
                  <h2>{featuredBlog.title}</h2>
                  <p>{featuredBlog.excerpt}</p>
                  <div className="featured-actions">
                    {featuredBlog.published ? (
                      <Link to={`/blogs/${featuredBlog._id}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        Read Story
                      </Link>
                    ) : (
                      <span className="draft-note">Draft not publicly visible</span>
                    )}
                    <span className="featured-author">{featuredBlog.author?.name || 'MERN Hotel'}</span>
                  </div>
                </div>
              </section>
            )}

            {/* Blogs Grid */}
            {filteredBlogs.length > 0 ? (
              gridBlogs.length > 0 ? (
                <div className="blogs-grid">
                  {gridBlogs.map(blog => (
                    <article key={blog._id} className="blog-card">
                      <div className="blog-image">
                        <img
                          src={blog.image || blogFallback}
                          alt={blog.title}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = blogFallback; }}
                        />
                        <span className="blog-category">{blog.category}</span>
                        {isAdmin && (
                          <span className={`blog-status ${blog.published ? 'published' : 'draft'}`}>
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        )}
                      </div>
                      <div className="blog-content">
                        <h2>{blog.title}</h2>
                        <p className="blog-excerpt">{blog.excerpt}</p>
                        <div className="blog-meta">
                          <span className="blog-author">{blog.author?.name}</span>
                          <span className="blog-date">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                          <span className="blog-date">{estimateRead(blog.content || blog.body)}</span>
                        </div>
                        {isAdmin && (
                          <div className="blog-admin-actions">
                            <button className="btn ghost" onClick={() => handleEditBlog(blog)}>
                              Edit
                            </button>
                            <button className="btn ghost" onClick={() => handleDeleteBlog(blog._id)}>
                              Delete
                            </button>
                          </div>
                        )}
                        {blog.published ? (
                          <Link to={`/blogs/${blog._id}`} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                            Read More
                          </Link>
                        ) : (
                          <div className="draft-note">Draft not publicly visible</div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : null
            ) : (
              <div className="no-blogs">
                <p>No blogs found in this category.</p>
              </div>
            )}
          </div>
          <aside className="blogs-sidebar">
            <div className="sidebar-card">
              <h3>Newsletter</h3>
              <p>Get weekly hotel tips and destination guides.</p>
              <input type="email" placeholder="you@example.com" />
              <button className="btn fullwidth">Subscribe</button>
            </div>
            <div className="sidebar-card">
              <h3>Popular posts</h3>
              <div className="sidebar-list">
                {popularBlogs.map((b) => (
                  <div key={b._id} className="sidebar-item">
                    <img src={b.image || blogFallback} alt={b.title} />
                    <div>
                      <strong>{b.title}</strong>
                      <span>{estimateRead(b.content || b.body)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sidebar-card">
              <h3>Travel tips</h3>
              <ul className="sidebar-tips">
                <li>Book early for best rates</li>
                <li>Check flexible cancellation</li>
                <li>Compare amenities first</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
