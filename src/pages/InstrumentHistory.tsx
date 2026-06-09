import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/ui/Header';
import { useAppStore } from '../store/useAppStore';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

export default function InstrumentHistory() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { instruments } = useAppStore();
  
  const instrument = instruments.find(inst => inst.id === id);

  if (!instrument) return null;

  return (
    <motion.div 
      className="w-full h-full flex flex-col bg-slate-900 overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <Header title="History & Origin" onBack={() => navigate(-1)} />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-12">
        <div className="w-full h-48 glass-regular rounded-2xl overflow-hidden shadow-lg border border-white/10">
          {instrument.illustration ? (
            <img 
              src={instrument.illustration} 
              alt={instrument.name} 
              className="w-full h-full object-fill"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30 italic text-sm">
              Historical Illustration Placeholder
            </div>
          )}
        </div>

        <section>
          <h2 className="text-2xl font-bold text-white mb-2">{instrument.name}</h2>
          <div className="flex space-x-2 mb-6">
            <span className="px-3 py-1 glass-thick text-vm-purple-500 rounded-full text-xs font-bold uppercase tracking-wider">
              {instrument.category}
            </span>
            <span className="px-3 py-1 glass-thin text-white/70 rounded-full text-xs font-bold">
              {instrument.origin}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-white/90 mb-3">Historical Context</h3>
          <p className="text-white/70 leading-relaxed text-sm bg-white/5 p-4 rounded-xl border border-white/10">
            {instrument.history}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white/90 mb-3">How it's Played</h3>
          <p className="text-white/70 leading-relaxed text-sm">
            {instrument.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {instrument.gestures.map(gesture => (
              <span key={gesture} className="px-3 py-1 glass-thin rounded-lg text-[10px] font-bold text-vm-purple-500 uppercase tracking-widest border border-vm-purple-500/30">
                {gesture}
              </span>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
