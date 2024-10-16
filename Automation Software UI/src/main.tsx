import { StrictMode } from 'react'; // Component wrapper, provides code with extra alerts and checks for component fluidity.
import { createRoot } from 'react-dom/client'; // Function, allows application to be optimized and run at a higher efficiency level
import App from './App.tsx'; // App component which houses the linked Login component w/ Dashboard component
import 'components/App.scss'; // App.scss file for global customization using SASS
import 'components/Login.scss'; // Login.scss file for local login screen customization using SASS
import 'components/Dashboard.scss'; // Login.scss file for local dashboard screen customization using SASS


createRoot(document.getElementById("root")!).render( // App deployment utilizing createRoot, locating the div element with id = "root" from index.HTML and deploying inside the container.
  <StrictMode> 
    <App />
  </StrictMode> // Surrounded with component wrapper StrictMode for security, formatted via JavaScript Prettier.
);
