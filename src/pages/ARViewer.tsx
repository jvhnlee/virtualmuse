import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import { Suspense, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Info, Play, ChevronLeft, Headphones, Pause } from 'lucide-react';
import * as THREE from 'three';
import { useAppStore } from '../store/useAppStore';
import InstrumentModel from '../components/3d/InstrumentModel';

// Simple loading spinner for the 3D canvas
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center pointer-events-none">
        <div className="w-8 h-8 border-4 border-vm-purple-500/30 border-t-vm-purple-500 rounded-full animate-spin mb-2" />
        <span className="text-white font-mono text-xs tracking-widest">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

// Camera Rig to handle snapping to specific views
function CameraRig({ isPlayMode, instrumentId }: { isPlayMode: boolean, instrumentId: string }) {
  const vec = new THREE.Vector3();
  
  useFrame((state) => {
    if (isPlayMode) {
      let targetPos = [0, 0, 5]; // Default Front (Serunai)
      if (instrumentId === 'kompang') targetPos = [0, 5, 0]; // Top View
      if (instrumentId === 'sape') targetPos = [5, 0, 0]; // Right View
      
      state.camera.position.lerp(vec.set(targetPos[0], targetPos[1], targetPos[2]), 0.1);
      state.camera.lookAt(0, 0, 0);
    }
  });
  return null;
}

export default function ARViewer() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { instruments } = useAppStore();
  
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [visualHits, setVisualHits] = useState<{id: number, x: number, y: number}[]>([]);
  const [strokes, setStrokes] = useState<{id: number, points: {x: number, y: number}[]}[]>([]);
  const [currentStrokeId, setCurrentStrokeId] = useState<number | null>(null);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  
  const instrument = instruments.find(inst => inst.id === id);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const interactionAudiosRef = useRef<HTMLAudioElement[]>([]);
  const kompangHitIndexRef = useRef(0);

  useEffect(() => {
    const handleEnded = () => setIsPlayingFull(false);
    if (instrument) {
      audioRef.current = new Audio(instrument.audioPath);
      audioRef.current.addEventListener('ended', handleEnded);

      if (instrument.id === 'kompang') {
        interactionAudiosRef.current = [
          new Audio('/audio/kompang-single-hit-1.wav'),
          new Audio('/audio/kompang-single-hit-2.wav')
        ];
      } else if (instrument.id === 'sape') {
        interactionAudiosRef.current = [
          new Audio('/audio/sape-single-strum.wav')
        ];
      } else if (instrument.id === 'serunai') {
        interactionAudiosRef.current = [
          new Audio('/audio/serunai-single-blow.wav')
        ];
      } else {
        interactionAudiosRef.current = [];
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
      }
      interactionAudiosRef.current.forEach(audio => audio.pause());
    };
  }, [instrument]);

  const playInteractionAudio = () => {
    setIsPlayingFull(false);
    if (audioRef.current) audioRef.current.pause();
    
    if (instrument?.id === 'kompang') {
      const idx = kompangHitIndexRef.current;
      const audio = interactionAudiosRef.current[idx];
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
      kompangHitIndexRef.current = (idx + 1) % 2;
    } else if (instrument?.id === 'sape' || instrument?.id === 'serunai') {
      const audio = interactionAudiosRef.current[0];
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    }
  };

  const stopInteractionAudio = () => {
    if (instrument?.id === 'serunai') {
      const audio = interactionAudiosRef.current[0];
      if (audio) {
        audio.pause();
      }
    }
  };

  if (!instrument) {
    return (
      <div className="flex-1 flex items-center justify-center text-white bg-slate-900 w-full h-full">
        Instrument not found
      </div>
    );
  }

  const modelPath = `/models/${instrument.id}.glb`;

  // Determine gesture instruction
  let instructionText = "Tap to hit";
  if (instrument.id === 'sape') instructionText = "Swipe to strum";
  if (instrument.id === 'serunai') instructionText = "Hold to blow";

  // Gesture Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isPlayMode || !audioRef.current) return;
    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    // Add visual haptic ring
    const newHit = { id: Date.now(), x: e.clientX, y: e.clientY };
    setVisualHits(prev => [...prev, newHit]);
    setTimeout(() => {
      setVisualHits(prev => prev.filter(hit => hit.id !== newHit.id));
    }, 800);

    // Start stroke
    setCurrentStrokeId(newHit.id);
    setStrokes(prev => [...prev, { id: newHit.id, points: [{ x: e.clientX, y: e.clientY }] }]);

    // Play Audio logic (for hit and hold)
    if (instrument.id === 'kompang' || instrument.id === 'serunai') {
      playInteractionAudio();
    }
  };

  const lastMoveTime = useRef<number>(0);
  const lastMousePos = useRef<{x: number, y: number} | null>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPlayMode || !audioRef.current) return;

    // Only process movements when clicking/holding (dragging)
    if (currentStrokeId === null) return;

    const now = Date.now();
    const pos = { x: e.clientX, y: e.clientY };

    // Sape strumming (click and drag)
    if (instrument.id === 'sape') {
      if (lastMousePos.current && now - lastMoveTime.current > 50) {
        const dx = pos.x - lastMousePos.current.x;
        const dy = pos.y - lastMousePos.current.y;
        const velocity = Math.sqrt(dx * dx + dy * dy);
        
        // If moved fast enough, trigger a strum
        if (velocity > 30) {
          const audio = interactionAudiosRef.current[0];
          if (audio && (audio.paused || audio.currentTime > 0.5)) {
            setIsPlayingFull(false);
            if (audioRef.current) audioRef.current.pause();

            audio.currentTime = 0;
            audio.play();
            
            // Visual feedback for strum
            const newHit = { id: Date.now(), x: pos.x, y: pos.y };
            setVisualHits(prev => [...prev, newHit]);
            setTimeout(() => {
              setVisualHits(prev => prev.filter(hit => hit.id !== newHit.id));
            }, 800);
          }
        }
      }
      lastMousePos.current = pos;
      lastMoveTime.current = now;
    }
    
    // Append to current stroke if dragging
    setStrokes(prev => prev.map(s => {
      if (s.id === currentStrokeId) {
        return { ...s, points: [...s.points, pos] };
      }
      return s;
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPlayMode || !audioRef.current) return;
    
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    // Finish stroke
    if (currentStrokeId !== null) {
      const idToRemove = currentStrokeId;
      setCurrentStrokeId(null);
      setTimeout(() => {
        setStrokes(prev => prev.filter(s => s.id !== idToRemove));
      }, 600); // fade out duration
    }

    // For hold-to-blow instruments, pause on release
    stopInteractionAudio();
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!isPlayMode || !audioRef.current) return;
    // Trackpad swipe triggers wheel events
    if (instrument.id === 'sape' && Math.abs(e.deltaY) > 10) {
      const audio = interactionAudiosRef.current[0];
      if (audio && (audio.paused || audio.currentTime > 0.5)) {
        setIsPlayingFull(false);
        if (audioRef.current) audioRef.current.pause();

        audio.currentTime = 0;
        audio.play();
      }
    }
  };

  // Keyboard support for Hold (Serunai) and Hit (Kompang)
  useEffect(() => {
    if (!isPlayMode || !audioRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault(); // Prevent scrolling
        playInteractionAudio();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && instrument.id === 'serunai') {
        stopInteractionAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlayMode, instrument.id]);

  return (
    <motion.div 
      className="w-full h-full flex flex-col bg-slate-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 50 }}>
          <color attach="background" args={['#0f172a']} />
          
          <Suspense fallback={<Loader />}>
            <Environment preset="studio" resolution={256} />
            <InstrumentModel modelPath={modelPath} />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} resolution={256} frames={1} />
          </Suspense>

          <CameraRig isPlayMode={isPlayMode} instrumentId={instrument.id} />
          
          {/* Only allow orbit controls if not in play mode */}
          {!isPlayMode && (
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              minDistance={2}
              maxDistance={10}
              autoRotate
              autoRotateSpeed={0.5}
            />
          )}
        </Canvas>
      </div>

      {/* Invisible Gesture Overlay for Play Mode */}
      {isPlayMode && (
        <div 
          className="absolute inset-0 z-10 cursor-crosshair touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
        />
      )}

      {/* Gesture Strokes */}
      <svg className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        {strokes.map(stroke => {
          if (stroke.points.length < 2) return null;
          const d = `M ${stroke.points.map(p => `${p.x},${p.y}`).join(' L ')}`;
          return (
            <motion.path 
              key={stroke.id}
              d={d}
              fill="none"
              stroke="rgba(139,92,246,0.4)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 1, strokeWidth: 16 }}
              animate={currentStrokeId === stroke.id ? { opacity: 1, strokeWidth: 16 } : { opacity: 0, strokeWidth: 24 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ filter: 'drop-shadow(0 0 12px rgba(139,92,246,0.6))' }}
            />
          );
        })}
      </svg>

      {/* Visual Haptic Rings */}
      {visualHits.map(hit => (
        <motion.div 
          key={hit.id}
          className="absolute w-24 h-24 rounded-full border border-vm-purple-500 shadow-[0_0_30px_#8B5CF6] z-0 pointer-events-none"
          style={{ left: hit.x - 48, top: hit.y - 48 }}
          initial={{ scale: 0.2, opacity: 1 }}
          animate={{ scale: 3, opacity: 0, borderWidth: '0px' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* HUD Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6">
        
        {/* Top HUD */}
        <header className="flex justify-between items-start pointer-events-auto">
          {!isPlayMode ? (
            <button 
              onClick={() => navigate(-1)}
              className="p-3 glass-thin rounded-full text-white hover:bg-white/10 transition-colors shadow-sm"
            >
              <X strokeWidth={1} className="w-6 h-6" />
            </button>
          ) : (
            <button 
              onClick={() => {
                setIsPlayMode(false);
                setIsPlayingFull(false);
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
              }}
              className="px-4 py-2 glass-thick rounded-full text-white hover:bg-white/10 transition-colors shadow-sm flex items-center gap-2"
            >
              <ChevronLeft strokeWidth={1} className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">360 View</span>
            </button>
          )}

          {!isPlayMode && (
            <button 
              onClick={() => navigate(`/info/${instrument.id}`)}
              className="p-3 glass-thin rounded-full text-white hover:bg-white/10 transition-colors shadow-sm"
            >
              <Info strokeWidth={1} className="w-6 h-6" />
            </button>
          )}

          {isPlayMode && (
            <button 
              onClick={() => {
                if (audioRef.current) {
                  if (isPlayingFull) {
                    audioRef.current.pause();
                    setIsPlayingFull(false);
                  } else {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                    setIsPlayingFull(true);
                  }
                }
              }}
              className="px-4 py-2 glass-thick rounded-full text-white hover:bg-white/10 transition-colors shadow-sm flex items-center gap-2"
            >
              {isPlayingFull ? (
                <>
                  <Pause strokeWidth={1} className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-widest uppercase">Stop</span>
                </>
              ) : (
                <>
                  <Headphones strokeWidth={1} className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-widest uppercase">Listen</span>
                </>
              )}
            </button>
          )}
        </header>

        {/* Center Instruction Overlay (Play Mode) */}
        {isPlayMode && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50">
             <div className="text-white/40 text-sm tracking-[0.3em] uppercase font-mono bg-black/50 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
               {instructionText}
             </div>
          </div>
        )}

        {/* Bottom HUD */}
        {!isPlayMode && (
          <div className="flex justify-between items-end pointer-events-auto">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
                {instrument.name}
              </h1>
              <p className="text-xs uppercase tracking-widest text-vm-purple-500 font-bold mt-1 drop-shadow-md">
                {instrument.category}
              </p>
            </div>

            <button 
              onClick={() => setIsPlayMode(true)}
              className="w-16 h-16 bg-vm-purple-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 transition-all group"
            >
              <Play strokeWidth={1} className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
