# Product Carousel Component

A responsive product carousel component that displays recommended products with "You Might Also Like" functionality. The carousel features smooth navigation, favorite product selection, and mobile-friendly touch interactions.

## Features

- Responsive design that adapts to different screen sizes
- Smooth scrolling carousel with navigation buttons
- Product cards with:
  - Product image
  - Product title
  - Price
  - Favorite button functionality
  - Add to cart button (mobile only)
- Touch-enabled sliding for mobile devices
- Local storage integration for favorites and product data caching
- Gradient fade effect on desktop view
- Snap scrolling on mobile devices

## Technical Requirements

- jQuery
- Modern web browser with CSS3 support
- Local storage enabled

## Installation

1. Include the component script in your project
2. Make sure jQuery is loaded before the component
3. The component will automatically initialize when loaded

## Component Structure

### HTML Structure
The component creates the following HTML structure:
```html
<div class="carousel-container">
    <div class="carousel-header">
        <h2 class="section-title">You Might Also Like</h2>
    </div>
    <button class="carousel-button prev">...</button>
    <div class="carousel-wrapper">
        <div class="carousel-track">...</div>
    </div>
    <button class="carousel-button next">...</button>
</div>
```

### Responsive Breakpoints

- Desktop (> 992px): 6.5 items per view
- Tablet (768px - 992px): 3 items per view
- Mobile Large (576px - 768px): 2 items per view
- Mobile Small (≤ 576px): 1 item per view

## Features Details

### Product Card
Each product card includes:
- Product image with aspect ratio 3:4
- Favorite button with heart icon
- Product title (limited to 2 lines)
- Price display
- Add to cart button (visible on mobile only)

### Favorite Functionality
- Favorites are stored in local storage under 'favouriteProducts' key
- Toggle functionality with visual feedback
- Persists across sessions

### Navigation
- Desktop: Arrow buttons for previous/next navigation
- Mobile: Touch-enabled swipe navigation with snap scrolling
- Automatic disable of navigation buttons at carousel boundaries

### Caching
- Product data is cached in local storage
- Reduces unnecessary API calls
- Improves performance

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers with touch support

## Data Requirements

The component expects product data in the following format:
```javascript
{
    id: string,
    name: string,
    price: number,
    img: string,
    url: string
}
```

## Performance Considerations
- Implements debounced window resize handling
- Uses image aspect ratio to prevent layout shifts
- Caches API responses in local storage
- Optimizes touch events for mobile devices

## Known Limitations
- Requires jQuery library
- Local storage must be enabled for favorites functionality
- Mobile view requires touch-enabled device for optimal experience
