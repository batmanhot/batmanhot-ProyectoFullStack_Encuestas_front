import { useState, useContext, useEffect } from 'react';
import { EncuestasContext } from '../context/EncuestasContext';
import { toast } from 'react-toastify';

export default function ModalRegistrarEncuestador({ isOpen, onClose, encuestadorParaEditar }) {
    const { registrarEncuestador, actualizarEncuestador } = useContext(EncuestasContext);
    const [datos, setDatos] = useState({
        nombre: '',
        dni: '',
        departamento: '',
        provincia: '',
        distrito: '',
        centroEducativo: ''
    });

    useEffect(() => {
        if (encuestadorParaEditar) {
            setDatos({
                nombre: encuestadorParaEditar.nombre,
                dni: encuestadorParaEditar.dni,
                departamento: encuestadorParaEditar.zona.departamento,
                provincia: encuestadorParaEditar.zona.provincia,
                distrito: encuestadorParaEditar.zona.distrito,
                centroEducativo: encuestadorParaEditar.zona.centroEducativo
            });
        } else {
            resetForm();
        }
    }, [encuestadorParaEditar, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!datos.nombre.trim() || !datos.dni.trim()) {
            toast.error('❌ Nombre y DNI son requeridos');
            return;
        }

        if (!datos.departamento.trim() || !datos.provincia.trim() || !datos.distrito.trim()) {
            toast.error('❌ Los datos de ubicación son requeridos');
            return;
        }

        const payload = {
            nombre: datos.nombre.trim(),
            dni: datos.dni.trim(),
            zona: {
                departamento: datos.departamento.trim(),
                provincia: datos.provincia.trim(),
                distrito: datos.distrito.trim(),
                centroEducativo: datos.centroEducativo.trim()
            }
        };

        if (encuestadorParaEditar) {
            actualizarEncuestador(encuestadorParaEditar.id, payload);
            toast.success('👤 Datos del encuestador actualizados');
        } else {
            registrarEncuestador(payload);
            toast.success('👤 Encuestador registrado exitosamente');
        }

        resetForm();
        onClose();
    };

    const resetForm = () => {
        setDatos({
            nombre: '',
            dni: '',
            departamento: '',
            provincia: '',
            distrito: '',
            centroEducativo: ''
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleClose}
        >
            <div
                className="w-full max-w-xl bg-peruWhite dark:bg-darkCard rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-peruBlue text-white rounded-t-xl">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        {encuestadorParaEditar ? '✏️ Editar Datos del Encuestador' : '👤 Registrar Nuevo Encuestador'}
                    </h2>
                    <button onClick={handleClose} className="text-2xl hover:text-gray-200 transition-colors">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombre"
                                value={datos.nombre}
                                onChange={handleChange}
                                placeholder="Ej: Juan Perez"
                                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-peruBlue outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">DNI / ID</label>
                            <input
                                type="text"
                                name="dni"
                                value={datos.dni}
                                onChange={handleChange}
                                placeholder="Ej: 12345678"
                                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-peruBlue outline-none"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t dark:border-gray-700">
                        <h3 className="text-sm font-bold text-peruBlue dark:text-blue-400 uppercase tracking-widest mb-4">📍 Zona Asignada</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500">Departamento</label>
                                <input
                                    type="text"
                                    name="departamento"
                                    value={datos.departamento}
                                    onChange={handleChange}
                                    placeholder="Ej: Lima"
                                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-peruBlue outline-none text-sm"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500">Provincia</label>
                                <input
                                    type="text"
                                    name="provincia"
                                    value={datos.provincia}
                                    onChange={handleChange}
                                    placeholder="Ej: Lima"
                                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-peruBlue outline-none text-sm"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500">Distrito</label>
                                <input
                                    type="text"
                                    name="distrito"
                                    value={datos.distrito}
                                    onChange={handleChange}
                                    placeholder="Ej: Miraflores"
                                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-peruBlue outline-none text-sm"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500">Centro Educativo</label>
                                <input
                                    type="text"
                                    name="centroEducativo"
                                    value={datos.centroEducativo}
                                    onChange={handleChange}
                                    placeholder="Ej: Colegio Miraflores"
                                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-peruBlue outline-none text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-2 bg-peruBlue text-white rounded-lg font-semibold hover:opacity-90 shadow-lg transition-colors"
                        >
                            Guardar Registro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
