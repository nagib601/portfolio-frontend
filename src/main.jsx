import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes/Routes'
import { ThemeProvider } from './context/ThemeContext'

const AppRunner = () => {
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    
    const trackVisitor = async () => {
      try {
        // বর্তমান পেজের নাম বের করা
        const currentPath = window.location.pathname;
        const pageName = currentPath === '/' ? 'Home' : 
                         currentPath.replace('/', '').charAt(0).toUpperCase() + currentPath.slice(2);

        await fetch(`${API_URL}/admin/viewers/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageName }) // পেজ নাম পাঠানো হচ্ছে
        });
      } catch (error) {
        console.error("Tracking Error:", error);
      }
    };

    trackVisitor();
  }, []); // এটি ওয়েবসাইট লোড হলে একবার চলবে

  return <RouterProvider router={Routes} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppRunner />
    </ThemeProvider>
  </StrictMode>
);