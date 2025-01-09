import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { initializeSupabase } from './lib/supabase';
import './index.css';

// Initialize Supabase before rendering the app
initializeSupabase().then((initialized) => {
  if (!initialized) {
    console.error('Failed to initialize Supabase');
  }
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});