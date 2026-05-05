import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Gallery from './pages/Gallery.tsx';
import InstrumentDetail from './pages/InstrumentDetail.tsx';
import InstrumentHistory from './pages/InstrumentHistory.tsx';
import Profile from './pages/Profile.tsx';
import Settings from './pages/Settings.tsx';
import Achievements from './pages/Achievements.tsx';
import Scanner from './pages/Scanner.tsx';
import ARViewer from './pages/ARViewer.tsx';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/instrument/:id" element={<InstrumentDetail />} />
        <Route path="/info/:id" element={<InstrumentHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/ar/:id" element={<ARViewer />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="w-full h-screen overflow-hidden font-sans">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
