# Design Specifications: VirtualMuse (Apple-Inspired High-Fidelity)

This document outlines the visual identity and UI/UX architecture for VirtualMuse, drawing inspiration from **Apple's Human Interface Guidelines (HIG)** for glassmorphism and adhering to **Norman's and Nielsen's UI/UX principles**.

## 1. Visual Theme: Apple-Inspired Glassmorphism
The design uses "Materials" to create a sense of depth and context, ensuring the UI feels integrated with the AR environment.

### 1.1 Materials & Translucency
We will use varying levels of translucency to establish hierarchy:
*   **Ultra-Thin Material:** For backgrounds that need to be highly transparent (e.g., secondary overlays).
*   **Thin/Regular Material:** The standard for primary glass cards (e.g., instrument info).
*   **Thick Material:** For elements that need to stand out or appear "closer" to the user (e.g., primary action buttons).
*   *Implementation:* Use `backdrop-filter: blur(20px) saturate(180%)` combined with a semi-transparent white or purple tint.

### 1.2 Vibrancy & Contrast
Following Apple's guidelines, **Vibrancy** is used to make text and icons "pop" by pulling color from the background through the glass.
*   **Primary Text:** High contrast (White #FFFFFF) with a slight "Vibrant" filter to feel organic.
*   **Secondary Text:** Lower opacity white or light purple, ensuring legibility via background blur.

### 1.3 The Purple Spectrum (Vibrant & Premium)
The "VirtualMuse Purple" spectrum provides the core identity while maintaining Apple's clean look:
*   **System Tint:** `#8B5CF6` (Vibrant Violet) - Used for signifiers and active states.
*   **Background Accents:** Subtle purple gradients in the "Vibrancy" layer to add warmth to the glass effect.
*   **Responsiveness:** Colors and materials must adapt to light/dark environments (simulated via AR lighting).

## 2. UI/UX Principles (AGENTS.md Compliance)

### 2.1 Norman's Principles of Design
*   **Discoverability:** Use **Signifiers** (pulsing hotspots, chevrons, or subtle glows) to show where interaction is possible on the 3D model.
*   **Affordances:** Buttons must look "pressable" (using depth and shadows), and strings must look "pluggable."
*   **Feedback:** Provide immediate **Visual, Auditory, and Haptic** feedback. A string pluck should trigger a sound, a visual vibration in the 3D model, and a light haptic pulse.
*   **Mapping:** Gesture controls must map logically to the instrument (e.g., swiping across strings, tapping a drum head).
*   **Constraints:** Disable certain interactions during loading or transition states to prevent user error.

### 2.2 Nielsen's Heuristics
*   **Visibility of System Status:** Clear progress bars for asset loading and "Active" indicators during AR tracking.
*   **User Control & Freedom:** Provide an "Emergency Exit" (X button) on every overlay and an easy "Reset View" for the 3D model.
*   **Consistency & Standards:** Use standard iOS-like iconography and layout patterns (e.g., bottom sheets for instrument details).
*   **Aesthetic & Minimalist Design:** Remove all non-essential elements from the AR view to maintain focus on the instrument.

## 3. Layout & Gestalt
*   **Proximity:** Group instrument controls (Play, Info, Share) into a single, cohesive glass dock at the bottom of the screen.
*   **Symmetry:** Maintain balanced margins (standard 16px or 20px) to create a premium, "orderly" feel.
*   **Continuity:** Use smooth transitions (Framer Motion) to slide glass panels in and out, maintaining the user's mental model of the interface space.

## 4. Accessibility (WCAG 2.1)
*   **Contrast:** Minimum 4.5:1 ratio for text on glass.
*   **Touch Targets:** Minimum 44x44 points for all interactive elements.
*   **Clarity:** Use simple, direct language for onboarding and instrument descriptions.
