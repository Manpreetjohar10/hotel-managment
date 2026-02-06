import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${id}`);
      const data = await res.json();
      setBlog(data);
    } catch (err) {
      console.error(err);
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { message: 'Failed to load blog', type: 'error' } 
      }));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading blog...</div>;
  if (!blog) return <div className="error">Blog not found</div>;

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-container">
        <Link to="/blogs" className="back-link">← Back to Blogs</Link>
        
        <article className="blog-detail">
          <div className="blog-detail-header">
            <h1>{blog.title}</h1>
            <div className="blog-detail-meta">
              <span className="author">By {blog.author?.name}</span>
              <span className="date">{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span className="category">{blog.category}</span>
            </div>
          </div>

          <div className="blog-detail-image">
            <img src={blog.image} alt={blog.title} />
          </div>

          <div className="blog-detail-content">
            <p>{blog.content}</p>
          </div>

          <div className="blog-detail-footer">
            <p className="related-text">Enjoyed this article?</p>
            <Link to="/blogs" className="btn btn-primary">
              Read More Articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
