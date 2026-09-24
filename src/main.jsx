import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import Portfolio from './appart-theme/Portfolio.jsx'
createRoot(document.getElementById('root')).render(<React.StrictMode><Portfolio/><Analytics/></React.StrictMode>)