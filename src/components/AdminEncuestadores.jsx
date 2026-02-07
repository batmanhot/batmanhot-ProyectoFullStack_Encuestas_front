import { useContext, useState } from 'react';
import { EncuestasContext } from '../context/EncuestasContext';
import Card from './ui/Card';
import ModalRegistrarEncuestador from './ModalRegistrarEncuestador';

export default function AdminEncuestadores() {
    const { encuestadores, eliminarEncuestador } = useContext(EncuestasContext);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEncuestador, setSelectedEncuestador] = useState(null);

    const handleCreate = () => {
        setSelectedEncuestador(null);
        setIsEditModalOpen(true);
    };

    const handleEliminar = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar al encuestador ${nombre}?`)) {
            eliminarEncuestador(id);
        }
    };

    const handleEditar = (encuestador) => {
        setSelectedEncuestador(encuestador);
        setIsEditModalOpen(true);
    };

    return (
        <Card className="overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-peruBlue dark:text-blue-400">
                    👥 Personal de Campo ({encuestadores.length})
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">DNI</th>
                            <th className="px-4 py-3">Zona Asignada</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {encuestadores.length > 0 ? (
                            encuestadores.map((e) => (
                                <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                                        {e.nombre}
                                    </td>
                                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400">
                                        {e.dni}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-peruBlue dark:text-blue-400">
                                                {e.zona.departamento} / {e.zona.provincia}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {e.zona.distrito} - {e.zona.centroEducativo}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEditar(e)}
                                            className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(e.id, e.nombre)}
                                            className="text-peruRed hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 italic">
                                    No hay encuestadores registrados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 p-4">
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-6 py-2 bg-peruBlue text-white rounded-lg font-semibold hover:opacity-90 transition-colors shadow-sm"
                >
                    ✨ Registrar Nuevo Encuestador
                </button>
            </div>

            <ModalRegistrarEncuestador
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedEncuestador(null);
                }}
                encuestadorParaEditar={selectedEncuestador}
            />
        </Card>
    );
}
