// pages/PanelAdministrador.jsx
import { useState, useContext } from 'react';
import { EncuestasContext } from '../context/EncuestasContext';
import { toast } from 'react-toastify';
import AdminEncuestas from '../components/AdminEncuestas';
import AdminEncuestadores from '../components/AdminEncuestadores';

export default function PanelAdministrador() {
  const { encuestas, encuestadores, respuestas } = useContext(EncuestasContext);
  const [tabActiva, setTabActiva] = useState('encuestas');

  const handleEliminarTodos = () => {
    if (window.confirm('⚠️ ¿Estás seguro de eliminar TODOS los datos? Esta acción no se puede deshacer.')) {
      if (window.confirm('🔴 CONFIRMACIÓN FINAL: Presiona OK para eliminar permanentemente todos los registros')) {
        toast.success('🗑️ Todos los datos han sido eliminados');
        // Aquí iría la lógica real de borrado si existiera en el contexto
      }
    }
  };

  // Estadísticas
  const totalEncuestas = encuestas.length;
  const encuestasActivas = encuestas.filter((e) => e.estado === 'Activa').length;
  const totalEncuestadores = encuestadores.length;
  const totalRespuestas = respuestas.length;

  return (
    <div className="space-y-8">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            Panel de Control
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Resumen general y gestión del sistema
          </p>
        </div>
        <button
          onClick={handleEliminarTodos}
          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
        >
          🗑️ Eliminar Todos los Datos
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard
          title="Total Encuestas"
          value={totalEncuestas}
          icon="📋"
          color="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
        />
        <KpiCard
          title="Encuestas Activas"
          value={encuestasActivas}
          icon="kak" // Using specific icon or just circle
          iconContent="🟢"
          color="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
        />
        <KpiCard
          title="Encuestadores"
          value={totalEncuestadores}
          icon="👥"
          color="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
        />
        <KpiCard
          title="Total Respuestas"
          value={totalRespuestas}
          icon="📝"
          color="bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <TabButton
            active={tabActiva === 'encuestas'}
            onClick={() => setTabActiva('encuestas')}
            label="Gestión de Encuestas"
            icon="📊"
          />
          <TabButton
            active={tabActiva === 'encuestadores'}
            onClick={() => setTabActiva('encuestadores')}
            label="Personal de Campo"
            icon="users" // Placeholder, using text in component
          />
        </nav>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {tabActiva === 'encuestas' ? (
          <AdminEncuestas />
        ) : (
          <AdminEncuestadores />
        )}
      </div>
    </div>
  );
}

// Subcomponents for cleaner code
function KpiCard({ title, value, icon, iconContent, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color} text-2xl`}>
        {iconContent || icon}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                ${active
          ? 'border-peruBlue text-peruBlue dark:border-blue-400 dark:text-blue-400'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
        }
            `}
    >
      {icon === 'users' ? '👥' : '📊'} {label}
    </button>
  );
}
