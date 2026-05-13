import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/touristicData';
import '../styles/BlogDetail.css';

function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="blog-detail-error">
        <h2>Post not found</h2>
        <p>Sorry, the blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="blog-detail">
      <article className="blog-detail-article">
        <div className="blog-detail-header">
          <span className="blog-category-badge">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="blog-detail-meta">
            <span className="author">By {post.author}</span>
            <span className="separator">•</span>
            <span className="date">{formattedDate}</span>
          </div>
        </div>

        <div className="blog-detail-image">
          <img src={post.image} alt={post.title} />
        </div>

        <div className="blog-detail-content">
          <p>{post.content}</p>
          
          <p>San Carlos City continues to attract visitors from around the world with its unique blend of natural attractions and cultural heritage. Whether you're seeking adventure, relaxation, or cultural immersion, this destination offers something for everyone.</p>

          <h3>Why Visit San Carlos City?</h3>
          <ul>
            <li>Stunning natural landscapes and scenic viewpoints</li>
            <li>Rich cultural heritage and historical sites</li>
            <li>Warm hospitality and authentic local experiences</li>
            <li>Diverse outdoor activities and adventures</li>
            <li>Delicious local cuisine and dining options</li>
          </ul>

          <p>Start planning your trip to San Carlos City today and create memories that will last a lifetime!</p>
        </div>

        <div className="blog-detail-footer">
          <div className="share-section">
            <h4>Share this article:</h4>
            <div className="share-buttons">
              <button className="share-btn facebook">Facebook</button>
              <button className="share-btn twitter">Twitter</button>
              <button className="share-btn email">Email</button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="related-posts">
          <h3>Related Articles</h3>
          <div className="related-posts-grid">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="related-post-card">
                <img src={relatedPost.image} alt={relatedPost.title} />
                <h4>{relatedPost.title}</h4>
                <p>{relatedPost.excerpt}</p>
                <Link to={`/blog/${relatedPost.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="blog-detail-nav">
        <Link to="/blog" className="btn btn-outline">← Back to Blog</Link>
      </div>
    </div>
  );
}

export default BlogDetail;
