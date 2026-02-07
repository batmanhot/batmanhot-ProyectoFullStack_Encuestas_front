// components/ui/Input.jsx
export default function Input({ label, type = "text", register, placeholder = "", required = false, error = "" }) {
  return (
    <div className="flex flex-col mb-4 w-full">
      {label && (
        <label className="text-sm font-medium text-peruBlue dark:text-darkText mb-2 flex items-center">
          {label}
          {required && <span className="text-peruRed ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        {...register}
        className={`border-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-peruBlue transition-all duration-200 dark:bg-darkCard dark:border-gray-600 dark:text-darkText dark:placeholder-gray-500 ${
          error ? "border-peruRed focus:ring-peruRed" : "border-gray-300 dark:border-gray-600"
        }`}
      />
      {error && <span className="text-peruRed text-sm mt-1">{error}</span>}
    </div>
  );
}
