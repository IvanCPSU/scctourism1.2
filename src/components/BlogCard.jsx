import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogCard.css';

function BlogCard({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="blog-card">
      <div className="blog-card-image">
        <img src={post.image} alt={post.title} />
        <span className="blog-category">{post.category}</span>
      </div>
      <div className="blog-card-content">
        <h3>{post.title}</h3>
        <p className="blog-meta">
          By {post.author} | {formattedDate}
        </p>
        <p className="blog-excerpt">{post.excerpt}</p>
        <Link to={`/blog/${post.id}`} className="read-more">
          Read More →
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
