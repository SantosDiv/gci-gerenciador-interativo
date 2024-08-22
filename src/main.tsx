import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { DisciplineContextProvider } from './contexts/DisciplinesContext.tsx';
import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DisciplineContextProvider>
      <App />
    </DisciplineContextProvider>
  </StrictMode>,
)
