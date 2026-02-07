/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      // Colores personalizados Peru
      peruRed: "#D32F2F",
      peruBlue: "#1565C0",
      peruWhite: "#FFFFFF",
      peruGray: "#F5F5F5",
      darkBg: "#1E1E2F",
      darkCard: "#2A2A3D",
      darkText: "#E0E0E0",
      success: "#2E7D32",
      warning: "#ED6C02",
      error: "#C62828",
      
      // Colores estándar de Tailwind
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
      current: "currentColor",
      
      // Escala de grises
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      
      // Escala de rojos
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
      },
      
      // Escala de azules
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
      },
      
      // Escala de verdes
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
      },
      
      // Escala de amarillos/naranjas
      yellow: {
        50: "#fefce8",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
      },
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      heading: ["Montserrat", "sans-serif"],
    },
    extend: {
      boxShadow: {
        soft: "0 2px 6px rgba(0,0,0,0.1)",
        strong: "0 4px 12px rgba(0,0,0,0.2)",
        xl: "0 8px 24px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        xl: "1rem",
      },
      spacing: {
        128: "32rem",
      },
      opacity: {
        5: "0.05",
        10: "0.1",
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
