import React from 'react';
import { testimonials } from '../data/touristicData';
import '../styles/TestimonialSection.css';

function TestimonialSection() {
  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2>What Visitors Say</h2>
        <p className="testimonials-subtitle">Hear from travelers who've visited San Carlos City</p>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.content}"</p>
              <p className="testimonial-author">{testimonial.name}</p>
              <p className="testimonial-location">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
