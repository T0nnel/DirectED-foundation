import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n/config";
import "./index.css";

// Fix for iOS Safari viewport height issues
// This sets a CSS custom property with the actual viewport height
// Use calc(var(--vh, 1vh) * 100) instead of 100vh for better mobile support
function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial value
setVh();

// Update on resize (for orientation changes and address bar show/hide)
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);

// Also update when the page becomes visible (helps with iOS Safari quirks)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        setVh();
    }
});

createRoot(document.getElementById("root")!).render(<App />);
