# San Carlos City Tourism Blog Site - Development Instructions

This is a React-based tourism blog site for San Carlos City featuring blog posts, destination listings, and image galleries.

## Project Overview
- **Type**: React Web Application with Expo support
- **Framework**: React 18+ with Vite
- **Features**: Blog management, tourism destinations, image galleries, responsive design

## Project Setup Progress

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements
- [x] Scaffold the Project
- [x] Customize the Project
- [x] Install Required Extensions
- [x] Compile the Project
- [x] Create and Run Task
- [ ] Launch the Project
- [ ] Ensure Documentation is Complete

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Footer
│   ├── BlogCard.jsx    # Blog post card
│   ├── DestinationCard.jsx  # Destination card
│   ├── Gallery.jsx     # Photo gallery
│   └── TestimonialSection.jsx  # Testimonials
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Blog.jsx        # Blog listing
│   ├── BlogDetail.jsx  # Individual blog post
│   ├── Destinations.jsx  # Destinations listing
│   ├── About.jsx       # About page
│   └── Contact.jsx     # Contact page
├── styles/             # CSS stylesheets
│   ├── Header.css
│   ├── Footer.css
│   ├── BlogCard.css
│   ├── DestinationCard.css
│   ├── Gallery.css
│   ├── TestimonialSection.css
│   ├── Home.css
│   ├── Blog.css
│   ├── BlogDetail.css
│   ├── Destinations.css
│   ├── About.css
│   └── Contact.css
├── data/               # Data files
│   └── touristicData.js  # Tourism data
├── App.jsx             # Main app component
├── App.css             # App styles
└── index.css           # Global styles
```

## Development Guidelines

- Use React hooks for state management
- Implement responsive design with mobile-first approach
- Create reusable components for blog posts, destination cards, and galleries
- Use environment variables for API endpoints
- Follow React best practices and conventions

## Available Routes

- `/` - Home page
- `/blog` - Blog listing with category filtering
- `/blog/:id` - Individual blog post
- `/destinations` - All destinations
- `/about` - About page
- `/contact` - Contact page

## Features Implemented

1. **Responsive Navigation**: Hamburger menu for mobile devices
2. **Blog System**: Category filtering, featured posts, related articles
3. **Destination Showcase**: Cards with activities, ratings, and operating hours
4. **Photo Gallery**: Interactive gallery with lightbox modal
5. **Testimonials**: Visitor reviews and ratings
6. **Contact Form**: Working form with validation
7. **Mobile-First Design**: Fully responsive across all devices
8. **Modern Styling**: Gradient headers, smooth transitions, hover effects
9. **Semantic HTML**: Proper structure and accessibility

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Technologies Used

- React 18+
- React Router DOM (v6)
- Vite
- CSS3 (Flexbox, Grid)
- JavaScript ES6+
