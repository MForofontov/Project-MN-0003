// Import the ReactGA module for Google Analytics integration
import ReactGA from 'react-ga4';

/**
 * Function to initialize Google Analytics with the provided tracking ID.
 * 
 * The tracking ID is retrieved from the environment variables.
 */
export const initializeAnalytics = () => {
    // Retrieve the Google Analytics tracking ID from environment variables
    const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID; // Ensure this environment variable is set
    // Initialize Google Analytics with the tracking ID
    ReactGA.initialize(trackingId);
};

export const trackPageViewForAnalytics = (pagePath: string) => {
    ReactGA.send({ hitType: 'pageview', page: pagePath });
};
