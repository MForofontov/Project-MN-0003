// Function to handle Google login
export const handleGoogleLogin = () => {
  // Redirect the user to the Google login URL
  window.location.href = 'http://localhost:8000/api/google/login/';
};

// Function to handle Facebook login
export const handleFacebookLogin = () => {
  // Redirect the user to the Facebook login URL
  window.location.href = 'http://localhost:8000/api/facebook/login/';
};