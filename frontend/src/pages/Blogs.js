import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../api';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
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

  const categories = ['All', ...new Set(blogs.map(b => b.category))];
  const filteredBlogs = category === 'All' ? blogs : blogs.filter(b => b.category === category);

  if (loading) return <div className="loading">Loading blogs...</div>;

  return (
    <div className="blogs-page">
      <div className="page-header">
        <h1>Travel Blogs</h1>
        <p>Tips, stories, and inspiration for your next journey</p>
      </div>

      <div className="blogs-content">
        {/* Category Filter */}
        <div className="category-filter">
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

        {/* Blogs Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="blogs-grid">
            {filteredBlogs.map(blog => (
              <article key={blog._id} className="blog-card">
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
                  <span className="blog-category">{blog.category}</span>
                </div>
                <div className="blog-content">
                  <h2>{blog.title}</h2>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  <div className="blog-meta">
                    <span className="blog-author">{blog.author?.name}</span>
                    <span className="blog-date">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Link to={`/blogs/${blog._id}`} className="btn btn-secondary">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-blogs">
            <p>No blogs found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
