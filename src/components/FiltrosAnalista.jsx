// components/FiltrosAnalista.jsx
import Select from './ui/Select';

export default function FiltrosAnalista({ onFiltrar }) {
  const partidos = [
    "Todos",
    "Partido A",
    "Partido B",
    "Partido C",
    "Partido D",
    "Independiente"
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-peruBlue dark:text-darkText mb-2 block">
          🔍 Filtrar por partido
        </label>
        <select 
          onChange={(e) => onFiltrar(e.target.value)} 
          className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-peruBlue dark:bg-darkCard dark:text-darkText"
        >
          {partidos.map((partido) => (
            <option key={partido} value={partido === "Todos" ? "" : partido}>
              {partido}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="text-sm font-medium text-peruBlue dark:text-darkText mb-2 block">
          📅 Rango de fechas
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input 
            type="date" 
            className="border-2 border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-peruBlue dark:bg-darkCard dark:text-darkText"
          />
          <input 
            type="date" 
            className="border-2 border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-peruBlue dark:bg-darkCard dark:text-darkText"
          />
        </div>
      </div>
    </div>
  );
}
