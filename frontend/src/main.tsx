import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/appcontext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
  <AppProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </AppProvider>
   </BrowserRouter>
)

