import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import InteractionSandbox from './components/devouring-details-sandbox'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InteractionSandbox />
  </StrictMode>,
)
