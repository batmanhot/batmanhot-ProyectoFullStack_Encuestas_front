// components/ui/DarkModeToggle.jsx
import { useState, useCallback, useEffect } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    // Inicialización: determinar el tema basado en localStorage o preferencia del sistema
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (savedTheme) return savedTheme === "dark";
    
    // Si no está guardado, usar preferencia del sistema
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const applyTheme = useCallback((isDark) => {
    if (typeof document !== "undefined") {
      if (isDark) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark-mode");
      }
    }
  }, []);

  // Aplicar tema cuando el componente monta y cuando dark cambia
  useEffect(() => {
    applyTheme(dark);
  }, [dark, applyTheme]);

  const handleToggle = useCallback(() => {
    setDark((prevDark) => {
      const newDarkMode = !prevDark;
      localStorage.setItem("theme", newDarkMode ? "dark" : "light");
      return newDarkMode;
    });
  }, []);

  return (
    <button
      onClick={handleToggle}
      className="px-4 py-2 rounded-lg bg-peruBlue text-peruWhite hover:bg-blue-700 active:bg-peruRed transition-all duration-200 shadow-soft hover:shadow-strong flex items-center gap-2 font-semibold"
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {dark ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
