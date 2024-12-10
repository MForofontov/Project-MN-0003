import { StrictMode } from 'react'; // Import StrictMode from React to highlight potential problems in an application
import { createRoot } from 'react-dom/client'; // Import createRoot from ReactDOM to create a root for rendering the React application
import App from './App'; // Import the main App component
import './index.css'; // Import the main CSS file for global styles

// Create a root and render the App component inside the root element
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);