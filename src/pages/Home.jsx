import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, destinations } from '../data/touristicData';
import BlogCard from '../components/BlogCard';
import DestinationCard from '../components/DestinationCard';
import Gallery from '../components/Gallery';
import TestimonialSection from '../components/TestimonialSection';
import '../styles/Home.css';

function Home() {
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);
  const featuredDestinations = destinations.slice(0, 3);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to San Carlos City</h1>
          <p>Discover Paradise in the Heart of the Philippines</p>
          <div className="hero-buttons">
            <Link to="/destinations" className="btn btn-primary">
              Explore Destinations
            </Link>
            <Link to="/blog" className="btn btn-secondary">
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Destinations</h2>
          <p className="section-subtitle">Explore some of our most popular attractions</p>
          <div className="destinations-grid">
            {featuredDestinations.map(destination => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
          <div className="view-all">
            <Link to="/destinations" className="btn btn-outline">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="featured-section alternate">
        <div className="container">
          <h2>Latest from Our Blog</h2>
          <p className="section-subtitle">Stay updated with travel tips and guides</p>
          <div className="blog-grid">
            {featuredPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="view-all">
            <Link to="/blog" className="btn btn-outline">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Explore San Carlos City?</h2>
          <p>Plan your perfect getaway today</p>
          <Link to="/contact" className="btn btn-primary">
            Contact Us for Reservations
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
