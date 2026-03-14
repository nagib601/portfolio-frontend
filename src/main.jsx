import { StrictMode, useEffect } from 'react' // useEffect যোগ করা হয়েছে
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes/Routes'
import { ThemeProvider } from './context/ThemeContext'

const AppRunner = () => {
  useEffect(() => {
    // ওয়েবসাইট ভিজিট করলেই ব্যাকএন্ডে ট্র্যাকিং ডাটা পাঠাবে
    const API_URL = import.meta.env.VITE_API_URL;
    
    const trackVisitor = async () => {
      try {
        await fetch(`${API_URL}/admin/viewers/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        console.error("Tracking Error:", error);
      }
    };

    trackVisitor();
  }, []);

  return <RouterProvider router={Routes} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppRunner />
    </ThemeProvider>
  </StrictMode>,
)