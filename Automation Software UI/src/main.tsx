import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './App.scss'

{/*
Rendering App file inside of root div 
surrounding by StrictMode for error checking and code safety
*/}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

