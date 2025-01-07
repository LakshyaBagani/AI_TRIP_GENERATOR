import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './components/Create-Trip'
import Headers from './components/customs/Headers'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './View-Trip/[tripId]'
import MyTrip from './components/Create-Trip/MyTrip'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />
  },
  {
    path : '/create-trip',
    element : <CreateTrip />
  },
  {
    path : '/view-trip/:tripId',
    element : <Viewtrip />
  },
  {
    path : '/my-trips',
    element : <MyTrip />
  }
])
createRoot(document.getElementById('root')).render(


       <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
           <Headers/>
           <Toaster />
           <RouterProvider router={router} />
       </GoogleOAuthProvider>
    
 
)
