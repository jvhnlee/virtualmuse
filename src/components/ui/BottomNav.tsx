import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, ScanLine, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        className="glass-thick flex items-center justify-between px-6 py-3 rounded-full"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <button 
          onClick={() => navigate('/gallery')} 
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors ${current === '/gallery' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white/80'}`}
        >
          <LayoutGrid strokeWidth={1} className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => navigate('/scanner')} 
          className="mx-6 flex items-center justify-center relative group"
        >
          {/* Subtle haptic ring effect on hover */}
          <div className="absolute inset-0 bg-vm-purple-500 rounded-full scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-20 transition-all duration-300" />
          <div className="w-12 h-12 bg-vm-purple-500 rounded-full text-white flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(139,92,246,0.5)] z-10">
            <ScanLine strokeWidth={1} className="w-6 h-6" />
          </div>
        </button>
        
        <button 
          onClick={() => navigate('/profile')} 
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors ${current === '/profile' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white/80'}`}
        >
          <User strokeWidth={1} className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
}
