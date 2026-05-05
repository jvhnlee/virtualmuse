import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightIcon?: ReactNode;
  onRightClick?: () => void;
}

export default function Header({ title, onBack, rightIcon, onRightClick }: HeaderProps) {
  return (
    <div className="flex justify-between items-center px-6 py-8 z-20 shrink-0 sticky top-0 bg-transparent">
      {onBack ? (
        <button 
          onClick={onBack} 
          className="text-white p-2 glass-thin rounded-full hover:bg-white/10 transition-colors shadow-sm"
        >
          <ChevronLeft strokeWidth={1} className="w-5 h-5" />
        </button>
      ) : (
        <div className="w-9"></div> /* Spacer */
      )}
      
      <h1 className="text-sm font-bold text-white tracking-widest uppercase text-center flex-1">{title}</h1>
      
      {rightIcon ? (
        <button 
          onClick={onRightClick}
          className="p-2 text-white glass-thin rounded-full shadow-sm hover:bg-white/10 transition-colors cursor-pointer"
        >
          {rightIcon}
        </button>
      ) : (
        <div className="w-9"></div> /* Spacer */
      )}
    </div>
  );
}
