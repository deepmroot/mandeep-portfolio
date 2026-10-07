import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import Portfolio from './appart-theme/Portfolio.jsx'
const root = document.getElementById('root')
const app = <React.StrictMode><Portfolio/><Analytics/></React.StrictMode>
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app) // Vite dev server does not pre-render HTML.