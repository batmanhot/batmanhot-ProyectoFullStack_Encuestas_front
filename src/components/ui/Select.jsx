// components/ui/Select.jsx
export default function Select({ label, options, register, required = false, error = "" }) {
  return (
    <div className="flex flex-col mb-4 w-full">
      {label && (
        <label className="text-sm font-medium text-peruBlue dark:text-darkText mb-2 flex items-center">
          {label}
          {required && <span className="text-peruRed ml-1">*</span>}
        </label>
      )}
      <select 
        {...register} 
        required={required}
        className={`border-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-peruBlue transition-all duration-200 dark:bg-darkCard dark:border-gray-600 dark:text-darkText cursor-pointer ${
          error ? "border-peruRed focus:ring-peruRed" : "border-gray-300 dark:border-gray-600"
        }`}
      >
        <option value="">Seleccionar...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <span className="text-peruRed text-sm mt-1">{error}</span>}
    </div>
  );
}
