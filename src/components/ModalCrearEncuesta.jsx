import { useState, useContext } from 'react';
import { EncuestasContext } from '../context/EncuestasContext';
import { toast } from 'react-toastify';

export default function ModalCrearEncuesta({ isOpen, onClose }) {
  const { crearEncuesta } = useContext(EncuestasContext);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [preguntas, setPreguntas] = useState([
    { texto: '', tipo: 'libre', opciones: [''] },
    { texto: '', tipo: 'libre', opciones: [''] },
    { texto: '', tipo: 'libre', opciones: [''] }
  ]);

  const handlePreguntaChange = (index, campo, valor) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index] = { ...nuevasPreguntas[index], [campo]: valor };
    setPreguntas(nuevasPreguntas);
  };

  const handleOpcionChange = (qIndex, oIndex, valor) => {
    const nuevasPreguntas = [...preguntas];
    const nuevasOpciones = [...nuevasPreguntas[qIndex].opciones];
    nuevasOpciones[oIndex] = valor;
    nuevasPreguntas[qIndex].opciones = nuevasOpciones;
    setPreguntas(nuevasPreguntas);
  };

  const agregarOpcion = (qIndex) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[qIndex].opciones = [...nuevasPreguntas[qIndex].opciones, ''];
    setPreguntas(nuevasPreguntas);
  };

  const eliminarOpcion = (qIndex, oIndex) => {
    const nuevasPreguntas = [...preguntas];
    if (nuevasPreguntas[qIndex].opciones.length > 1) {
      nuevasPreguntas[qIndex].opciones = nuevasPreguntas[qIndex].opciones.filter((_, i) => i !== oIndex);
      setPreguntas(nuevasPreguntas);
    }
  };

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { texto: '', tipo: 'libre', opciones: [''] }]);
  };

  const eliminarPregunta = (index) => {
    if (preguntas.length > 1) {
      setPreguntas(preguntas.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      toast.error('❌ El nombre de la encuesta es requerido');
      return;
    }

    if (!descripcion.trim()) {
      toast.error('❌ La descripción es requerida');
      return;
    }

    const preguntasValidas = preguntas
      .filter((p) => p.texto.trim())
      .map((p) => ({
        ...p,
        opciones: p.tipo === 'seleccion' ? p.opciones.filter((o) => o.trim()) : []
      }));

    if (preguntasValidas.length === 0) {
      toast.error('❌ Agregue al menos una pregunta');
      return;
    }

    // Validar que preguntas de selección tengan opciones
    const seleccionSinOpciones = preguntasValidas.find(p => p.tipo === 'seleccion' && p.opciones.length === 0);
    if (seleccionSinOpciones) {
      toast.error(`❌ La pregunta "${seleccionSinOpciones.texto}" necesita al menos una opción`);
      return;
    }

    crearEncuesta({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      preguntas: preguntasValidas,
    });

    toast.success('✅ Encuesta creada exitosamente');
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setPreguntas([
      { texto: '', tipo: 'libre', opciones: [''] },
      { texto: '', tipo: 'libre', opciones: [''] },
      { texto: '', tipo: 'libre', opciones: [''] }
    ]);
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
        className="w-full max-w-2xl bg-peruWhite dark:bg-darkCard rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-peruWhite dark:bg-darkCard border-b border-gray-200 dark:border-gray-700 p-6 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-peruBlue dark:text-blue-400">
                ✨ Crear Nueva Encuesta
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Completa los detalles de la encuesta y agrega preguntas
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-darkText mb-2">
              📋 Nombre de la Encuesta <span className="text-peruRed">*</span>
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Preferencias Electorales 2026"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-peruBlue dark:bg-gray-700 dark:text-darkText"
              autoFocus
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-darkText mb-2">
              📝 Descripción <span className="text-peruRed">*</span>
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe el propósito de la encuesta"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-peruBlue dark:bg-gray-700 dark:text-darkText"
            />
          </div>

          {/* Preguntas */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-darkText mb-3">
              ❓ Preguntas <span className="text-peruRed">*</span>
            </label>
            <div className="space-y-4">
              {preguntas.map((pregunta, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-3">
                  <div className="flex gap-2 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={pregunta.texto}
                        onChange={(e) => handlePreguntaChange(index, 'texto', e.target.value)}
                        placeholder={`Pregunta ${index + 1}`}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-peruBlue dark:bg-gray-700 dark:text-darkText text-sm font-medium"
                      />
                    </div>
                    {preguntas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => eliminarPregunta(index)}
                        className="p-2 text-peruRed hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Eliminar pregunta"
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 items-center pl-1">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tipo de respuesta:</span>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        checked={pregunta.tipo === 'libre'}
                        onChange={() => handlePreguntaChange(index, 'tipo', 'libre')}
                        className="w-4 h-4 text-peruBlue focus:ring-peruBlue border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-peruBlue transition-colors">
                        Libre
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        checked={pregunta.tipo === 'opciones'}
                        onChange={() => handlePreguntaChange(index, 'tipo', 'opciones')}
                        className="w-4 h-4 text-peruBlue focus:ring-peruBlue border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-peruBlue transition-colors">
                        Opción Rápida
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        checked={pregunta.tipo === 'seleccion'}
                        onChange={() => handlePreguntaChange(index, 'tipo', 'seleccion')}
                        className="w-4 h-4 text-peruBlue focus:ring-peruBlue border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-peruBlue transition-colors">
                        Selección
                      </span>
                    </label>
                  </div>

                  {/* Configuración de opciones personalizada */}
                  {pregunta.tipo === 'seleccion' && (
                    <div className="pl-4 border-l-2 border-peruBlue/30 space-y-2 mt-2">
                      <p className="text-xs font-bold text-peruBlue dark:text-blue-400 mb-2">OPCIONES DISPONIBLES:</p>
                      <div className="grid gap-2">
                        {pregunta.opciones.map((opcion, oIndex) => (
                          <div key={oIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={opcion}
                              onChange={(e) => handleOpcionChange(index, oIndex, e.target.value)}
                              placeholder={`Opción ${oIndex + 1}`}
                              className="flex-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-peruBlue dark:bg-gray-700 dark:text-darkText"
                            />
                            {pregunta.opciones.length > 1 && (
                              <button
                                type="button"
                                onClick={() => eliminarOpcion(index, oIndex)}
                                className="text-peruRed text-xs hover:underline"
                              >
                                Quitar
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => agregarOpcion(index)}
                        className="text-xs text-peruBlue dark:text-blue-400 font-semibold hover:underline mt-1"
                      >
                        + Agregar Opción
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={agregarPregunta}
              className="mt-4 w-full py-2 text-sm font-medium text-peruBlue dark:text-blue-400 border-2 border-dashed border-peruBlue/30 dark:border-blue-400/30 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-400/10 transition-colors"
            >
              + Agregar Nueva Pregunta
            </button>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 justify-end border-t border-gray-200 dark:border-gray-700 pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
              ✕ Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-peruBlue text-white rounded-lg hover:opacity-90 transition-colors font-semibold shadow-md"
            >
              ✅ Crear Encuesta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
