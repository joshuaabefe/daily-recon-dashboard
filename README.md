# 🎖️ Daily Recon Dashboard

A sleek, military-themed dashboard that provides real-time weather updates, breaking news from multiple categories, and curated photo galleries—all in one elegant interface.

## ✨ Features

- **🌤️ Real-time Weather** - Get current weather conditions for any city worldwide
- **📰 Breaking News** - Stay updated with news from World, Business, Technology, Sports, and Environment
- **📸 Photo Gallery** - Search and browse stunning photos from Unsplash
- **🎨 Dynamic Backgrounds** - Auto-rotating background images every 15 seconds
- **⚡ Split-Screen Layout** - Fixed left panel with scrollable right sidebar
- **📱 Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **🎭 Army Green Theme** - Professional black, white, and army green color scheme

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with glassmorphism effects
- **JavaScript (ES6+)** - Vanilla JS for all functionality
- **Bootstrap 5.3** - Responsive grid system
- **Font Awesome 6.5.1** - Icons
- **APIs:**
  - OpenWeatherMap API - Weather data
  - The Guardian API - News articles
  - Unsplash API - High-quality photos

## 📋 Prerequisites

Before running this project, you'll need API keys from:

1. [OpenWeatherMap](https://openweathermap.org/api) - Free tier available
2. [The Guardian](https://open-platform.theguardian.com/) - Free API key
3. [Unsplash](https://unsplash.com/developers) - Free developer account

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/joshuaabefe/daily-recon-dashboard.git
cd daily-recon-dashboard
```

2. Open `js/script.js` and replace the API keys with your own:
```javascript
const API_CONFIG = {
    openWeatherMap: {
        key: 'YOUR_OPENWEATHERMAP_API_KEY',
        // ...
    },
    guardian: {
        key: 'YOUR_GUARDIAN_API_KEY',
        // ...
    },
    unsplash: {
        key: 'YOUR_UNSPLASH_API_KEY',
        // ...
    }
};
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

4. Navigate to `http://localhost:8000`

## 📁 Project Structure
```
daily-recon-dashboard/
│
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles and themes
├── js/
│   └── script.js       # All JavaScript functionality
└── README.md           # This file
```

## 🎯 Key Features Breakdown

### Weather Section
- City search functionality
- Temperature, humidity, and wind speed
- Weather condition icons
- Date and time display

### News Section
- Multiple category selection
- 6 latest headlines per category
- Direct links to full articles
- News grid with images

### Photo Gallery
- Custom search terms
- 6 high-quality images
- Smooth hover effects
- Responsive grid layout

### UI/UX
- Glassmorphism design
- Smooth animations
- Hidden scrollbars
- Fixed left panel
- Sticky header
- Smooth scroll to top

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --army-green: #4a5f3a;
    --army-green-light: #6b8456;
    --army-green-dark: #2d3a24;
    /* ... */
}
```

### Background Images
Modify the array in `js/script.js`:
```javascript
const BACKGROUND_IMAGES = [
    'your-image-url-1.jpg',
    'your-image-url-2.jpg',
    // ...
];
```

### Background Rotation Speed
Change the interval (default: 15 seconds):
```javascript
setInterval(changeBackground, 15000); // milliseconds
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Joshua Abefe**

- GitHub: [@joshuaabefe](https://github.com/joshuaabefe)
- Website: [joshuaabefe.github.io](https://joshuaabefe.github.io)

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- News articles from [The Guardian](https://www.theguardian.com/)
- Photos from [Unsplash](https://unsplash.com/)
- Icons by [Font Awesome](https://fontawesome.com/)

⭐ **Star this repo if you find it helpful!**
