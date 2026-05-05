# Technical Specifications: VirtualMuse (Hi-Fi Prototype)

This document details the architecture, dependencies, and implementation strategy for transitioning the VirtualMuse wireframes into a functional, high-fidelity WebAR prototype.

## 1. Core Technology Stack
The application will be built as a modern Single Page Application (SPA) with a heavy emphasis on 3D rendering and real-time interaction.

*   **Frontend Framework:** `React 18+` with `TypeScript` for type safety and component atomicity.
*   **Build Tool:** `Vite` for rapid development and optimized production bundling.
*   **3D Engine:** `Three.js` wrapped in `@react-three/fiber` (R3F) for declarative 3D scene construction.
*   **AR Implementation:** `@react-three/xr` (WebXR API) for native browser AR capabilities, or `8th Wall` if advanced markerless SLAM is required for broader device support.
*   **State Management:** `Zustand` for performant, unopinionated global state (handling user progress, active instrument, and UI toggles without deep prop drilling).
*   **Styling:** `Tailwind CSS` for utility-first styling, ensuring responsive, mobile-first layouts and easy implementation of the glassmorphism design system.
*   **Animations:** `Framer Motion` for smooth UI transitions, micro-animations, and page routing.
*   **QR Scanner:** `html5-qrcode` for accessing the device camera and parsing museum codes.

## 2. 3D Assets & Media Sourcing

### 2.1 3D Models
*   **Format:** All models must be in `.glb` or `.gltf` format with embedded PBR (Physically Based Rendering) textures.
*   **Optimization:** Models should be aggressively decimated (low poly count) to ensure fast loading (<3 seconds) and high framerates on mobile devices. Use tools like Blender or Draco compression.
*   **Sourcing Strategy:**
    1.  *Primary:* Custom-modeled assets tailored to the specific museum exhibits.
    2.  *Secondary:* High-quality, royalty-free assets from platforms like Sketchfab (e.g., searching for CC-licensed cultural instruments).
*   **Structure:** Models must have named meshes for interactive components (e.g., `Mesh_String_E`, `Mesh_DrumHead`) to allow precise raycasting and interaction detection in R3F.

### 2.2 Audio Assets
*   **Format:** highly compressed `.mp3` or `.ogg` files.
*   **Implementation:** Use the Web Audio API (or `Howler.js` for easier management) to ensure zero-delay playback upon gesture interaction.
*   **Sourcing:** Royalty-free sample libraries (e.g., Splice, Freesound) or custom field recordings of the physical instruments.

## 3. Codebase Structure

```text
virtualmuse/
├── public/                 # Static assets (favicon, manifest)
│   ├── models/             # .glb/.gltf instrument models
│   ├── audio/              # .mp3 instrument samples
│   └── icons/              # UI icons
├── src/
│   ├── assets/             # Images, global CSS
│   ├── components/         # Reusable UI components (Atoms/Molecules)
│   │   ├── ui/             # Buttons, Cards, GlassPanels
│   │   ├── 3d/             # R3F components (InstrumentViewer, Lights, Environment)
│   │   └── ar/             # WebXR setup and QR Scanner components
│   ├── hooks/              # Custom React hooks (e.g., useAudio, useScanner)
│   ├── pages/              # Top-level route components (Organisms/Templates)
│   │   ├── Home.tsx
│   │   ├── Gallery.tsx
│   │   ├── ScannerView.tsx
│   │   └── ArExperience.tsx
│   ├── store/              # Zustand state stores
│   │   └── useAppStore.ts  # Global state (user progress, active item)
│   ├── types/              # TypeScript interfaces and types
│   ├── utils/              # Helper functions (constants, math for 3D)
│   ├── App.tsx             # Main application router
│   └── main.tsx            # React entry point
├── index.html
├── tailwind.config.js      # Custom theme setup (purple spectrum, glass utilities)
├── tsconfig.json
└── package.json
```

## 4. Implementation Plan (Phased Approach)

### Phase 1: Foundation & UI Shell
1.  Initialize Vite + React + TypeScript project.
2.  Configure Tailwind CSS with the custom purple spectrum and glassmorphism utility classes.
3.  Build the non-AR screens (Home, Login/Onboarding, Gallery Dashboard) using placeholder data.
4.  Implement routing and Framer Motion page transitions.

### Phase 2: Core Functionality (Scanner & Data)
1.  Integrate `html5-qrcode` to build the scanning interface.
2.  Set up the `Zustand` store to manage unlocked instruments based on simulated scan results.
3.  Implement basic hardware capability checks (camera permissions).

### Phase 3: The 3D/AR Experience
1.  Setup `@react-three/fiber` canvas in the `ArExperience` page.
2.  Load a sample `.glb` instrument model.
3.  Implement basic 3D controls (OrbitControls for 360° viewing).
4.  Integrate `@react-three/xr` for the AR overlay (or configure the camera feed as the canvas background if using a custom approach).
5.  Implement Raycasting on specific model meshes to trigger console logs (proof of interaction).

### Phase 4: Polish & Audio
1.  Map raycast interactions to the Web Audio API for sound playback.
2.  Add visual feedback to interactions (e.g., glowing strings, haptic feedback).
3.  Conduct performance profiling (target: stable 60fps on mid-range mobile devices).
4.  Final accessibility and responsive design audits.
