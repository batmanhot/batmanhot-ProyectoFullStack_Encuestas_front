// components/AdminEncuestas.jsx
import { useState, useContext } from 'react';
import { EncuestasContext } from '../context/EncuestasContext';
import { toast } from 'react-toastify';
import Card from './ui/Card';
import Button from './ui/Button';
import ModalCrearEncuesta from './ModalCrearEncuesta';

export default function AdminEncuestas() {
  const { encuestas, cerrarEncuesta, eliminarEncuesta } = useContext(EncuestasContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCerrar = (id, nombre) => {
    cerrarEncuesta(id);
    toast.info(`📛 Encuesta "${nombre}" cerrada`);
  };

  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar "${nombre}"?`)) {
      eliminarEncuesta(id);
      toast.success(`🗑️ Encuesta "${nombre}" eliminada`);
    }
  };

  return (
    <div className="space-y-6">
      <Card title="📊 Gestión de Encuestas">
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-peruBlue dark:border-gray-600">
                  <th className="px-4 py-3 text-left text-peruBlue dark:text-darkText font-semibold">Nombre</th>
                  <th className="px-4 py-3 text-left text-peruBlue dark:text-darkText font-semibold">Estado</th>
                  <th className="px-4 py-3 text-left text-peruBlue dark:text-darkText font-semibold">Respuestas</th>
                  <th className="px-4 py-3 text-left text-peruBlue dark:text-darkText font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {encuestas && encuestas.length > 0 ? (
                  encuestas.map((enc) => (
                    <tr
                      key={enc.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-peruGray dark:hover:bg-darkCard transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="text-gray-700 dark:text-darkText font-medium">{enc.nombre}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{enc.descripcion}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${enc.estado === 'Activa'
                              ? 'bg-success/20 text-success dark:text-success'
                              : 'bg-warning/20 text-warning dark:text-warning'
                            }`}
                        >
                          {enc.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-darkText font-semibold">
                        {enc.respuestas || 0}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {enc.estado === 'Activa' && (
                            <>
                              <button
                                onClick={() => {
                                  const link = `${window.location.origin}/ver/${enc.id}`;
                                  navigator.clipboard.writeText(link);
                                  toast.success('🔗 Link copiado al portapapeles');
                                }}
                                className="text-peruBlue dark:text-blue-400 hover:underline font-medium text-sm"
                                title="Copiar enlace para compartir"
                              >
                                🔗 Link
                              </button>
                              <button
                                onClick={() => handleCerrar(enc.id, enc.nombre)}
                                className="text-warning dark:text-orange-400 hover:underline font-medium text-sm"
                              >
                                📛 Cerrar
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleEliminar(enc.id, enc.nombre)}
                            className="text-error dark:text-red-400 hover:underline font-medium text-sm"
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                      No hay encuestas registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              ✨ Crear Nueva Encuesta
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal para crear nueva encuesta */}
      <ModalCrearEncuesta isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
