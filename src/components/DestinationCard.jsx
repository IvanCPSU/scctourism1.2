import React from 'react';
import '../styles/DestinationCard.css';

function DestinationCard({ destination }) {
  return (
    <div className="destination-card">
      <div className="destination-image">
        <img src={destination.image} alt={destination.name} />
        <div className="destination-rating">
          <span className="star">⭐</span> {destination.rating}
        </div>
      </div>
      <div className="destination-content">
        <h3>{destination.name}</h3>
        <p className="destination-location">📍 {destination.location}</p>
        <p className="destination-description">{destination.description}</p>
        
        <div className="destination-activities">
          <strong>Activities:</strong>
          <div className="activity-tags">
            {destination.activities.map((activity, index) => (
              <span key={index} className="activity-tag">{activity}</span>
            ))}
          </div>
        </div>

        <p className="destination-hours">
          <strong>Hours:</strong> {destination.openingHours}
        </p>

        <button className="learn-more-btn">Learn More</button>
      </div>
    </div>
  );
}

export default DestinationCard;
