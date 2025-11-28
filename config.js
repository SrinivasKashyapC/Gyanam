// Configuration for API URLs - Auto-detects environment
const CONFIG = {
    // Determine if running on localhost or production
    isLocalhost: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    
    // API Base URL - Change this for production deployment
    get apiBaseUrl() {
        if (this.isLocalhost) {
            return 'http://localhost:3000/api';
        }
        // For production, use relative path or your production domain
        return '/api'; // This will use the same domain as the frontend
    },
    
    // Frontend API keys (these are safe to expose for client-side APIs)
    // Note: These should have domain restrictions in Google Cloud Console
    YOUTUBE_API_KEY: 'AIzaSyALog2mrVl4Fd73or38hrspaXAQHtL9440',
    
    // Backend handles Gemini and Groq API calls for security
    // These keys are NOT exposed to the frontend
};

// Make available globally
window.APP_CONFIG = CONFIG;
