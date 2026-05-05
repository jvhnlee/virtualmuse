import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import { useState } from 'react';

export default function Settings() {
  const navigate = useNavigate();
  const [haptic, setHaptic] = useState(true);
  const [highQuality, setHighQuality] = useState(false);

  return (
    <motion.div 
      className="w-full h-full flex flex-col bg-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header title="Settings" onBack={() => navigate(-1)} />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-10">
        <section>
          <h3 className="text-[10px] font-bold text-white/40 mb-6 uppercase tracking-[0.2em]">Preferences</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center glass-thin p-5 rounded-2xl">
               <div className="flex flex-col">
                 <span className="font-bold text-white">Haptic Feedback</span>
                 <span className="text-[10px] text-white/50">Vibrate on interaction</span>
               </div>
               <button 
                 onClick={() => setHaptic(!haptic)}
                 className={`w-12 h-6 rounded-full relative transition-colors ${haptic ? 'bg-vm-purple-500' : 'bg-white/10'}`}
               >
                 <motion.div 
                   animate={{ x: haptic ? 24 : 4 }}
                   className="w-4 h-4 bg-white rounded-full absolute top-1" 
                 />
               </button>
            </div>

            <div className="flex justify-between items-center glass-thin p-5 rounded-2xl">
               <div className="flex flex-col">
                 <span className="font-bold text-white">High Quality Audio</span>
                 <span className="text-[10px] text-white/50">Lossless instrument samples</span>
               </div>
               <button 
                 onClick={() => setHighQuality(!highQuality)}
                 className={`w-12 h-6 rounded-full relative transition-colors ${highQuality ? 'bg-vm-purple-500' : 'bg-white/10'}`}
               >
                 <motion.div 
                   animate={{ x: highQuality ? 24 : 4 }}
                   className="w-4 h-4 bg-white rounded-full absolute top-1" 
                 />
               </button>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-bold text-white/40 mb-6 uppercase tracking-[0.2em]">About</h3>
          <div className="glass-thin rounded-2xl overflow-hidden divide-y divide-white/5">
             <div className="p-5 font-medium text-white/80 hover:bg-white/5 cursor-pointer transition-colors text-sm">Terms of Service</div>
             <div className="p-5 font-medium text-white/80 hover:bg-white/5 cursor-pointer transition-colors text-sm">Privacy Policy</div>
             <div className="p-5 text-white/30 text-xs">App Version 1.0.0 (Hi-Fi Prototype)</div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
