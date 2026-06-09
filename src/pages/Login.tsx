import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useState, type FormEvent } from 'react';

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 }
};

export default function Login() {
  const navigate = useNavigate();
  const [isSimulating, setIsSimulating] = useState(false);

  const handleMockLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);
    // Simulate network delay for UX realism
    setTimeout(() => {
      setIsSimulating(false);
      navigate('/gallery');
    }, 1200);
  };

  return (
    <motion.div 
      className="w-full h-full flex flex-col p-6 relative overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="absolute top-1/4 right-[-20%] w-80 h-80 bg-vm-purple-500/20 rounded-full blur-[100px]" />

      <header className="w-full flex items-center mb-12 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 glass-thin rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronLeft strokeWidth={1} className="w-6 h-6 text-white" />
        </button>
      </header>

      <div className="flex-1 flex flex-col justify-center z-10 max-w-sm w-full mx-auto">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-white/60 mb-8">Sign in to sync your discovered instruments.</p>

        <form onSubmit={handleMockLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/80 pl-1">Email</label>
            <input 
              type="email" 
              required
              defaultValue="explorer@virtualmuse.com"
              className="glass-thin rounded-xl p-4 text-white outline-none focus:border-vm-purple-500/50 transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm text-white/80 pl-1">Password</label>
            <input 
              type="password" 
              required
              defaultValue="password123"
              className="glass-thin rounded-xl p-4 text-white outline-none focus:border-vm-purple-500/50 transition-colors"
            />
          </div>

          <button 
            type="submit"
            disabled={isSimulating}
            className="w-full bg-vm-purple-500 hover:bg-vm-purple-700 disabled:opacity-70 text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center active:scale-95 shadow-lg shadow-vm-purple-500/25"
          >
            {isSimulating ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
