// components/ui/Button.jsx
export default function Button({ children, onClick, variant = "primary", disabled = false, type = "button", className = "" }) {
  const base = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-strong";
  const styles = {
    primary: "bg-peruBlue text-peruWhite hover:bg-blue-700 active:bg-peruRed",
    secondary: "bg-peruGray text-peruBlue border-2 border-peruBlue hover:bg-blue-50 dark:bg-darkCard dark:text-darkText dark:border-peruBlue",
    danger: "bg-peruRed text-peruWhite hover:bg-red-700 active:bg-error",
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      type={type}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
