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

## 2. UI/UX Principles + Layout & Gestalt + Accessibility (AGENTS.md Compliance)
