// San Carlos City Tourism Data

// Local asset imports — add more images to src/assets/ and import them here
import image1 from '../assets/Image1.jpg';

export const destinations = [
  {
    id: 1,
    name: "Palo Alto Dam",
    description: "A stunning hydroelectric dam offering beautiful views and recreational activities",
    location: "San Carlos City",
    image: image1, // replace with actual photo
    activities: ["Photography", "Hiking", "Picnicking"],
    openingHours: "7:00 AM - 6:00 PM",
    rating: 4.8
  },
  {
    id: 2,
    name: "Cinalum Falls",
    description: "A picturesque waterfall nestled in nature, perfect for water activities and relaxation",
    location: "San Carlos City",
    image: image1, // replace with actual photo
    activities: ["Swimming", "Nature Walk", "Photography"],
    openingHours: "8:00 AM - 5:00 PM",
    rating: 4.6
  },
  {
    id: 3,
    name: "San Carlos City Hall",
    description: "A serene barangay offering authentic local experiences and cultural heritage",
    location: "San Carlos City",
    image: image1, // replace with actual photo
    activities: ["Cultural Tour", "Local Food", "Village Walk"],
    openingHours: "24/7",
    rating: 4.4
  },
  {
    id: 4,
    name: "San Carlos Cathedral",
    description: "Historic cathedral showcasing religious and architectural significance",
    location: "Downtown San Carlos City",
    image: image1, // replace with actual photo
    activities: ["Religious Tour", "Photography", "History"],
    openingHours: "6:00 AM - 8:00 PM",
    rating: 4.7
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Exploring the Hidden Gems of San Carlos City",
    author: "Maria Santos",
    date: "2026-05-10",
    category: "Travel Guide",
    excerpt: "Discover the lesser-known attractions that make San Carlos City a must-visit destination...",
    content: "San Carlos City is more than just its famous landmarks. In this comprehensive guide, we explore the hidden gems and local treasures that many tourists miss. From pristine waterfalls to traditional villages, San Carlos offers authentic experiences that blend nature and culture seamlessly.",
    image: "https://via.placeholder.com/600x400?text=Hidden+Gems",
    featured: true
  },
  {
    id: 2,
    title: "The Best Time to Visit San Carlos: A Seasonal Guide",
    author: "Juan Cruz",
    date: "2026-05-08",
    category: "Travel Tips",
    excerpt: "Learn about the best seasons to visit San Carlos City and what to expect throughout the year...",
    content: "Planning a trip to San Carlos City? This seasonal guide will help you choose the perfect time to visit. We cover weather patterns, festivals, and recommended activities for each season to ensure you have the best experience possible.",
    image: "https://via.placeholder.com/600x400?text=Seasonal+Guide",
    featured: true
  },
  {
    id: 3,
    title: "Adventure Activities in San Carlos: Thrills Await",
    author: "Carlos Miguel",
    date: "2026-05-05",
    category: "Adventure",
    excerpt: "Get your adrenaline pumping with these exciting adventure activities available in San Carlos...",
    content: "From water sports at Palo Alto Dam to hiking trails near Cinalum Falls, San Carlos City is an adventure paradise. This article details all the thrilling activities available for adventure seekers of all skill levels.",
    image: "https://via.placeholder.com/600x400?text=Adventure",
    featured: false
  },
  {
    id: 4,
    title: "Culinary Journey: Local Food You Must Try",
    author: "Anna Reyes",
    date: "2026-05-01",
    category: "Food & Culture",
    excerpt: "Taste the authentic flavors of San Carlos City with our guide to must-try local dishes...",
    content: "San Carlos City's culinary scene is rich and diverse, offering unique flavors that reflect the region's heritage. From traditional recipes passed down through generations to modern interpretations of classic dishes, this food guide covers everything you need to know.",
    image: "https://via.placeholder.com/600x400?text=Local+Food",
    featured: false
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    content: "San Carlos City exceeded all my expectations! The natural beauty combined with warm hospitality made it an unforgettable experience.",
    rating: 5,
    location: "USA"
  },
  {
    id: 2,
    name: "Marco Rodriguez",
    content: "The best vacation I've had in years. Every destination was breathtaking and the local guides were incredibly knowledgeable.",
    rating: 5,
    location: "Spain"
  },
  {
    id: 3,
    name: "Emma Chen",
    content: "A hidden paradise! I loved the mix of adventure and cultural experiences. Can't wait to return!",
    rating: 5,
    location: "Singapore"
  }
];
