// Import the ReactGA module for Google Analytics integration
import ReactGA from 'react-ga';

/**
 * Function to initialize Google Analytics with the provided tracking ID.
 * 
 * The tracking ID is retrieved from the environment variables.
 */
const initializeAnalytics = () => {
    // Retrieve the Google Analytics tracking ID from environment variables
    const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID; // Ensure this environment variable is set

    // Initialize Google Analytics with the tracking ID
    ReactGA.initialize(trackingId);
};

// Export the initializeAnalytics function as the default export
export default initializeAnalytics;