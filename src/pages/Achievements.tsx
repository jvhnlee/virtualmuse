import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import Header from '../components/ui/Header';
import { useAppStore } from '../store/useAppStore';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

// Dynamic Icon Component
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon strokeWidth={1} className={className} /> : <LucideIcons.HelpCircle strokeWidth={1} className={className} />;
};

export default function Achievements() {
  const navigate = useNavigate();
  const { achievements } = useAppStore();

  return (
    <motion.div 
      className="w-full h-full flex flex-col bg-slate-900"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <Header title="Achievements" onBack={() => navigate(-1)} />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-12">
        {achievements.map((ach) => (
          <div 
            key={ach.id} 
            className={`flex items-center p-5 rounded-2xl border transition-all ${
              ach.unlocked 
                ? 'glass-thick border-vm-purple-500/50 shadow-lg shadow-vm-purple-500/10' 
                : 'glass-thin border-white/5 opacity-50 grayscale'
            }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-5 ${
              ach.unlocked ? 'bg-vm-purple-500 text-white' : 'bg-white/10 text-white/30'
            }`}>
              <DynamicIcon name={ach.iconName} className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-lg ${ach.unlocked ? 'text-white' : 'text-white/40'}`}>
                {ach.title}
              </h3>
              <p className={`text-xs ${ach.unlocked ? 'text-white/60' : 'text-white/20'}`}>
                {ach.description}
              </p>
            </div>
            {ach.unlocked && (
              <div className="w-2 h-2 bg-vm-purple-500 rounded-full animate-ping" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
