# VirtualMuse: High-Fidelity WebAR Museum Prototype

**Production URL:** [https://virtualmuse.vercel.app/](https://virtualmuse.vercel.app/)

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
- **Audio:** Interaction triggers are mapped to the `interactionType` found in `instruments.json`. Audio state is strictly managed to pause on unmounts or exits to prevent bleeding.

### 4. Scanner Pipeline
The AR discovery mechanism (`Scanner.tsx`) utilizes `html5-qrcode` to parse live webcam feeds. It explicitly calls `Html5Qrcode.getCameras()` to reliably trigger OS-level hardware permissions. A "Fast-Forward" dev-bypass button is included in the HUD for desktop testing without a camera.

### 5. Mobile Browser Optimization
The app is engineered to feel like a native application despite running in a mobile web browser:
- **Viewport Lockdown:** Uses `viewport-fit=cover` and locked fixed body positioning to eliminate native scroll rubber-banding.
- **Hardware Restraints:** 3D canvases are clamped to `dpr={[1, 1.5]}` to prevent GPU thermal throttling on modern 3x resolution iPhones/Androids. 
- **Memory Sharing:** Uses `@react-three/drei`'s `<Clone>` to share 3D geometry and materials across the Gallery and AR views.

### 6. Animated Routing
Navigation is handled by `react-router-dom` and wrapped in `framer-motion`'s `AnimatePresence` (see `App.tsx`). Transitions use a consistent "slide-and-fade" variant to maintain the premium feel.

## 🚀 Getting Started

1. **Install:** `npm install`
2. **Run Desktop:** `npm run dev`
3. **Build:** `npm run build`

### 📱 Testing on Mobile (Local Network)
To test the AR features and layout on your physical phone, you must expose the local dev server to your network:

1. Run `npm run dev -- --host`
2. Look for the `Network: http://<YOUR_IP_ADDRESS>:5173/` link in your terminal. **(Ensure you select your actual Wi-Fi adapter IP, not a VirtualBox or APIPA address).**
3. Type that exact address into your mobile browser.

> [!WARNING]
> **Windows Firewall:** If the page times out (ERR_CONNECTION_TIMED_OUT), your computer's firewall is blocking the connection. You must go to Windows Defender Firewall -> Inbound Rules, and create a rule to allow incoming traffic on Port `5173`. Alternatively, ensure your network profile is set to "Private".

> [!CAUTION]
> **University / Enterprise Wi-Fi (AP Isolation):** If you are on a campus network, the IT department likely has "AP Isolation" enabled. This physically prevents devices on the same Wi-Fi from connecting to each other. **Workaround:** Turn on your phone's Mobile Hotspot, connect your laptop to the hotspot, restart the server with `--host`, and use the newly generated IP address.

> [!IMPORTANT]
> **Camera Permissions on HTTP:** Mobile browsers (Chrome/Safari) completely block camera hardware access (`getUserMedia`) on insecure `http://` network addresses. To test the scanner on mobile, you will need to serve Vite over HTTPS using `@vitejs/plugin-basic-ssl`, or use a tunneling service like ngrok.

---
*Developed for the HCI Wireframe & Prototyping project.*
