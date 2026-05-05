# Technical Specifications: VirtualMuse (UI/UX Prototype)

> [!IMPORTANT]
> This document details the implementation of a **standalone High-Fidelity UI/UX Prototype**. This version is strictly focused on user experience and visual fidelity; it does **not** require backend connectivity, database integration, or external API services.

## 1. Prototype Scope
The goal of this prototype is to demonstrate the user flow and interactions in a realistic "production-like" environment using local data mocks.
*   **No Backend Required:** All data (user profiles, instrument metadata, achievements) will be managed via local state and JSON mocks.
*   **Simulated Auth:** A "Login" flow will exist for UX demonstration but will always succeed with mock credentials.
*   **Local Assets:** 3D models and audio samples will be served directly from the `/public` directory.

## 2. Core Technology Stack
*   **Frontend Framework:** `React 18+` with `TypeScript`.
*   **Build Tool:** `Vite`.
*   **3D Engine:** `Three.js` + `@react-three/fiber` (R3F).
*   **AR Layer:** `@react-three/xr` (for WebXR testing) or a simulated AR background (camera feed only).
*   **State Management:** `Zustand` (for handling mock user progress and session state).
*   **Styling:** `Tailwind CSS` (configured for Apple-style glassmorphism, 4px baseline grid).
*   **Typography:** Helvetica.
*   **Animations:** `Framer Motion` (fluid, tactile transitions).

## 3. Design System & UI Architecture
*   **Layout Structure (HUD):** Do NOT use centered hero sections. Implement a Heads-Up Display (HUD) layout with controls anchored to the corners or a thin bottom-docked bar.
*   **Glassmorphism Specs:** High-quality frosted glass using `backdrop-filter: blur(12px)`.
*   **Image Assets:** All 2D illustrations and assets must be auto-resized/cropped using CSS `object-fit: cover` to ensure they perfectly fill their designated containers without distortion.
*   **Bottom Dock:** A floating, pill-shaped navigation bar featuring micro-shadows (`box-shadow: 0 8px 32px rgba(0,0,0,0.3)`).
*   **Scanning State:** A minimal, geometric "mesh" overlay (replacing legacy spinning circles).
*   **Feedback Cues:** Haptic-inspired visual cues, such as subtle ring expansions when items are interacted with or placed in 3D space.

## 4. Iconography & UI Assets
To reduce asset friction, the prototype will use **Lucide React** for all 2D iconography.
*   **Icon Style:** Thin (1px) stroke weight, strictly no filled icons.
*   **Dynamic Rendering:** Icons are stored as strings in `achievements.json` (e.g., "Trophy", "Drum").
*   **Implementation:** A dedicated `LucideIcon` component will dynamically resolve these strings.

## 4. Mock Data Structure
Instead of a database, we will use a `src/mocks/` directory to store static data:
*   `instruments.json`: Metadata for all instruments (name, description, 3D model path, audio path).
*   `achievements.json`: List of badges and criteria.
*   `userState.ts`: A Zustand store initialized with a mock "New User" or "Returning User" profile.

## 4. Codebase Structure (Prototype Focused)
```text
virtualmuse/
├── public/                 # Static assets
│   ├── models/             # Optimized .glb instrument models
│   ├── audio/              # Instrument sound samples
│   └── textures/           # Environmental maps (HDR)
├── src/
│   ├── components/         
│   │   ├── ui/             # Apple-style Glass components
│   │   ├── 3d/             # R3F Instrument renderers
│   │   └── ar/             # QR simulator & Camera view
│   ├── mocks/              # Static data files
│   ├── store/              # Zustand stores (Local only)
│   ├── pages/              # Prototype screens (Home, Gallery, AR)
│   ├── App.tsx             
│   └── main.tsx            
```

## 5. Implementation Roadmap (UI/UX Focus)

### Phase 1: Visual Foundation
*   Setup Vite project with Tailwind and Framer Motion.
*   Implement the "Glassmorphism" material library (utility classes).
*   Build the Home and Login screens (UI only).

### Phase 2: Interactive Gallery
*   Build the Instrument Gallery using `instruments.json`.
*   Implement smooth transitions between the Gallery and Detail views.
*   Setup the achievement notification UI.

### Phase 3: AR Simulation & 3D
*   Integrate R3F and load the first instrument model.
*   Enable 360° rotation and basic zoom interactions.
*   Implement non-interactive 3D previews in the Detail gallery views.

### Phase 4: Audio & Interaction Polish
*   Link gesture hits (raycasting) to mock audio playback.
*   Implement instrument-specific gestures (Tap, Hold, Swipe).
*   Finalize micro-interactions (vibrancy, haptics, transitions).

### Phase 5: Scanner & Real Camera Functionality
*   Implement a simulated AR background using a live camera feed.
*   Connect the Scanner UI pipeline to automatically unlock and launch AR views.
*   Verify responsiveness across mobile screen sizes with active hardware access.
