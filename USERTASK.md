# User Task Checklist: VirtualMuse Prototype

This checklist tracks the manual actions required to support the high-fidelity implementation of the VirtualMuse UI/UX prototype.

## 1. Asset Procurement
- [/] **Download 3D Models:** Source optimized `.glb` or `.gltf` models for the museum instruments.
    - *Path:* `public/models/`
- [/] **Download Audio Samples:** Source `.mp3` or `.wav` clips for instrument interactions.
    - *Path:* `public/audio/`
- [/] **Source Environment Map:** Download a small `.hdr` file for realistic 3D lighting.
    - *Path:* `public/textures/`

## 2. Content & Data
- [/] **Populate `instruments.json`:** Fill in the mock data with actual instrument names, descriptions, and historical facts.
    - *Path:* `src/mocks/instruments.json`
- [/] **Define Achievements:** Populate `achievements.json` with the names and criteria for the badges.
    - *Path:* `src/mocks/achievements.json`

## 3. Testing & Feedback
- [ ] **Approve Dependencies:** Review and approve the `npm install` commands for the tech stack (Three.js, R3F, Framer Motion, etc.).
- [ ] **Mobile Hardware Test:** Open the dev server on a physical mobile device to test:
    - [ ] Camera permissions and Scanner UI.
    - [ ] AR model placement and stability.
    - [ ] Haptic feedback (vibration).
- [ ] **UI Review:** Provide feedback on the Apple-style glassmorphism materials and "Vibrancy" effects in different lighting conditions.

## 4. Documentation
- [ ] **Final Review:** Ensure `DESIGN.md` and `HIFI.md` still align with the project goals before finishing Phase 4.
