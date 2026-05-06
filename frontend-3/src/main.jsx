import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './Contexts/ContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* add contect provider at root level*/}
    <ContextProvider>
    <App />
    </ContextProvider>
  </StrictMode>,
)
