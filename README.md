# VirtualMuse: High-Fidelity WebAR Museum Prototype

VirtualMuse is a premium, interactive WebAR experience designed to showcase traditional Malaysian musical instruments (Kompang, Serunai, Sape). This prototype bridges the gap between digital archiving and tactile education using cutting-edge web technologies.

## ✨ Project Highlights

- **Premium HUD Interface:** An Apple-inspired Heads-Up Display (HUD) with corner-anchored controls and a floating pill-shaped navigation dock.
- **Glassmorphism Design:** Extensive use of `backdrop-filter: blur(12px)` and translucent slate materials for a high-end aesthetic.
- **Interactive 3D Engine:** Real-time rendering of `.glb` models using React-Three-Fiber (R3F) and Drei.
- **Gesture-Based Audio:** Play instruments in a fixed "Play Mode" using realistic gestures (Tap, Hold, Swipe) accompanied by synced audio and haptic visual feedback.
- **Museum Discovery Flow:** A complete user journey from authentication and QR scanning to gallery collection and instrument history.

## 🛠️ Technology Stack

- **Core:** React 18+, TypeScript, Vite
- **3D Engine:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation:** `framer-motion` (UI transitions & haptics)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Icons:** Lucide-React (1px thin stroke weights)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🗺️ Implementation Roadmap

### Phase 1 & 2: Foundations & UI (Complete)
- [x] HUD Architecture & Navigation System
- [x] Helvetica Typography & 4px Baseline Grid
- [x] Global State for Discovery & Achievements

### Phase 3 & 4: 3D & Audio (Complete)
- [x] R3F Model Integration & 360° Viewer
- [x] Instrument-specific camera snapping (Top/Front/Right Views)
- [x] Gesture recognition engine & Audio playback

### Phase 5: Advanced AR (Upcoming)
- [ ] Live Webcam Background Simulation
- [ ] Scan-to-AR Pipeline Integration
- [ ] Real-world scale verification

---
*Developed as part of the HCI Wireframe & Prototyping project.*
