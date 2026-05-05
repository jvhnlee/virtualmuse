import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Music, ArrowRight } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="w-full h-full relative overflow-hidden bg-slate-900"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Immersive Background / Simulated AR Viewport */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-vm-purple-700/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[50vw] h-[50vw] bg-vm-purple-500/20 rounded-full blur-[120px]" />
      </div>

      {/* Top Left HUD Element: Branding */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 z-10 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full glass-thick flex items-center justify-center">
          <Music strokeWidth={1} className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white leading-tight">VirtualMuse</h1>
          <p className="text-[10px] uppercase tracking-widest text-vm-purple-500 font-bold">WebAR Experience</p>
        </div>
      </motion.div>

      {/* Center Reticle / HUD Decor (Minimal) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-20">
        <div className="w-[60vw] h-[60vw] border border-white/20 rounded-full flex items-center justify-center">
           <div className="w-[40vw] h-[40vw] border border-dashed border-white/20 rounded-full" />
        </div>
      </div>

      {/* Bottom Right HUD Element: Call to Action */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-10 right-6 z-10"
      >
        <button 
          onClick={() => navigate('/login')}
          className="glass-thick hover:bg-vm-purple-500/40 text-white font-medium py-3 px-6 rounded-full transition-all flex items-center justify-center gap-3 active:scale-95 border border-vm-purple-500/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] group"
        >
          <span className="tracking-wide text-sm">Initialize</span>
          <ArrowRight strokeWidth={1} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Bottom Left HUD Element: Status */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-10 left-6 z-10 text-[10px] text-white/40 uppercase tracking-widest font-mono"
      >
        <p>SYS.READY</p>
        <p>V 1.0.0</p>
      </motion.div>
    </motion.div>
  );
}
