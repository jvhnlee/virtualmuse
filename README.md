# VirtualMuse: High-Fidelity WebAR Museum Prototype

VirtualMuse is a premium, interactive WebAR experience designed to showcase traditional Malaysian musical instruments (Kompang, Serunai, Sape). This prototype bridges digital archiving with tactile education using an Apple-inspired HUD aesthetic.

## 📂 Project Structure & Navigation

For developers new to the codebase, here is the breakdown of the directory structure:

### `src/`
- **`components/3d/`**: Contains the React-Three-Fiber logic for loading and rendering instrument models (`InstrumentModel.tsx`).
- **`components/ui/`**: Reusable UI primitives like the `Header` and the floating `BottomNav`.
- **`pages/`**: The core application screens.
  - `ARViewer.tsx`: The primary 3D viewport. Handles 360° exploration and the "Play Mode" gesture/audio engine.
  - `Scanner.tsx`: The geometric QR-discovery simulation.
  - `Gallery.tsx`: The main collection hub.
- **`store/`**: Global state management using Zustand (`useAppStore.ts`). This handles discovered instrument IDs, achievements, and user progress.
- **`mocks/`**: Static JSON data for instruments and achievements.
- **`index.css`**: The design system's heart. Contains custom Tailwind layers for `glass-*` utilities and Helvetica typography settings.

### `public/`
- **`models/`**: `.glb` files for the musical instruments.
- **`audio/`**: Interaction sound samples.
- **`images/illustrations/`**: High-resolution historical images used in the `InstrumentHistory` view.

## 🛠️ Key Architectural Concepts

### 1. The HUD Layout
The UI is designed as a **Heads-Up Display**. Instead of centered containers, elements are anchored to the viewport corners using absolute positioning. This ensures the 3D model remains the focal point at all times.

### 2. Glassmorphism System
We use a standardized frosted-glass effect across the app. 
- **Utility:** Use `glass-thin`, `glass-regular`, or `glass-thick` classes.
- **Implementation:** These are powered by `backdrop-filter: blur(12px)` and varying opacities of white/slate defined in `src/index.css`.

### 3. 3D Interaction Pipeline
- **Viewing:** We use `OrbitControls` for the 360° exploration phase.
- **Playing:** In "Play Mode", controls are disabled, and the camera snaps to a fixed view (Top/Front/Right) using the `CameraRig` component. 
- **Audio:** Interaction triggers are mapped to the `interactionType` found in `instruments.json`.

### 4. Animated Routing
Navigation is handled by `react-router-dom` and wrapped in `framer-motion`'s `AnimatePresence` (see `App.tsx`). Transitions use a consistent "slide-and-fade" variant to maintain the premium feel.

## 🚀 Getting Started

1. **Install:** `npm install`
2. **Run:** `npm run dev`
3. **Build:** `npm run build`

---
*Developed for the HCI Wireframe & Prototyping project.*
