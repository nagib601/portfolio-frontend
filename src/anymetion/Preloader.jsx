import { motion } from "framer-motion";
import Logo from "../logo/Logo"; // আপনার লোগোর পাথ ঠিক করে নিন

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.1, 1],
          opacity: 1 
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="flex flex-col items-center gap-4"
      >
        {/* লোগো সাইজ এখানে বড় করে দেখানো হবে */}
        <div className="scale-[2]"> 
          <Logo />
        </div>
        
        {/* নিচে একটি ছোট লোডিং টেক্সট (ঐচ্ছিক) */}
        <motion.p 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-500 font-mono text-xs tracking-[0.3em] mt-10"
        >
          LOADING...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Preloader;