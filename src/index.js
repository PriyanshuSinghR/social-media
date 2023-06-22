import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { SocialContext, SocialProvider } from './context/SocialContext';
import './index.css';
import App from './App';
import { makeServer } from './server';
export { SocialContext };

const container = document.getElementById('root');
const root = createRoot(container);

// Call make Server
makeServer();

root.render(
  <StrictMode>
    <Router>
      <SocialProvider>
        <App />
      </SocialProvider>
    </Router>
  </StrictMode>,
);
