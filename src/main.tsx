import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { DisciplineContextProvider } from './contexts/DisciplinesContext.tsx';
import './index.css';
import { GeminiContextProvider } from './contexts/GeminiContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GeminiContextProvider>
      <DisciplineContextProvider>
        <App />
      </DisciplineContextProvider>
    </GeminiContextProvider>
  </StrictMode>,
)
