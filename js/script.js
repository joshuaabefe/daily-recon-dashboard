// ============================================
// MODERN DAILY DIGEST DASHBOARD SCRIPT
// ============================================

// Background images array (military/nature themed)
const BACKGROUND_IMAGES = [
    'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2000', // Military helicopter
    'https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=2000', // Forest
    'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?q=80&w=2000', // Mountain landscape
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000', // Forest path
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2000', // Mountain peak
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000', // Nature landscape
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000', // Wilderness
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2000'  // Lake mountains
];

let currentBackgroundIndex = 0;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// App Initialization
function initializeApp() {
    setupNavbarToggle();
    setupEventListeners();
    setInitialBackground();
    startBackgroundRotation();
    loadInitialData();
    setupSmoothScroll();
}

// ============================================
// BACKGROUND ROTATION FUNCTIONALITY
// ============================================

function setInitialBackground() {
    document.body.style.backgroundImage = `url('${BACKGROUND_IMAGES[0]}')`;
}

function changeBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % BACKGROUND_IMAGES.length;
    const newBgUrl = BACKGROUND_IMAGES[currentBackgroundIndex];
    
    // Preload the next image
    const img = new Image();
    img.src = newBgUrl;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${newBgUrl}')`;
    };
}

function startBackgroundRotation() {
    // Change background every 15 seconds
    setInterval(changeBackground, 15000);
}

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

function setupNavbarToggle() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarIcon = navbarToggler.querySelector('i');

    navbarToggler.addEventListener('click', function () {
        navbarIcon.classList.toggle('fa-bars');
        navbarIcon.classList.toggle('fa-times');
        
        // Add smooth animation
        navbarIcon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            navbarIcon.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// ============================================
// API CONFIGURATION
// ============================================

const API_CONFIG = {
    openWeatherMap: {
        key: '247688f87dee31e48304e3fc2a563021',
        baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
    },
    guardian: {
        key: '7ba621df-ecf5-46a1-8e98-298841e85b3b',
        baseUrl: 'https://content.guardianapis.com/search'
    },
    unsplash: {
        key: 't8Q8YTA7muHDj4y94S7q1iQaj3AubCj6ybKiNJb0rZA',
        baseUrl: 'https://api.unsplash.com/photos/random'
    }
};

// Default Configuration
const DEFAULT_CONFIG = {
    city: 'Lagos',
    newsCategory: 'world',
    photoSearchTerm: 'nature',
    defaultNewsCategory: 'latest'
};

// ============================================
// WEATHER FUNCTIONALITY
// ============================================

async function fetchWeatherData(city) {
    try {
        const url = `${API_CONFIG.openWeatherMap.baseUrl}?q=${encodeURIComponent(city)}&appid=${API_CONFIG.openWeatherMap.key}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        
        const data = await response.json();

        return {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon,
            country: data.sys.country,
            timestamp: data.dt,
            city: data.name
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

async function updateWeather(city) {
    const weatherSection = document.getElementById('weather-section');
    
    if (!city || city.trim() === '') {
        showError(weatherSection, 'Please enter a location');
        return;
    }

    // Show loading state
    weatherSection.innerHTML = createLoadingCard();
    
    const weatherData = await fetchWeatherData(city);

    if (weatherData) {
        updateBackgroundBasedOnWeather(weatherData.condition);
        weatherSection.innerHTML = createWeatherCard(weatherData);
        
        // Add entrance animation
        setTimeout(() => {
            weatherSection.querySelector('.weather-card').style.opacity = '1';
            weatherSection.querySelector('.weather-card').style.transform = 'translateY(0)';
        }, 100);
    } else {
        showError(weatherSection, `Unable to fetch weather data for "${city}". Please check the city name and try again.`);
    }
}

function createWeatherCard(data) {
    const iconUrl = `https://openweathermap.org/img/w/${data.icon}.png`;
    const dateTime = new Date(data.timestamp * 1000);
    const formattedDate = dateTime.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const formattedTime = dateTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    return `
        <div class="weather-card" style="opacity: 0; transform: translateY(20px); transition: all 0.5s ease;">
            <img class="weather-image" src="${iconUrl}" alt="${data.condition}">
            <h2><i class="fas fa-map-marker-alt"></i> ${data.city}, ${data.country}</h2>
            <p class="weather-temperature">${data.temperature}°C</p>
            <p class="weather-condition">${data.condition}</p>
            <div class="weather-info">
                <span><i class="fas fa-tint"></i> ${data.humidity}%</span>
                <span><i class="fas fa-wind"></i> ${data.windSpeed} m/s</span>
            </div>
            <div class="weather-info">
                <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
            </div>
            <div class="weather-info">
                <span><i class="fas fa-clock"></i> ${formattedTime}</span>
            </div>
        </div>
    `;
}

function updateBackgroundBasedOnWeather(condition) {
    // Keep the rotating background images
    // Weather condition will only affect overlay darkness
    const conditionLower = condition.toLowerCase();
    
    // No need to change background, just keep rotating images
    // The dark overlay in CSS provides readability
}

// ============================================
// NEWS FUNCTIONALITY
// ============================================

async function fetchNewsData(category) {
    try {
        const url = `${API_CONFIG.guardian.baseUrl}?q=${encodeURIComponent(category)}&api-key=${API_CONFIG.guardian.key}&page-size=10`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('News data not found');
        }
        
        const data = await response.json();

        return data.response.results.slice(0, 6).map(article => ({
            title: article.webTitle,
            link: article.webUrl,
            section: article.sectionName
        }));
    } catch (error) {
        console.error('Error fetching news data:', error);
        return [];
    }
}

async function updateNews(category) {
    const newsSection = document.getElementById('news-section');
    
    // Show loading state
    newsSection.innerHTML = '<div class="loading" style="height: 200px; border-radius: 12px;"></div>';
    
    const newsData = await fetchNewsData(category);

    if (newsData.length > 0) {
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        newsSection.innerHTML = `
            <h2><i class="fas fa-newspaper"></i> ${categoryName} News</h2>
            ${newsData.map(item => createNewsCard(item)).join('')}
        `;
        
        // Add staggered entrance animation
        const newsCards = newsSection.querySelectorAll('.news-card');
        newsCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 100);
        });
    } else {
        showError(newsSection, `Unable to fetch ${category} news at this time.`);
    }
}

function createNewsCard(item) {
    return `
        <div class="news-card">
            <p>
                <i class="fas fa-link news-icon"></i>
                <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
            </p>
        </div>
    `;
}

async function updateDefaultNewsAndPhotosGrid() {
    const defaultNewsGrid = document.getElementById('default-news-grid');
    
    // Show loading state
    defaultNewsGrid.innerHTML = Array(6).fill('<div class="loading" style="height: 300px; border-radius: 20px;"></div>').join('');
    
    const [newsData, photosData] = await Promise.all([
        fetchNewsData(DEFAULT_CONFIG.defaultNewsCategory),
        fetchPhotoData(DEFAULT_CONFIG.photoSearchTerm)
    ]);

    if (newsData.length > 0 && photosData.length > 0) {
        defaultNewsGrid.innerHTML = newsData.map((newsItem, index) => 
            createDefaultNewsCard(newsItem, photosData[index])
        ).join('');
        
        // Add staggered entrance animation
        const cards = defaultNewsGrid.querySelectorAll('.default-news-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    } else {
        showError(defaultNewsGrid, 'Unable to fetch news and photos at this time.');
    }
}

function createDefaultNewsCard(newsItem, photoUrl) {
    return `
        <div class="default-news-card" style="opacity: 0; transform: translateY(30px);">
            <div class="default-news-image">
                <img src="${photoUrl}" alt="News Image" loading="lazy">
                <p><i class="fas fa-image"></i> Featured Image</p>
            </div>
            <p>
                <i class="fas fa-link news-icon"></i>
                <a href="${newsItem.link}" target="_blank" rel="noopener noreferrer">${newsItem.title}</a>
            </p>
        </div>
    `;
}

// ============================================
// PHOTO GALLERY FUNCTIONALITY
// ============================================

async function fetchPhotoData(searchTerm) {
    try {
        const url = `${API_CONFIG.unsplash.baseUrl}?query=${encodeURIComponent(searchTerm)}&count=6&client_id=${API_CONFIG.unsplash.key}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Photo data not found');
        }
        
        const data = await response.json();
        return data.map(photo => photo.urls.regular);
    } catch (error) {
        console.error('Error fetching photo data:', error);
        return [];
    }
}

async function updatePhotoGallery(searchTerm) {
    const photoGallery = document.getElementById('photo-gallery');
    
    if (!searchTerm || searchTerm.trim() === '') {
        showError(photoGallery, 'Please enter a photo search term');
        return;
    }

    // Show loading state
    photoGallery.innerHTML = `
        <h2><i class="fas fa-images"></i> ${searchTerm}</h2>
        ${Array(6).fill('<div class="loading" style="height: 150px; border-radius: 12px;"></div>').join('')}
    `;
    
    const photoData = await fetchPhotoData(searchTerm);

    if (photoData.length > 0) {
        const capitalizedTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
        photoGallery.innerHTML = `
            <h2><i class="fas fa-images"></i> ${capitalizedTerm}</h2>
            ${photoData.map(photo => createPhotoContainer(photo, searchTerm)).join('')}
        `;
        
        // Add staggered entrance animation
        const containers = photoGallery.querySelectorAll('.img-container');
        containers.forEach((container, index) => {
            container.style.opacity = '0';
            container.style.transform = 'scale(0.8)';
            setTimeout(() => {
                container.style.transition = 'all 0.5s ease';
                container.style.opacity = '1';
                container.style.transform = 'scale(1)';
            }, index * 100);
        });
    } else {
        photoGallery.innerHTML = `
            <h2><i class="fas fa-images"></i> ${searchTerm}</h2>
            <p class="error-message">Unable to fetch photos for "${searchTerm}". Try a different search term.</p>
        `;
    }
}

function createPhotoContainer(photoUrl, searchTerm) {
    return `
        <div class="img-container" style="opacity: 0; transform: scale(0.8);">
            <img src="${photoUrl}" alt="${searchTerm} Photo" loading="lazy">
        </div>
    `;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function createLoadingCard() {
    return '<div class="weather-card loading" style="height: 300px;"></div>';
}

function showError(element, message) {
    element.innerHTML = `<p class="error-message"><i class="fas fa-exclamation-circle"></i> ${message}</p>`;
}

function setupSmoothScroll() {
    // Handle all anchor links including back to top
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // If href is just "#" or empty, scroll to top
            if (href === '#' || href === '') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Otherwise scroll to the target element
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Also add a specific handler for back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Weather update
    const updateWeatherBtn = document.getElementById('update-weather-button');
    const locationInput = document.getElementById('location-input');
    
    updateWeatherBtn.addEventListener('click', () => {
        const city = locationInput.value.trim();
        updateWeather(city);
    });
    
    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const city = locationInput.value.trim();
            updateWeather(city);
        }
    });

    // News update
    const updateNewsBtn = document.getElementById('update-news-button');
    const categorySelect = document.getElementById('category-select');
    
    updateNewsBtn.addEventListener('click', () => {
        const category = categorySelect.value;
        updateNews(category);
    });

    // Photo gallery update
    const updatePhotoBtn = document.getElementById('update-photo-gallery-button');
    const photoSearchInput = document.getElementById('photo-search-input');
    
    updatePhotoBtn.addEventListener('click', () => {
        const searchTerm = photoSearchInput.value.trim();
        updatePhotoGallery(searchTerm);
    });
    
    photoSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = photoSearchInput.value.trim();
            updatePhotoGallery(searchTerm);
        }
    });
}

// ============================================
// INITIAL DATA LOAD
// ============================================

function loadInitialData() {
    // Load all sections with default values
    updateWeather(DEFAULT_CONFIG.city);
    updateDefaultNewsAndPhotosGrid();
    updateNews(DEFAULT_CONFIG.newsCategory);
    updatePhotoGallery(DEFAULT_CONFIG.photoSearchTerm);
    
    // Add a welcome animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Add intersection observer for lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Observe all images with data-src attribute
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    });
}