import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function Scanner() {
  const navigate = useNavigate();
  const [hasTapped, setHasTapped] = useState(false);

  const handleTap = () => {
    setHasTapped(true);
    // Simulate finding a QR code
    setTimeout(() => {
      navigate('/gallery');
    }, 1500);
  };

  return (
    <motion.div 
      className="w-full h-full flex flex-col bg-slate-900 relative overflow-hidden cursor-crosshair"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleTap}
    >
      {/* Geometric Mesh Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen"
           style={{
             backgroundImage: `radial-gradient(circle at center, rgba(139,92,246,0.3) 1px, transparent 1px)`,
             backgroundSize: '24px 24px'
           }}
      />

      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Haptic Visual Cue (Ring Expansion on Tap) */}
      {hasTapped && (
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-vm-purple-500 shadow-[0_0_30px_#8B5CF6] z-10 pointer-events-none"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 4, opacity: 0, borderWidth: '0px' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}

      {/* Top HUD */}
      <header className="w-full p-6 flex justify-between items-center z-20 relative">
        <h2 className="text-white/70 font-mono text-xs tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-vm-purple-500 rounded-full animate-pulse" />
          Awaiting Target
        </h2>
        <button 
          onClick={(e) => { e.stopPropagation(); navigate(-1); }} 
          className="p-3 glass-thin rounded-full text-white hover:bg-white/10 transition-colors"
        >
          <X strokeWidth={1} className="w-6 h-6" />
        </button>
      </header>

      {/* Bottom HUD */}
      <div className="mt-auto p-8 z-20 relative text-center">
        <p className="text-white/50 text-xs tracking-widest uppercase font-mono bg-black/40 py-2 px-4 rounded-full inline-block backdrop-blur-md">
          {hasTapped ? "Analyzing Mesh..." : "Tap Anywhere to Scan"}
        </p>
      </div>
    </motion.div>
  );
}
