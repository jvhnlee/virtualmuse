import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { PlayCircle, FileText } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Header from '../components/ui/Header';
import { useAppStore } from '../store/useAppStore';
import InstrumentModel from '../components/3d/InstrumentModel';

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 }
};

export default function InstrumentDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { instruments } = useAppStore();
  
  const instrument = instruments.find(inst => inst.id === id);

  if (!instrument) {
    return (
      <div className="flex-1 flex items-center justify-center text-white">
        Instrument not found
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full h-full flex flex-col relative overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="absolute top-[20%] left-[-20%] w-96 h-96 bg-vm-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      <Header title={instrument.name} onBack={() => navigate('/gallery')} />

      <div className="flex-1 overflow-y-auto z-10 pb-10">
        {/* Live 3D Preview */}
        <div className="w-full h-64 bg-black/40 relative shadow-lg pointer-events-none">
          <div className="absolute inset-0 z-0">
            <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
              <Suspense fallback={null}>
                <Environment preset="studio" />
                <InstrumentModel modelPath={`/models/${instrument.id}.glb`} />
              </Suspense>
            </Canvas>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
        </div>

        <div className="p-6 -mt-6 relative z-20">
          <div className="glass-regular p-6 rounded-3xl mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{instrument.name}</h2>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 glass-thick text-vm-purple-500 rounded-full text-xs font-bold shadow-sm">
                    {instrument.category}
                  </span>
                  <span className="px-3 py-1 glass-thin text-white/80 rounded-full text-xs font-bold">
                    {instrument.origin}
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-full text-xs font-bold animate-pulse">
                Discovered
              </span>
            </div>
            
            <p className="text-white/80 leading-relaxed mb-6 text-sm">
              {instrument.description}
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={() => navigate(`/ar/${instrument.id}`)}
                className="w-full bg-vm-purple-500 hover:bg-vm-purple-700 text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-vm-purple-500/25"
              >
                <PlayCircle strokeWidth={1} className="w-5 h-5" />
                Launch AR Experience
              </button>
              
              <button 
                onClick={() => navigate(`/info/${instrument.id}`)}
                className="w-full glass-thin hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <FileText strokeWidth={1} className="w-5 h-5" />
                Read Full History
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
