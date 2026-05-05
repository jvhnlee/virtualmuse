import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Settings, ChevronRight, HelpCircle } from 'lucide-react';
import Header from '../components/ui/Header';
import BottomNav from '../components/ui/BottomNav';
import { useAppStore } from '../store/useAppStore';

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 }
};

export default function Gallery() {
  const navigate = useNavigate();
  const { instruments, discoveredInstrumentIds } = useAppStore();

  const discovered = instruments.filter(inst => discoveredInstrumentIds.includes(inst.id));
  const locked = instruments.filter(inst => !discoveredInstrumentIds.includes(inst.id));

  return (
    <motion.div 
      className="w-full h-full flex flex-col relative overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-vm-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      <Header 
        title="Museum Gallery" 
        rightIcon={<Settings strokeWidth={1} className="w-5 h-5 hover:text-vm-purple-500 transition-colors" />} 
        onRightClick={() => navigate('/settings')}
      />

      <div className="flex-1 overflow-y-auto p-4 pb-24 z-10 space-y-8">
        
        {/* Discovered Section */}
        <section>
          <h2 className="text-white font-bold mb-4 px-2 tracking-wide text-sm">
            Discovered ({discovered.length})
          </h2>
          <div className="space-y-3">
            {discovered.map((inst) => (
              <div 
                key={inst.id} 
                onClick={() => navigate(`/instrument/${inst.id}`)}
                className="glass-regular p-4 rounded-2xl flex items-center cursor-pointer hover:bg-white/10 transition-colors group"
              >
                <div className="w-16 h-16 glass-thick rounded-xl mr-4 flex items-center justify-center overflow-hidden">
                  <div className="w-8 h-8 bg-vm-purple-500/50 rounded-full animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{inst.name}</h3>
                  <p className="text-xs text-vm-purple-500 font-medium tracking-wide uppercase mt-1">{inst.category}</p>
                </div>
                <ChevronRight strokeWidth={1} className="text-white/50 group-hover:text-white transition-colors w-5 h-5" />
              </div>
            ))}
          </div>
        </section>

        {/* Locked Section */}
        <section>
          <h2 className="text-white/60 font-bold mb-4 px-2 tracking-wide text-sm">
            Locked (Find QR Codes)
          </h2>
          <div className="space-y-3">
            {locked.map((inst) => (
              <div 
                key={inst.id} 
                className="glass-thin opacity-60 p-4 rounded-2xl flex items-center"
              >
                <div className="w-16 h-16 bg-black/20 rounded-xl mr-4 flex items-center justify-center">
                  <HelpCircle strokeWidth={1} className="w-5 h-5 text-white/40" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white/60 text-lg">Unknown Instrument</h3>
                  <p className="text-xs text-white/40 tracking-wide mt-1">Keep exploring</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </motion.div>
  );
}
