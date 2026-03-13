import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react"; // স্টেট এবং ইফেক্ট যোগ করা হয়েছে
import Header from "./Header";
import BackgroundAnimation from "../anymetion/BackgroundAnimation"; 
import Preloader from "../anymetion/Preloader.jsx"; // আপনার প্রিলোডারটি ইম্পোর্ট করুন

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ২.৫ সেকেন্ড পর প্রিলোডারটি বন্ধ হয়ে মেইন সাইট দেখাবে
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // যদি লোডিং ট্রু থাকে, তবে শুধু প্রিলোডার দেখাবে
  if (loading) {
    return <Preloader />;
  }

  // লোডিং শেষ হলে মেইন ওয়েবসাইট লোড হবে
  return (
    <div className="relative min-h-screen flex flex-col font-sans text-white antialiased">
      
      {/* নতুন ব্যাকগ্রাউন্ড অ্যানিমেশন */}
      <BackgroundAnimation />

      <Header />
      
      {/* মেইন কন্টেন্ট */}
      <main className="flex-grow z-10">
        <Outlet />
      </main>
      
    </div>
  );
};

export default Root;