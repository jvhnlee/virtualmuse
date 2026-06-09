import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, CameraOff, FastForward } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default function Scanner() {
  const navigate = useNavigate();
  const [hasScanned, setHasScanned] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;
    
    const startScanner = async () => {
      try {
        // Explicitly request camera permissions before starting the stream
        const cameras = await Html5Qrcode.getCameras();
        
        if (cameras && cameras.length > 0) {
          html5QrCode = new Html5Qrcode("qr-reader");
          await html5QrCode.start(
            { facingMode: "environment" },
            { fps: 5 },
            (decodedText) => {
              if (decodedText) {
                handleScanSuccess(decodedText);
                html5QrCode?.stop().catch(console.error);
              }
            },
            () => {} // Ignore continuous parsing errors
          );
        } else {
          setCameraError("No cameras found on device.");
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setCameraError("Permission Denied (Ensure HTTPS/Localhost)");
      }
    };

    startScanner();

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, []);

  const handleScanSuccess = (data?: string) => {
    if (hasScanned) return;
    setHasScanned(true);
    
    setTimeout(() => {
      // Map basic terms to routes, or default to gallery
      const d = data?.toLowerCase() || '';
      if (d.includes('sape')) navigate('/info/sape');
      else if (d.includes('kompang')) navigate('/info/kompang');
      else if (d.includes('serunai')) navigate('/info/serunai');
      else navigate('/gallery');
    }, 1500);
  };

  return (
    <motion.div 
      className="w-full h-full flex flex-col bg-slate-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Live Video Feed or Fallback */}
      {cameraError ? (
        <div className="absolute inset-0 z-0 bg-black flex flex-col items-center justify-center p-6 text-center">
          <CameraOff className="w-16 h-16 text-white/20 mb-4" />
          <p className="text-white/60 font-mono text-sm tracking-widest">{cameraError}</p>
        </div>
      ) : (
        <div id="qr-reader" className="absolute inset-0 w-full h-full z-0 opacity-80 overflow-hidden bg-black [&>video]:absolute [&>video]:inset-0 [&>video]:w-full [&>video]:h-full [&>video]:object-cover [&>canvas]:hidden" />
      )}
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

      {/* Haptic Visual Cue (Ring Expansion on Scan) */}
      {hasScanned && (
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-emerald-400 shadow-[0_0_40px_#34d399] z-10 pointer-events-none"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 4, opacity: 0, borderWidth: '0px' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}

      {/* Top HUD */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20 pointer-events-none">
        <h2 className="text-white/70 font-mono text-xs tracking-widest uppercase flex items-center gap-2 mt-3">
          {hasScanned ? (
            <>
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              Target Acquired
            </>
          ) : cameraError ? (
            <>
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              Offline
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-vm-purple-500 rounded-full animate-pulse" />
              Scanning Matrix
            </>
          )}
        </h2>
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Dev Bypass Button */}
          <button 
            onClick={() => handleScanSuccess('sape')}
            className="p-3 bg-slate-800/80 border border-white/20 rounded-full text-white hover:bg-slate-700 transition-colors shadow-lg flex items-center justify-center"
            title="Dev Bypass: Jump to Sape"
          >
            <FastForward className="w-5 h-5 text-vm-purple-500" />
          </button>

          <button 
            onClick={() => navigate(-1)} 
            className="p-3 glass-thin rounded-full text-white hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <X strokeWidth={1} className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Bottom HUD */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-20 text-center pointer-events-none">
        <p className={`text-white/70 text-xs tracking-widest uppercase font-mono py-3 px-6 rounded-full inline-block backdrop-blur-md shadow-lg border ${hasScanned ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-black/60 border-white/10'}`}>
          {hasScanned ? "Processing Code..." : cameraError ? "Camera Unavailable" : "Align Target within View"}
        </p>
      </div>
    </motion.div>
  );
}
