// components/ui/Card.jsx
export default function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-peruWhite dark:bg-darkCard shadow-soft dark:shadow-strong rounded-lg p-6 transition-colors duration-200 ${className}`}>
      {title && <h2 className="text-xl font-heading font-bold text-peruBlue dark:text-darkText mb-4">{title}</h2>}
      <div className="text-gray-700 dark:text-darkText">
        {children}
      </div>
    </div>
  );
}
