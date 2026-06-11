import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Settings, LogOut } from 'lucide-react';
import Header from '../components/ui/Header';
import BottomNav from '../components/ui/BottomNav';
import { useAppStore } from '../store/useAppStore';

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.05 }
};

export default function Profile() {
  const navigate = useNavigate();
  const { discoveredInstrumentIds, achievements } = useAppStore();
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <motion.div 
      className="w-full h-full flex flex-col bg-slate-900 overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <Header title="My Profile" />

      <div className="flex-1 overflow-y-auto p-6 pb-24 z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 glass-thick rounded-full mb-4 flex items-center justify-center text-white text-3xl font-bold border-2 border-vm-purple-500 shadow-lg shadow-vm-purple-500/20">
            EM
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Explorer Member</h2>
          <p className="text-white/50 text-sm">explorer@virtualmuse.com</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div 
            onClick={() => navigate('/gallery')}
            className="glass-regular p-5 rounded-2xl text-center cursor-pointer hover:bg-white/10 transition-colors"
          >
             <div className="text-3xl font-bold text-vm-purple-500">{discoveredInstrumentIds.length}</div>
             <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">Instruments</div>
          </div>
          <div 
            onClick={() => navigate('/achievements')}
            className="glass-regular p-5 rounded-2xl text-center cursor-pointer hover:bg-white/10 transition-colors"
          >
             <div className="text-3xl font-bold text-vm-purple-500">{unlockedAchievements}</div>
             <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">Badges</div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => navigate('/achievements')}
            className="w-full glass-thin hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all flex items-center px-6 gap-4"
          >
            <Trophy strokeWidth={1} className="w-5 h-5 text-vm-purple-500" />
            <span className="flex-1 text-left">View Achievements</span>
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className="w-full glass-thin hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all flex items-center px-6 gap-4"
          >
            <Settings strokeWidth={1} className="w-5 h-5 text-vm-purple-500" />
            <span className="flex-1 text-left">Settings</span>
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full text-white/40 hover:text-white/60 font-medium py-4 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <LogOut strokeWidth={1} className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
      <BottomNav />
    </motion.div>
  );
}
