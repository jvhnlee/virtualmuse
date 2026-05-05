# Design Specifications: VirtualMuse

This document outlines the visual identity, styling guidelines, and UI/UX principles for the high-fidelity VirtualMuse WebAR application.

## 1. Visual Theme & Aesthetics
The application aims for a modern, premium, and culturally rich aesthetic that bridges historical artifacts with cutting-edge technology.

### 1.1 Glassmorphism & Frosted Glass Effects
To ensure the UI feels lightweight and does not obstruct the camera view during the AR experience, we will heavily utilize **Glassmorphism**.
*   **Backgrounds:** Semi-transparent backgrounds with a heavy background-blur effect.
*   **Borders:** Thin, subtle white or semi-transparent borders to define edges without adding visual weight.
*   **Shadows:** Soft, diffused drop shadows to separate overlapping glass elements and establish depth.
*   *Implementation Note:* In Tailwind, this translates to utilities like `bg-white/10`, `backdrop-blur-md`, `border`, and `border-white/20`.

### 1.2 Color Palette: The Purple Spectrum
The primary color theme revolves around a vibrant, premium purple spectrum to convey creativity, mystery, and cultural depth.
*   **Primary Accent:** Vibrant Violet (e.g., `#8B5CF6` / Tailwind `violet-500`) for primary buttons, active states, and highlights.
*   **Secondary/Hover:** Deep Royal Purple (e.g., `#6D28D9` / Tailwind `violet-700`) for interactions and depth.
*   **Gradients:** Use subtle gradients combining purples with deep blues or magentas for backgrounds on non-AR screens (like the onboarding or gallery).
*   **Text & Contrast:** Pure White (`#FFFFFF`) for primary text against dark or glass backgrounds; Light Gray (`#E5E7EB`) for secondary text.
*   **System Colors:** 
    *   Success: Emerald/Amber for unlocked achievements.
    *   Error/Warning: Rose for camera permission denials or unsupported devices.

## 2. Typography
Typography should be clean, legible, and modern.
*   **Primary Font:** Modern Sans-Serif (e.g., `Inter`, `Outfit`, or `Roboto`).
*   **Hierarchy:**
    *   `h1` (Headers): Bold, large, used for screen titles.
    *   `h2` (Subheaders): Semi-bold, used for section titles (e.g., in the Gallery).
    *   `p` (Body text): Regular weight, highly readable for historical context and instrument details.

## 3. UI/UX Principles (Applying Norman & Nielsen)

### 3.1 Gestalt Principles in Layout
*   **Proximity:** Group related elements together (e.g., the instrument's name, origin, and audio play button should be a single, cohesive glass card).
*   **Symmetry & Continuity:** Ensure uniform padding, rounded corners (e.g., `rounded-2xl` or `rounded-3xl` for modern feel), and consistent spacing across all screens.

### 3.2 Key Interaction Guidelines
*   **Discoverability & Affordances:** Interactive elements in the AR view (like hotspots on the 3D instrument) must pulse or glow slightly to indicate they can be tapped or swiped.
*   **Feedback:** Every interaction must have an immediate response.
    *   *Visual:* Buttons press down or change color.
    *   *Audio:* Playing a string produces an immediate low-latency sound.
    *   *Haptic:* Trigger device vibration (via `navigator.vibrate`) when an AR interaction occurs.
*   **User Control & Freedom:** Always provide a clear, accessible "Back" button or "Close" icon (X) to exit the AR view or dismiss modals.
*   **Error Prevention:** If the device does not support WebAR, show a friendly fallback UI (e.g., a standard 3D viewer without camera background) rather than a broken page.

## 4. Accessibility (WCAG 2.1)
*   **Contrast Ratios:** Ensure text on glass backgrounds maintains a minimum contrast ratio of 4.5:1.
*   **Touch Targets:** All interactive elements must be at least `44x44px` to accommodate mobile users.
*   **Screen Readers:** Use semantic HTML (`<main>`, `<nav>`) and proper `aria-labels` for icon-only buttons (like the back button or settings gear).
